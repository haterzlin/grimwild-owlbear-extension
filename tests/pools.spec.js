import { expect, test } from "@playwright/test";
import { buildCharacter } from "./helpers/characters.js";
import { attachDebugLogging } from "./helpers/debug.js";

const openPoolsTab = async page => {
  await page.goto("/?mockOwlbear=1");
  await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();

  await page.evaluate(character => {
    window.__grimwildTestApi.setCharacters([ character ]);
  }, buildCharacter({
    id: 1,
    name: "Pool Test Character"
  }));

  await expect(page.getByRole("button", { name: "Open" })).toBeVisible();
  await page.getByRole("button", { name: "Open" }).click();
  await page.getByRole("button", { name: "Pools" }).click();
  await expect(page.locator('div[class*="_header_"]').filter({ hasText: "Pools" }).first()).toBeVisible();
};

const lastRoll = async page => page.evaluate(() => {
  const chatMetadata = window.__grimwildTestApi.getMetadata()["grimwild.extension/metadata"];
  const entries = Object.values(chatMetadata).flat();
  return entries.filter(entry => Array.isArray(entry.dice) || Array.isArray(entry.thorns)).at(-1) ?? null;
});

test.describe("Pools", () => {
  test("renders pools screen and base controls", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      await expect(page.getByRole("button", { name: "Good", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Even", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Bad", exact: true })).toBeVisible();
      await expect(page.getByText("Dice", { exact: true })).toBeVisible();
      await expect(page.getByText("Thorns", { exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Pool", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Roll", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Short", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Mid", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Long", exact: true })).toBeVisible();
    } finally {
      await flushDebug();
    }
  });

  test("story roll sends chat entry with correct odds and dice count", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      await page.getByRole("button", { name: "Good", exact: true }).click();

      await expect
        .poll(async () => {
          const roll = await lastRoll(page);
          if (!roll) return null;
          return {
            diceCount: roll.dice?.length ?? 0,
            odds: roll.thornEffect?.includes("Good Odds") ?? false
          };
        })
        .toEqual({
          diceCount: 3,
          odds: true
        });
    } finally {
      await flushDebug();
    }
  });

  test("custom roll sends the configured dice and thorns counts", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      const fields = page.locator('input[type="number"], input').filter({
        has: page.locator("xpath=ancestor::div[contains(@class,\"_fieldStatContainerSmall_\")]")
      });
      const diceInput = fields.nth(1);
      const thornsInput = fields.nth(2);

      await diceInput.fill("2");
      await thornsInput.fill("1");

      await page.getByRole("button", { name: "Roll", exact: true }).click();

      await expect
        .poll(async () => {
          const roll = await lastRoll(page);
          if (!roll) return null;
          return {
            diceCount: roll.dice?.length ?? 0,
            thornsCount: roll.thorns?.length ?? 0
          };
        })
        .toEqual({
          diceCount: 2,
          thornsCount: 1
        });
    } finally {
      await flushDebug();
    }
  });

  test("custom pool roll reduces the dice input after rolling", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      const fields = page.locator('input[type="number"], input').filter({
        has: page.locator("xpath=ancestor::div[contains(@class,\"_fieldStatContainerSmall_\")]")
      });
      const diceInput = fields.nth(1);
      const thornsInput = fields.nth(2);

      await diceInput.fill("4");
      await thornsInput.fill("0");

      await page.getByRole("button", { name: "Pool", exact: true }).click();

      await expect
        .poll(async () => {
          const roll = await lastRoll(page);
          if (!roll) return false;

          const remainingDice = Number(await diceInput.inputValue());
          const thornEffect = roll.thornEffect ?? [];

          return roll.dice?.length === 4 && Array.isArray(thornEffect) && thornEffect.some(effect => effect.startsWith("4 ➜ ")) && Number.isInteger(remainingDice) && remainingDice >= 0 && remainingDice <= 4;
        })
        .toBeTruthy();
    } finally {
      await flushDebug();
    }
  });

  test("can add and remove short mid and long pools", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      await page.getByRole("button", { name: "Short", exact: true }).click();
      await page.getByRole("button", { name: "Mid", exact: true }).click();
      await page.getByRole("button", { name: "Long", exact: true }).click();

      await expect
        .poll(async () => {
          return page.evaluate(() => {
            const poolMetadata = window.__grimwildTestApi.getMetadata()["grimwild.pool.extension/metadata"];
            return Object.values(poolMetadata).map(pool => pool.value).sort((a, b) => a - b);
          });
        })
        .toEqual([ 4, 6, 8 ]);

      await page.getByRole("button", { name: "×" }).last().click();
      await page.getByRole("button", { name: "×" }).last().click();
      await page.getByRole("button", { name: "×" }).last().click();

      await expect
        .poll(async () => {
          return page.evaluate(() => {
            const poolMetadata = window.__grimwildTestApi.getMetadata()["grimwild.pool.extension/metadata"];
            return Object.keys(poolMetadata).length;
          });
        })
        .toBe(0);
    } finally {
      await flushDebug();
    }
  });

  test("rolling a named pool updates the pool value and writes to chat", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      await page.getByRole("button", { name: "Short", exact: true }).click();

      const poolValue = page.locator('input').filter({
        has: page.locator("xpath=following-sibling::button[normalize-space()=\"Roll\"]")
      }).first();
      const poolName = page.locator('input[type="text"]').first();

      await poolName.fill("Energy");
      await poolValue.fill("4");
      await expect(poolName).toHaveValue("Energy");
      await expect(poolValue).toHaveValue("4");

      await page.locator("button", { hasText: "Roll" }).last().click();

      await expect
        .poll(async () => {
          const roll = await lastRoll(page);
          const poolMetadata = await page.evaluate(() => {
            const pools = window.__grimwildTestApi.getMetadata()["grimwild.pool.extension/metadata"];
            return Object.values(pools)[0] ?? null;
          });
          if (!roll || !poolMetadata) return null;
          return {
            poolName: roll.thornEffect?.[0] ?? "",
            rolledDice: roll.dice?.length ?? 0,
            remainingValue: poolMetadata.value
          };
        })
        .toMatchObject({
          poolName: "Energy",
          rolledDice: 4
        });
    } finally {
      await flushDebug();
    }
  });
});

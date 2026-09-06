import { expect, test } from "@playwright/test";
import { buildNamedPoolRollEntry } from "../src/domain/pools.js";
import { buildCharacter } from "./helpers/characters.js";
import { attachDebugLogging } from "./helpers/debug.js";

const CRUCIBLE_FIRST_WORDS = [
  "Tough",
  "Quiet",
  "Precarious",
  "Wild",
  "Mysterious",
  "Rustic",
  "Muffled",
  "Aged",
  "Romantic",
  "Menacing",
  "Puzzling",
  "Eerie",
  "Broken",
  "Distant",
  "Dwindling",
  "Perilous",
  "Bleak",
  "Tense",
  "Forgotten",
  "Hidden",
  "Abundant",
  "Withered",
  "Chaotic",
  "Looming",
  "Festive",
  "Lost",
  "Immense",
  "Serene",
  "Vibrant",
  "Flickering",
  "Rugged",
  "Sacred",
  "Splintered",
  "Relentless",
  "Tangled",
  "Twisted"
];

const CRUCIBLE_SECOND_WORDS = [
  "Journey",
  "Juncture",
  "Rift",
  "Scheme",
  "Nexus",
  "Team",
  "Tremor",
  "Debris",
  "Symbol",
  "Scar",
  "Archive",
  "Chasm",
  "Sanctuary",
  "Betrayal",
  "Trail",
  "Wasteland",
  "Help",
  "Mystery",
  "Peak",
  "Threshold",
  "Boundary",
  "Beacon",
  "Secret",
  "Wall",
  "Territory",
  "Rumor",
  "Standoff",
  "Strife",
  "Maze",
  "Pact",
  "Dilemma",
  "Tradition",
  "Jackpot",
  "Omen",
  "Deception",
  "Illusion"
];

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

const openChatTab = async page => {
  await openPoolsTab(page);
  await page.getByRole("button", { name: "Chat" }).click();
  await expect(page.locator('div[class*="_header_"]').filter({ hasText: "Chat" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Popover", exact: true })).toBeVisible();
};

const lastRoll = async page => page.evaluate(() => {
  const chatMetadata = window.__grimwildTestApi.getMetadata()["grimwild.extension/metadata"];
  const entries = Object.values(chatMetadata).flat();
  return entries.filter(entry => Array.isArray(entry.dice) || Array.isArray(entry.thorns)).at(-1) ?? null;
});

const lastDescriptionEntry = async page => page.evaluate(() => {
  const chatMetadata = window.__grimwildTestApi.getMetadata()["grimwild.extension/metadata"];
  const entries = Object.values(chatMetadata).flat();
  return entries.filter(entry => entry.description).at(-1) ?? null;
});

const customDiceInput = page => page.locator(
  'xpath=(//b[normalize-space()="Dice"]/following::input[1])[1]'
);

const customThornsInput = page => page.locator(
  'xpath=(//b[normalize-space()="Thorns"]/following::input[1])[1]'
);

const namedPoolRow = (page, name) => page.locator(
  `xpath=//input[@type="text" and @value="${name}"]/ancestor::div[contains(@class,"_fieldRowNoSpread_")][1]`
);

test.describe("Pools", () => {
  test("describes conditional choices when a named pool does not drop", () => {
    expect(buildNamedPoolRollEntry({
      user: "GM",
      dice: [ 4 ],
      poolName: "Task",
      startingValue: 1,
      remainingValue: 1,
      outcome: "Messy"
    }).thornEffect).toContain("No drops: task pool may be pushed/pivoted; other pool may use GM Suspense to drop 1d.");
  });

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

  test("crucible button sends a crucible description to chat", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      await page.getByRole("button", { name: "Crucible", exact: true }).click();

      await expect
        .poll(async () => {
          const entry = await lastDescriptionEntry(page);
          if (!entry) return null;

          const match = entry.description.match(/^- Crucible - <br><b>([^<]+)<\/b>$/);
          if (!match) return null;

          const parts = match[1].trim().split(/\s+/);
          if (parts.length !== 2) return null;

          return {
            firstWord: parts[0],
            secondWord: parts[1]
          };
        })
        .toEqual({
          firstWord: expect.stringMatching(new RegExp(`^(${CRUCIBLE_FIRST_WORDS.join("|")})$`)),
          secondWord: expect.stringMatching(new RegExp(`^(${CRUCIBLE_SECOND_WORDS.join("|")})$`))
        });
    } finally {
      await flushDebug();
    }
  });

  test("pc button sends a targeted player description to chat", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      await page.getByRole("button", { name: "PC", exact: true }).click();

      await expect
        .poll(async () => {
          const entry = await lastDescriptionEntry(page);
          return entry ? entry.description : null;
        })
        .toBe("- You've been targeted - <br><b>Pool Test Character</b>");
    } finally {
      await flushDebug();
    }
  });

  test("custom roll sends the configured dice and thorns counts", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPoolsTab(page);

      const diceInput = customDiceInput(page);
      const thornsInput = customThornsInput(page);

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

      const diceInput = customDiceInput(page);
      const thornsInput = customThornsInput(page);

      await diceInput.fill("4");
      await thornsInput.fill("0");

      await page.getByRole("button", { name: "Pool", exact: true }).click();

      await expect
        .poll(async () => {
          const roll = await lastRoll(page);
          if (!roll) return null;

          const reductionText = (roll.thornEffect ?? []).find(effect => effect.startsWith("4 ➜ "));
          const match = reductionText ? reductionText.match(/^4 ➜ (\d+)$/) : null;
          if (!match) return null;

          return {
            rolledDice: roll.dice?.length ?? 0,
            expectedRemaining: match[1],
            actualRemaining: await diceInput.inputValue()
          };
        })
        .toEqual({
          rolledDice: 4,
          expectedRemaining: expect.any(String),
          actualRemaining: expect.any(String)
        });

      const finalState = await page.evaluate(() => {
        const chatMetadata = window.__grimwildTestApi.getMetadata()["grimwild.extension/metadata"];
        const entries = Object.values(chatMetadata).flat();
        const roll = entries.filter(entry => Array.isArray(entry.dice) && Array.isArray(entry.thornEffect)).at(-1);
        if (!roll) return null;

        const reductionText = (roll.thornEffect ?? []).find(effect => effect.startsWith("4 ➜ "));
        const match = reductionText ? reductionText.match(/^4 ➜ (\d+)$/) : null;
        return match ? match[1] : null;
      });

      expect(finalState).not.toBeNull();
      await expect(diceInput).toHaveValue(finalState);
    } finally {
      await flushDebug();
    }
  });

  test("popover button opens the chat popover route", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openChatTab(page);

      const popupPromise = page.waitForEvent("popup");
      await page.getByRole("button", { name: "Popover", exact: true }).click();
      const popup = await popupPromise;

      await expect
        .poll(async () => page.evaluate(() => window.__grimwildTestApi.getPopoverState().lastOpen))
        .toEqual({
          id: "chat/popover",
          url: "/chatpopover",
          height: 600,
          width: 300,
          anchorOrigin: {
            horizontal: "RIGHT",
            vertical: "BOTTOM"
          },
          hidePaper: true,
          marginThreshold: 0,
          disableClickAway: true
        });

      await expect(popup).toHaveURL(/\/chatpopover\/?\?mockOwlbear=1$/);
      await popup.waitForLoadState("domcontentloaded");
      await expect(popup.getByText("Chat", { exact: true })).toBeVisible();
      await expect(popup.getByRole("button", { name: "Close", exact: true })).toBeVisible();

      const popupClosed = popup.waitForEvent("close");
      await popup.getByRole("button", { name: "Close", exact: true }).click();
      await popupClosed;

      await expect
        .poll(async () => page.evaluate(() => window.__grimwildTestApi.getPopoverState().isOpen))
        .toBe(false);
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

      const poolName = page.locator('xpath=(//input[@type="text"])[last()]');

      await poolName.fill("Energy");
      const row = namedPoolRow(page, "Energy");
      const poolValue = row.locator('input:not([type="text"])').first();
      await poolValue.fill("4");
      await expect(poolName).toHaveValue("Energy");
      await expect(poolValue).toHaveValue("4");

      await row.getByRole("button", { name: "Roll", exact: true }).click();

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
            remainingValue: poolMetadata.value,
            reductionText: roll.thornEffect?.[1] ?? ""
          };
        })
        .toEqual(
          expect.objectContaining({
            poolName: "Energy",
            rolledDice: 4
          })
        );

      await expect
        .poll(async () => {
          const roll = await lastRoll(page);
          const poolMetadata = await page.evaluate(() => {
            const pools = window.__grimwildTestApi.getMetadata()["grimwild.pool.extension/metadata"];
            return Object.values(pools)[0] ?? null;
          });
          if (!roll || !poolMetadata) return null;

          const reductionText = roll.thornEffect?.[1] ?? "";
          const match = reductionText.match(/^4 ➜ (\d+)$/);
          if (!match) return null;

          return {
            remainingValue: String(poolMetadata.value),
            reducedTo: match[1]
          };
        })
        .toEqual({
          remainingValue: expect.any(String),
          reducedTo: expect.any(String)
        });

      const finalPoolState = await page.evaluate(() => {
        const chatMetadata = window.__grimwildTestApi.getMetadata()["grimwild.extension/metadata"];
        const entries = Object.values(chatMetadata).flat();
        const roll = entries.filter(entry => Array.isArray(entry.dice) && Array.isArray(entry.thornEffect)).at(-1);
        const pools = window.__grimwildTestApi.getMetadata()["grimwild.pool.extension/metadata"];
        const pool = Object.values(pools)[0] ?? null;
        if (!roll || !pool) return null;

        const reductionText = roll.thornEffect?.[1] ?? "";
        const match = reductionText.match(/^4 ➜ (\d+)$/);
        return match ? { expectedRemaining: match[1], actualRemaining: String(pool.value) } : null;
      });

      expect(finalPoolState).not.toBeNull();
      expect(finalPoolState.actualRemaining).toBe(finalPoolState.expectedRemaining);
    } finally {
      await flushDebug();
    }
  });
});

import { expect, test } from "@playwright/test";
import { buildCharacter } from "./helpers/characters.js";
import { attachDebugLogging } from "./helpers/debug.js";

const openCharacterSheet = async page => {
  await page.goto("/?mockOwlbear=1");

  await page.evaluate(character => {
    window.__grimwildTestApi.setCharacters([ character ]);
  }, buildCharacter({
    id: 1,
    name: "Sheet Test Character"
  }));

  await page.getByRole("button", { name: "Open" }).click();
  await expect(page.getByText("CHARACTER", { exact: true })).toBeVisible();
};

const statSection = (page, label) => page.locator("div").filter({
  has: page.locator("b", { hasText: label })
}).filter({
  has: page.getByRole("button", { name: "Roll" })
}).first();

test.describe("Character Sheet", () => {
  test("allows all attribute values from 1 to 3", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      const attributes = [
        [ "Brawn", "1" ],
        [ "Agility", "2" ],
        [ "Wits", "3" ],
        [ "Presence", "1" ]
      ];

      for (const [label, value] of attributes) {
        const input = statSection(page, label).locator("input").first();
        await input.fill(value);
        await expect(input).toHaveValue(value);
      }
    } finally {
      await flushDebug();
    }
  });

  test("can mark and unmark all attributes", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      for (const label of [ "Brawn", "Agility", "Wits", "Presence" ]) {
        const checkbox = statSection(page, label).locator('input[type="checkbox"]').first();
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
      }
    } finally {
      await flushDebug();
    }
  });

  test("can mark and unmark bloodied and rattled", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      const conditionRow = page.locator("div").filter({
        hasText: "Bloodied"
      }).filter({
        hasText: "Rattled"
      }).first();

      const bloodied = conditionRow.locator('input[type="checkbox"]').nth(0);
      const rattled = conditionRow.locator('input[type="checkbox"]').nth(1);

      await bloodied.check();
      await expect(bloodied).toBeChecked();
      await bloodied.uncheck();
      await expect(bloodied).not.toBeChecked();

      await rattled.check();
      await expect(rattled).toBeChecked();
      await rattled.uncheck();
      await expect(rattled).not.toBeChecked();
    } finally {
      await flushDebug();
    }
  });
});

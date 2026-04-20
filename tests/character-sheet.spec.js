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

const statSection = (page, label) => page.locator(
  `xpath=//b[normalize-space()="${label}"]/ancestor::div[contains(@class,"_fieldStatContainer_")][1]`
);

const experienceSection = page => page.locator(
  'xpath=//b[normalize-space()="Experience"]/ancestor::div[contains(@class,"_statContainer_")][1]'
);

const labeledSelect = (page, label, index = 0) => page.locator(
  `xpath=(//div[contains(@class,"_fieldStatLabel_")][normalize-space()="${label}"]/following-sibling::select)[${index + 1}]`
);

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

  test("can mark and unmark story and spark", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      const storyRow = page.locator("div").filter({
        has: page.locator("b", { hasText: "Story" })
      }).first();
      const sparkRow = page.locator("div").filter({
        has: page.locator("b", { hasText: "Spark" })
      }).first();

      const story1 = storyRow.locator('input[type="checkbox"]').nth(0);
      const story2 = storyRow.locator('input[type="checkbox"]').nth(1);
      const spark1 = sparkRow.locator('input[type="checkbox"]').nth(0);
      const spark2 = sparkRow.locator('input[type="checkbox"]').nth(1);

      await story1.check();
      await expect(story1).toBeChecked();
      await story1.uncheck();
      await expect(story1).not.toBeChecked();

      await story2.check();
      await expect(story2).toBeChecked();
      await story2.uncheck();
      await expect(story2).not.toBeChecked();

      await spark1.check();
      await expect(spark1).toBeChecked();
      await spark1.uncheck();
      await expect(spark1).not.toBeChecked();

      await spark2.check();
      await expect(spark2).toBeChecked();
      await spark2.uncheck();
      await expect(spark2).not.toBeChecked();
    } finally {
      await flushDebug();
    }
  });

  test("updates level and next-level XP correctly for experience values", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      const section = experienceSection(page);
      const input = section.locator("input").first();
      const counters = section.locator('div[class*="_talentCount_"]');

      await expect(input).toHaveValue("0");
      await expect(counters.nth(0)).toHaveText("1");
      await expect(counters.nth(1)).toHaveText("2");

      const cases = [
        { xp: "0", level: "1", next: "2" },
        { xp: "1", level: "1", next: "1" },
        { xp: "2", level: "2", next: "3" },
        { xp: "5", level: "3", next: "4" },
        { xp: "8", level: "3", next: "1" },
        { xp: "12", level: "4", next: "2" }
      ];

      for (const testCase of cases) {
        await input.fill(testCase.xp);
        await expect(input).toHaveValue(testCase.xp);
        await expect(counters.nth(0)).toHaveText(testCase.level);
        await expect(counters.nth(1)).toHaveText(testCase.next);
      }
    } finally {
      await flushDebug();
    }
  });

  test("allows selecting and updating traits", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      const firstTrait = labeledSelect(page, "2 you are", 0);
      const secondTrait = labeledSelect(page, "2 you are", 1);
      const notTrait = labeledSelect(page, "1 you're really not", 0);

      await firstTrait.selectOption("Brave");
      await secondTrait.selectOption("Curious");
      await notTrait.selectOption("Rash");

      await expect(firstTrait).toHaveValue("Brave");
      await expect(secondTrait).toHaveValue("Curious");
      await expect(notTrait).toHaveValue("Rash");
    } finally {
      await flushDebug();
    }
  });

  test("allows selecting and updating desires", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      const firstDesire = labeledSelect(page, "2 you want", 0);
      const secondDesire = labeledSelect(page, "2 you want", 1);
      const notDesire = labeledSelect(page, "1 you really don't", 0);

      await firstDesire.selectOption("Justice");
      await secondDesire.selectOption("Wisdom");
      await notDesire.selectOption("Power");

      await expect(firstDesire).toHaveValue("Justice");
      await expect(secondDesire).toHaveValue("Wisdom");
      await expect(notDesire).toHaveValue("Power");
    } finally {
      await flushDebug();
    }
  });

  test("can add, edit, and remove a bond", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      await page.getByRole("button", { name: "Add PC Bond" }).click();

      const bondName = page.locator('xpath=(//div[normalize-space()="PC:"]/following-sibling::input[@type="text"])[last()]');
      await bondName.fill("Bruno");
      await expect(bondName).toHaveValue("Bruno");

      const selects = page.getByRole("combobox");
      const intensity = selects.nth(-2);
      const nature = selects.nth(-1);

      await intensity.selectOption("Deep");
      await nature.selectOption("Respect");

      await expect(intensity).toHaveValue("Deep");
      await expect(nature).toHaveValue("Respect");

      const bondDelete = page.locator('xpath=(//div[normalize-space()="PC:"]/following-sibling::button[normalize-space()="×"])[last()]');
      await bondDelete.click();
      await expect(page.locator('xpath=//div[normalize-space()="PC:"]/following-sibling::input[@type="text"]')).toHaveCount(0);
    } finally {
      await flushDebug();
    }
  });

  test("rolls the correct number of dice for an attribute and shows the result in chat", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openCharacterSheet(page);

      const brawn = statSection(page, "Brawn");
      const brawnValue = brawn.locator("input").first();
      await brawnValue.fill("3");
      await expect(brawnValue).toHaveValue("3");

      await brawn.getByRole("button", { name: "Roll" }).click();

      await expect(page.getByRole("button", { name: "Chat" })).toBeVisible();
      await expect(page.getByText("Sheet Test Character", { exact: true })).toBeVisible();

      await expect
        .poll(async () => {
          return page.evaluate(() => {
            const chatMetadata = window.__grimwildTestApi.getMetadata()["grimwild.extension/metadata"];
            const entries = Object.values(chatMetadata).flat();
            const lastRoll = entries.filter(entry => Array.isArray(entry.dice)).at(-1);
            if (!lastRoll) return null;

            return {
              user: lastRoll.user,
              diceCount: lastRoll.dice.length
            };
          });
        })
        .toEqual({
          user: "Sheet Test Character",
          diceCount: 3
        });
    } finally {
      await flushDebug();
    }
  });
});

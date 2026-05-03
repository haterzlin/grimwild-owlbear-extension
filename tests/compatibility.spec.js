import { expect, test } from "@playwright/test";
import { attachDebugLogging } from "./helpers/debug.js";
import {
  buildLegacyCharacterMetadata,
  LEGACY_1_2_CHARACTERS,
  LEGACY_1_2_MESSY_CHARACTERS
} from "./fixtures/legacy-1-2-characters.js";

const openCharacterByName = async (page, name) => {
  const row = page.locator(
    `xpath=//input[@value="${name}"]/ancestor::div[contains(@class,"_characterRow_")][1]`
  );
  await expect(row).toBeVisible();
  await row.getByRole("button", { name: "Open" }).click();
};

const closeCharacter = async page => {
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();
};

const openPathScreenForCharacter = async (page, name) => {
  await openCharacterByName(page, name);
  await page.getByRole("button", { name: "Path" }).click();
};

const seedLegacyMetadata = async (page, characters) => {
  await page.evaluate(metadata => {
    window.__grimwildTestApi.setMetadata(metadata);
  }, buildLegacyCharacterMetadata(characters));
};

const coreTalentTrackerInput = (page, label) => page.locator(
  `xpath=//div[normalize-space()="${label}"]/following::input[1]`
).first();

const trackerTextInput = (page, label, index = 0) => page.locator(
  `xpath=(//div[normalize-space()="${label}"]/following::input[not(@type="checkbox")])[${index + 1}]`
);

const trackerCheckboxInput = (page, label, index = 0) => page.locator(
  `xpath=(//div[normalize-space()="${label}"]/following::input[@type="checkbox"])[${index + 1}]`
);

const savedCharacter = async page => page.evaluate(() => {
  const characterMetadata = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
  return Object.values(characterMetadata)[0] ?? null;
});

test.describe("Compatibility", () => {
  test("hydrates and renders all clean legacy free-path fixtures", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);

    try {
      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();

      await seedLegacyMetadata(page, LEGACY_1_2_CHARACTERS);

      for (const legacyCharacter of LEGACY_1_2_CHARACTERS) {
        await openPathScreenForCharacter(page, legacyCharacter.name);

        await expect(page.getByText(legacyCharacter.path.toUpperCase(), { exact: true })).toBeVisible();
        await expect(page.getByText("CORE TALENT", { exact: true })).toBeVisible();
        await expect(page.getByText(legacyCharacter.coreTalent.name, { exact: true })).toBeVisible();

        await closeCharacter(page);
      }
    } finally {
      await flushDebug();
    }
  });

  test("normalizes messy legacy fixtures and persists normalized metadata after save", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);

    try {
      const messyPaladin = LEGACY_1_2_MESSY_CHARACTERS.find(character => character.path === "paladin");

      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();

      await seedLegacyMetadata(page, [ messyPaladin ]);

      await openPathScreenForCharacter(page, messyPaladin.name);

      await expect(page.getByText("PALADIN", { exact: true })).toBeVisible();
      await expect(page.getByText("Tenet #1", { exact: true })).toBeVisible();
      await expect(page.getByText("Tenent #1", { exact: true })).toHaveCount(0);

      const tenetOneInput = coreTalentTrackerInput(page, "Tenet #1");
      await tenetOneInput.fill("Hold the line");
      await expect(tenetOneInput).toHaveValue("Hold the line");

      await expect
        .poll(async () => page.evaluate(() => {
          const characterMetadata = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
          const character = Object.values(characterMetadata)[0];
          return character?.coreTalent?.trackers?.map(tracker => ({
            name: tracker.name,
            value1: tracker.value1 ?? null
          }));
        }))
        .toEqual([
          { name: "Smite", value1: null },
          { name: "", value1: null },
          { name: "", value1: null },
          { name: "", value1: null },
          { name: "", value1: null },
          { name: "", value1: null },
          { name: "Tenet #1", value1: "Hold the line" },
          { name: "Tenet #2", value1: "" },
          { name: "Tenet #3", value1: "" }
        ]);
    } finally {
      await flushDebug();
    }
  });

  test("normalizes checkbox-heavy bard legacy trackers before persisting", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);

    try {
      const messyBard = LEGACY_1_2_MESSY_CHARACTERS.find(character => character.path === "bard");

      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();
      await seedLegacyMetadata(page, [ messyBard ]);

      await openPathScreenForCharacter(page, messyBard.name);

      await expect(page.getByText("BARD", { exact: true })).toBeVisible();
      await expect(page.getByText("Unexpected", { exact: true })).toHaveCount(0);

      const melodiesCheckbox = trackerCheckboxInput(page, "Melodies");
      await melodiesCheckbox.check();
      await expect(melodiesCheckbox).toBeChecked();

      await expect
        .poll(async () => {
          const character = await savedCharacter(page);
          return character?.coreTalent?.trackers?.map(tracker => ({
            name: tracker.name,
            checked: tracker.checked ?? null
          }));
        })
        .toEqual([
          { name: "Bardsongs", checked: true },
          { name: "", checked: false },
          { name: "", checked: true },
          { name: "", checked: true },
          { name: "", checked: false },
          { name: "Melodies", checked: true },
          { name: "", checked: false },
          { name: "", checked: false },
          { name: "", checked: false },
          { name: "", checked: false }
        ]);
    } finally {
      await flushDebug();
    }
  });

  test("normalizes cleric fieldTwo trackers before persisting", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);

    try {
      const messyCleric = LEGACY_1_2_MESSY_CHARACTERS.find(character => character.path === "cleric");

      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();
      await seedLegacyMetadata(page, [ messyCleric ]);

      await openPathScreenForCharacter(page, messyCleric.name);

      await expect(page.getByText("CLERIC", { exact: true })).toBeVisible();

      const majorPoolInput = trackerTextInput(page, "Major", 1);
      await majorPoolInput.fill("6");
      await expect(majorPoolInput).toHaveValue("6");

      await expect
        .poll(async () => {
          const character = await savedCharacter(page);
          return character?.coreTalent?.trackers?.map(tracker => ({
            name: tracker.name,
            value1: tracker.value1 ?? "",
            value2: tracker.value2 ?? ""
          }));
        })
        .toEqual([
          { name: "Major", value1: "Radiance", value2: "6" },
          { name: "Minor", value1: "Warding", value2: "" },
          { name: "Minor", value1: "", value2: "4" }
        ]);
    } finally {
      await flushDebug();
    }
  });

  test("normalizes wizard repeated theorem trackers before persisting", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);

    try {
      const messyWizard = LEGACY_1_2_MESSY_CHARACTERS.find(character => character.path === "wizard");

      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();
      await seedLegacyMetadata(page, [ messyWizard ]);

      await openPathScreenForCharacter(page, messyWizard.name);

      await expect(page.getByText("WIZARD", { exact: true })).toBeVisible();

      const secondTheoremInput = trackerTextInput(page, "Theorems", 1);
      await secondTheoremInput.fill("Mirror Crown");
      await expect(secondTheoremInput).toHaveValue("Mirror Crown");

      await expect
        .poll(async () => {
          const character = await savedCharacter(page);
          return character?.coreTalent?.trackers?.map(tracker => ({
            name: tracker.name,
            value1: tracker.value1 ?? ""
          }));
        })
        .toEqual([
          { name: "Spells", value1: "3" },
          { name: "Potent Spells", value1: "1" },
          { name: "Theorems", value1: "Spirit Gate" },
          { name: "Theorems", value1: "Mirror Crown" }
        ]);
    } finally {
      await flushDebug();
    }
  });

  test("preserves unknown legacy rogue talent records during save", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);

    try {
      const legacyRogue = LEGACY_1_2_CHARACTERS.find(character => character.path === "rogue");

      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();
      await seedLegacyMetadata(page, [ legacyRogue ]);

      await openPathScreenForCharacter(page, legacyRogue.name);

      await expect(page.getByText("ROGUE", { exact: true })).toBeVisible();

      const contingencyInput = trackerTextInput(page, "Contingency");
      await contingencyInput.fill("4");
      await expect(contingencyInput).toHaveValue("4");

      await expect
        .poll(async () => {
          const character = await savedCharacter(page);
          return {
            coreTrackers: character?.coreTalent?.trackers?.map(tracker => ({
              name: tracker.name,
              value1: tracker.value1 ?? ""
            })),
            talentNames: character?.talents?.map(talent => talent.name),
            unknownTalentTrackers: character?.talents?.[0]?.trackers?.map(tracker => ({
              name: tracker.name,
              value1: tracker.value1 ?? ""
            }))
          };
        })
        .toEqual({
          coreTrackers: [
            { name: "Contingency", value1: "4" }
          ],
          talentNames: [ "CONTINGENCY" ],
          unknownTalentTrackers: [
            { name: "Contingency", value1: "3" }
          ]
        });
    } finally {
      await flushDebug();
    }
  });
});

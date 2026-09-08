import { expect, test } from "@playwright/test";
import {
  buildConvertedCharacter,
  getCharacterGroupsFromMetadata,
  getNextCharacterId
} from "../src/domain/characters.js";
import { buildCharacter } from "./helpers/characters.js";
import { attachDebugLogging } from "./helpers/debug.js";

test.describe("Character List", () => {
  test("classifies supported, importable, converted, and malformed records", () => {
    const supported = buildCharacter({ id: 1, name: "CE Character" });
    const legacy = { ...supported, id: 2, name: "Old Character", rulesVersion: "ce-p5.2" };
    const converted = { ...supported, id: 3, name: "Converted Character", convertedFrom: 2 };
    const malformed = { id: 4, name: "Malformed Character", rulesVersion: "ce-p5.2" };
    const metadata = {
      "grimwild.character.extension/metadata": {
        1: supported,
        2: legacy,
        3: converted,
        4: malformed
      }
    };

    const groups = getCharacterGroupsFromMetadata(metadata);
    expect(groups.supportedCharacters).toEqual([ supported, converted ]);
    expect(groups.importableCharacters).toEqual([]);
    expect(groups.hiddenCharacters).toEqual([ legacy, malformed ]);
    expect(getCharacterGroupsFromMetadata({
      "grimwild.character.extension/metadata": { 1: supported, 2: legacy }
    }).importableCharacters).toEqual([ legacy ]);
    expect(getNextCharacterId(metadata, () => 3)).toBe(5);
  });

  test("converts legacy data with current catalog talents and default trackers", () => {
    const oldCharacter = buildCharacter({
      id: 7,
      rulesVersion: "ce-p5.2",
      name: "Old Character",
      path: "BARD",
      experience: 4,
      bonds: [{ name: "Keep this bond" }],
      coreTalent: { name: "OLD CORE", trackers: [{ type: "checkbox", checked: true }] },
      talents: [
        { name: "KNOWN", trackers: [{ type: "checkbox", checked: true }] },
        { name: "REMOVED", trackers: [{ type: "field", value1: "old" }] },
        { name: "BACKGROUND", trackers: [{ type: "field", value1: "old" }] }
      ]
    });
    const pathsById = {
      bard: {
        coreTalent: { name: "CURRENT CORE", trackers: [{ type: "checkbox" }] },
        pathTalent: [{ name: "KNOWN", trackers: [{ type: "checkbox" }] }]
      }
    };
    const backgroundTalents = [{ name: "BACKGROUND", trackers: [{ type: "field" }] }];

    const converted = buildConvertedCharacter(oldCharacter, {
      id: 8,
      pathsById,
      backgroundTalents
    });

    expect(converted).toMatchObject({
      id: 8,
      rulesVersion: "ce-p5.3",
      convertedFrom: 7,
      name: "Old Character",
      path: "bard",
      experience: 4,
      bonds: oldCharacter.bonds
    });
    expect(converted.coreTalent).toEqual({
      name: "CURRENT CORE",
      trackers: [{ type: "checkbox", checked: false }]
    });
    expect(converted.talents).toEqual([
      { name: "KNOWN", trackers: [{ type: "checkbox", checked: false }] },
      { name: "BACKGROUND", trackers: [{ type: "field", value1: "" }] }
    ]);
    expect(oldCharacter.coreTalent.trackers[0].checked).toBe(true);
    expect(oldCharacter.talents[0].trackers[0].checked).toBe(true);
    expect(buildConvertedCharacter(oldCharacter, { id: 8, pathsById: {} })).toBeNull();
  });

  test("keeps row actions visible for an empty-path character with a long name", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();

      await page.evaluate(character => {
        window.__grimwildTestApi.setCharacters([ character ]);
      }, buildCharacter({
        id: 1,
        name: "A Very Long Grimwild Character Name That Should Not Hide Open"
      }));

      const characterRow = page.locator("div").filter({
        has: page.locator('input[value="A Very Long Grimwild Character Name That Should Not Hide Open"]')
      }).first();

      await expect(characterRow.getByRole("button", { name: "Open" })).toBeVisible();
      await expect(characterRow.getByRole("button", { name: "×" })).toBeVisible();
      await expect(characterRow.getByText("-", { exact: true })).toBeVisible();
    } finally {
      await flushDebug();
    }
  });

  test("shows unsupported records without making them editable", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();

      const supported = buildCharacter({ id: 1, name: "CE Character" });
      const unsupported = { ...supported, id: 2, name: "Old Character", rulesVersion: "1.4" };
      const oldPreview = { ...supported, id: 3, name: "Old Preview Character", rulesVersion: "ce-p5.2" };
      const malformed = { id: 4, name: "Malformed Character", rulesVersion: "ce-p5.3" };
      await page.evaluate(characters => {
        window.__grimwildTestApi.setCharacters(characters);
      }, [ supported, unsupported, oldPreview, malformed ]);

      await expect(page.getByText("Some saved characters are unsupported. Recreate them for CE Preview 5.3.")).toBeVisible();
      await expect(page.locator('input[value="CE Character"]')).toBeVisible();
      await expect(page.locator('input[value="Old Character"]')).toHaveCount(0);
      await expect(page.locator('input[value="Old Preview Character"]')).toHaveCount(0);
      await expect(page.locator('input[value="Malformed Character"]')).toHaveCount(0);

      await page.getByRole("button", { name: "Add Character" }).click();
      await expect.poll(async () => page.evaluate(() => {
        const records = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
        return Object.values(records).find(character => character.name === "")?.rulesVersion;
      })).toBe("ce-p5.3");

      const metadata = await page.evaluate(() => window.__grimwildTestApi.getMetadata());
      expect(metadata["grimwild.character.extension/metadata"][2].rulesVersion).toBe("1.4");
      expect(metadata["grimwild.character.extension/metadata"][3].rulesVersion).toBe("ce-p5.2");
      expect(metadata["grimwild.character.extension/metadata"][4].rulesVersion).toBe("ce-p5.3");
    } finally {
      await flushDebug();
    }
  });

  test("creates, updates, reopens, and removes only supported characters", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await page.goto("/?mockOwlbear=1");
      await expect(page.getByText("CHARACTER LIST", { exact: true })).toBeVisible();

      const unsupported = { ...buildCharacter({ id: 7, name: "Keep This Character" }), rulesVersion: "ce-p5.2" };
      await page.evaluate(character => {
        window.__grimwildTestApi.setMetadata({
          "grimwild.character.extension/metadata": { 7: character },
          "grimwild.pool.extension/metadata": { pool: { id: "pool" } },
          "grimwild.extension/metadata": { chat: [{ id: 1, description: "keep" }] },
          "grimwild.gm.extension/metadata": { suspense: "3" }
        });
      }, unsupported);

      await page.getByRole("button", { name: "Add Character" }).click();
      const createdId = await page.evaluate(() => {
        const records = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
        return Object.values(records).find(character => character.name === "")?.id;
      });
      expect(await page.evaluate(id => window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"][id].rulesVersion, createdId)).toBe("ce-p5.3");

      await page.getByRole("button", { name: "Open" }).click();
      const name = page.locator('xpath=//div[normalize-space()="Name"]/following-sibling::input');
      await name.fill("New Preview 5.3 Character");
      await expect.poll(async () => page.evaluate(id => window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"][id]?.name, createdId)).toBe("New Preview 5.3 Character");

      await page.getByRole("button", { name: "Close" }).click();
      await expect(page.locator('input[value="New Preview 5.3 Character"]')).toBeVisible();

      page.once("dialog", dialog => dialog.accept());
      await page.locator('input[value="New Preview 5.3 Character"]').locator("xpath=ancestor::div[contains(@class,\"_characterRow_\")]").getByRole("button", { name: "×" }).click();

      const metadata = await page.evaluate(() => window.__grimwildTestApi.getMetadata());
      expect(metadata["grimwild.character.extension/metadata"][7].name).toBe("Keep This Character");
      expect(metadata["grimwild.character.extension/metadata"][createdId]).toBeUndefined();
      expect(metadata["grimwild.pool.extension/metadata"]).toEqual({ pool: { id: "pool" } });
      expect(metadata["grimwild.extension/metadata"]).toEqual({ chat: [{ id: 1, description: "keep" }] });
      expect(metadata["grimwild.gm.extension/metadata"]).toEqual({ suspense: "3" });
    } finally {
      await flushDebug();
    }
  });
});

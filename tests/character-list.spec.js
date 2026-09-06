import { expect, test } from "@playwright/test";
import { buildCharacter } from "./helpers/characters.js";
import { attachDebugLogging } from "./helpers/debug.js";

test.describe("Character List", () => {
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
      const malformed = { id: 3, name: "Malformed Character", rulesVersion: "ce-p5.2" };
      await page.evaluate(characters => {
        window.__grimwildTestApi.setCharacters(characters);
      }, [ supported, unsupported, malformed ]);

      await expect(page.getByText("Some saved characters are unsupported. Recreate them for CE Preview 5.2.")).toBeVisible();
      await expect(page.locator('input[value="CE Character"]')).toBeVisible();
      await expect(page.locator('input[value="Old Character"]')).toHaveCount(0);
      await expect(page.locator('input[value="Malformed Character"]')).toHaveCount(0);

      await page.getByRole("button", { name: "Add Character" }).click();
      await expect.poll(async () => page.evaluate(() => {
        const records = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
        return Object.values(records).find(character => character.name === "")?.rulesVersion;
      })).toBe("ce-p5.2");

      const metadata = await page.evaluate(() => window.__grimwildTestApi.getMetadata());
      expect(metadata["grimwild.character.extension/metadata"][2].rulesVersion).toBe("1.4");
      expect(metadata["grimwild.character.extension/metadata"][3].rulesVersion).toBe("ce-p5.2");
    } finally {
      await flushDebug();
    }
  });
});

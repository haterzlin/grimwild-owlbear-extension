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
});

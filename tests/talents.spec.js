import { expect, test } from "@playwright/test";
import { attachDebugLogging } from "./helpers/debug.js";

test.describe("Talents", () => {
  test("adds a talent from the selected path", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await page.goto("/?mockOwlbear=1");

      await page.getByRole("button", { name: "Add Character" }).click();
      await page.getByRole("button", { name: "Open" }).click();
      await page.getByRole("button", { name: "Path" }).click();

      await page.getByText("bard").click();
      await page.getByRole("button", { name: "Add Talent" }).click();

      await expect(page.getByText("SELECT PATH TO CHOOSE TALENT")).toBeVisible();
      await page.getByText("bard").click();

      await expect(page.getByText("SELECT TALENT FROM BARD")).toBeVisible();
      await expect(page.getByText("BARDIC LORE", { exact: true })).toBeVisible();

      await page.getByRole("button", { name: "Add Talent" }).first().click();
      await expect(page.getByText("TALENTS", { exact: true })).toBeVisible();

      await expect
        .poll(async () => {
          return page.evaluate(() => {
            const characterMetadata = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
            const characters = Object.values(characterMetadata);
            if (characters.length !== 1) return false;
            return characters[0].talents.some(talent => talent.name === "BARDIC LORE");
          });
        })
        .toBeTruthy();
    } finally {
      await flushDebug();
    }
  });
});

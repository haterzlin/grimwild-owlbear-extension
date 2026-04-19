import { expect, test } from "@playwright/test";

test.describe("Grimwild path flow", () => {
  test("renders picker and assigns a core path", async ({ page }) => {
    await page.goto("/?mockOwlbear=1");

    await expect(page.getByText("CHARACTER LIST")).toBeVisible();
    await page.getByRole("button", { name: "Add Character" }).click();

    await expect(page.getByText("PC:")).toBeVisible();
    await page.getByRole("button", { name: "Open" }).click();
    await page.getByRole("button", { name: "Path" }).click();

    await expect(page.getByText("SELECT CORE PATH")).toBeVisible();
    await expect(page.getByText("bard")).toBeVisible();
    await expect(page.getByText("wizard")).toBeVisible();

    await page.getByText("bard").click();

    await expect(page.getByText("CORE PATH", { exact: true })).toBeVisible();
    await expect(page.getByText("BARD", { exact: true })).toBeVisible();
    await expect(page.getByText("CORE TALENT")).toBeVisible();
    await expect(page.getByText("BARDSONG", { exact: true })).toBeVisible();
  });

  test("shows all externally configured paths in the picker", async ({ page }) => {
    await page.goto("/?mockOwlbear=1");

    await page.getByRole("button", { name: "Add Character" }).click();
    await page.getByRole("button", { name: "Open" }).click();
    await page.getByRole("button", { name: "Path" }).click();

    const expectedPaths = [
      "bard",
      "berserker",
      "cleric",
      "druid",
      "fighter",
      "monk",
      "paladin",
      "ranger",
      "rogue",
      "sorcerer",
      "warlock",
      "wizard"
    ];

    for (const pathName of expectedPaths) {
      await expect(page.getByText(pathName)).toBeVisible();
    }
  });

  test("adds a talent from the selected path", async ({ page }) => {
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
  });
});

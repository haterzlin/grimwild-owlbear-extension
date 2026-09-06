import { expect, test } from "@playwright/test";
import { attachDebugLogging } from "./helpers/debug.js";

const openPathTabForNewCharacter = async page => {
  await page.goto("/?mockOwlbear=1");
  await page.getByRole("button", { name: "Add Character" }).click();
  await page.getByRole("button", { name: "Open" }).click();
  await page.getByRole("button", { name: "Path" }).click();
};

test.describe("Paths", () => {
  test("renders picker and assigns a core path", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabForNewCharacter(page);

      await expect(page.getByText("SELECT CORE PATH")).toBeVisible();
      await expect(page.getByText("bard")).toBeVisible();
      await expect(page.getByText("wizard")).toBeVisible();

      await page.getByText("bard").click();

      await expect(page.getByText("CORE PATH", { exact: true })).toBeVisible();
      await expect(page.getByText("BARD", { exact: true })).toBeVisible();
      await expect(page.getByText("CORE TALENT")).toBeVisible();
      await expect(page.getByText("BARDSONG", { exact: true })).toBeVisible();
    } finally {
      await flushDebug();
    }
  });

  test("shows all externally configured paths in the picker", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabForNewCharacter(page);

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
    } finally {
      await flushDebug();
    }
  });

  test("can change the core path", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabForNewCharacter(page);

      await page.getByText("bard").click();
      await expect(page.getByText("BARD", { exact: true })).toBeVisible();

      await page.getByRole("button", { name: "Change Core Path" }).click();
      await expect(page.getByText("SELECT CORE PATH")).toBeVisible();

      await page.getByText("wizard").click();
      await expect(page.getByText("WIZARD", { exact: true })).toBeVisible();
      await expect(page.getByText("SPELLCRAFT", { exact: true })).toBeVisible();
    } finally {
      await flushDebug();
    }
  });

  test("can expand and collapse path details", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabForNewCharacter(page);

      await page.getByText("bard").click();
      await expect(page.getByRole("button", { name: "Expand Details" })).toBeVisible();
      await page.getByRole("button", { name: "Expand Details" }).click();

      await expect(page.getByText("Collapse Details")).toBeVisible();
      await expect(page.getByText("SONG COMPOSITION", { exact: true })).toBeVisible();

      await page.getByRole("button", { name: "Collapse Details" }).click();
      await expect(page.getByRole("button", { name: "Expand Details" })).toBeVisible();
    } finally {
      await flushDebug();
    }
  });

});

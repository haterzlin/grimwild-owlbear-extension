import { expect, test } from "@playwright/test";
import { attachDebugLogging } from "./helpers/debug.js";

test.describe("Paths", () => {
  test("renders picker and assigns a core path", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
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
    } finally {
      await flushDebug();
    }
  });

  test("shows all externally configured paths in the picker", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
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
    } finally {
      await flushDebug();
    }
  });
});

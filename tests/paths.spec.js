import { expect, test } from "@playwright/test";
import { addTalentToCharacter } from "../src/domain/paths.js";
import { buildCharacter } from "./helpers/characters.js";
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
      await expect(page.getByText("INSPIRATION", { exact: true })).toBeVisible();
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

  test("loads the CE catalogue with seven talents per existing path", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await page.goto("/?mockOwlbear=1");
      const catalogue = await page.evaluate(async () => {
        const ids = ["bard", "berserker", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"];
        return Object.fromEntries(await Promise.all(ids.map(async id => [id, await (await fetch(`/data/paths/${id}.json`)).json()])));
      });

      expect(Object.keys(catalogue)).toHaveLength(12);
      for (const path of Object.values(catalogue)) {
        expect(path.pathTalent).toHaveLength(7);
        expect(path.coreTalent.name).toBeTruthy();
      }
      expect(catalogue.bard.pathTalent.map(talent => talent.name)).toContain("FOLK HERO");
      expect(catalogue.druid.pathTalent.map(talent => talent.name)).toContain("PRIMAL GROWTH");
      expect(catalogue.wizard.pathTalent.map(talent => talent.name)).toContain("SPECIALTY SCHOOL");
    } finally {
      await flushDebug();
    }
  });

  test("does not add a duplicate talent but allows a cross-path talent", () => {
    const player = buildCharacter({ talents: [{ name: "BARDIC LORE" }] });
    const duplicate = addTalentToCharacter(player, { name: "BARDIC LORE" });
    const crossPath = addTalentToCharacter(player, { name: "ALCHEMIST" });

    expect(duplicate.talents).toHaveLength(1);
    expect(crossPath.talents.map(talent => talent.name)).toEqual(["BARDIC LORE", "ALCHEMIST"]);
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

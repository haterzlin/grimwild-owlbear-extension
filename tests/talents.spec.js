import { expect, test } from "@playwright/test";
import { attachDebugLogging } from "./helpers/debug.js";

const openPathTabWithCorePath = async (page, pathName = "bard") => {
  await page.goto("/?mockOwlbear=1");
  await page.getByRole("button", { name: "Add Character" }).click();
  await page.getByRole("button", { name: "Open" }).click();
  await page.getByRole("button", { name: "Path" }).click();
  await page.getByText(pathName).click();
  await expect(page.getByText(pathName.toUpperCase(), { exact: true })).toBeVisible();
};

const talentCard = (page, talentName) => page.locator(
  `xpath=//div[normalize-space()="${talentName}"]/ancestor::div[contains(@class,"_statContainer_")][1]`
);

test.describe("Talents", () => {
  test("adds a talent from the selected path", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabWithCorePath(page, "bard");
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

  test("can send a talent description to chat", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabWithCorePath(page, "bard");
      await page.getByRole("button", { name: "Add Talent" }).click();
      await page.getByText("bard").click();

      await talentCard(page, "BARDIC LORE").getByRole("button", { name: "➤" }).click();

      await expect
        .poll(async () => {
          return page.evaluate(() => {
            const chatMetadata = window.__grimwildTestApi.getMetadata()["grimwild.extension/metadata"];
            const entries = Object.values(chatMetadata).flat();
            const lastDescription = entries.filter(entry => entry.description).at(-1);
            return lastDescription ? lastDescription.description : null;
          });
        })
        .toBe("You gain any 3 wises and 1 extra thread per session. You take +1d on any story rolls pertaining to what you know or story details you add.");
    } finally {
      await flushDebug();
    }
  });

  test("can add a talent from a different path than the core path", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabWithCorePath(page, "bard");

      await page.getByRole("button", { name: "Add Talent" }).click();
      await expect(page.getByText("SELECT PATH TO CHOOSE TALENT")).toBeVisible();
      await page.getByText("wizard").click();

      await expect(page.getByText("SELECT TALENT FROM WIZARD")).toBeVisible();
      await expect(page.getByText("ALCHEMIST", { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Add Talent" }).first().click();

      await expect
        .poll(async () => {
          return page.evaluate(() => {
            const characterMetadata = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
            const characters = Object.values(characterMetadata);
            if (characters.length !== 1) return false;
            return characters[0].talents.some(talent => talent.name === "ALCHEMIST");
          });
        })
        .toBeTruthy();
    } finally {
      await flushDebug();
    }
  });

  test("can remove an added talent", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await openPathTabWithCorePath(page, "bard");

      await page.getByRole("button", { name: "Add Talent" }).click();
      await page.getByText("bard").click();
      await expect(page.getByText("BARDIC LORE", { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Add Talent" }).first().click();

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

      await talentCard(page, "BARDIC LORE").getByRole("button", { name: "×" }).click();

      await expect
        .poll(async () => {
          return page.evaluate(() => {
            const characterMetadata = window.__grimwildTestApi.getMetadata()["grimwild.character.extension/metadata"];
            const characters = Object.values(characterMetadata);
            if (characters.length !== 1) return false;
            return characters[0].talents.some(talent => talent.name === "BARDIC LORE");
          });
        })
        .toBeFalsy();
    } finally {
      await flushDebug();
    }
  });
});

import { expect, test } from "@playwright/test";

const attachDebugLogging = (page, testInfo) => {
  const consoleMessages = [];
  const failedRequests = [];

  page.on("console", message => {
    consoleMessages.push(`[${message.type()}] ${message.text()}`);
  });

  page.on("requestfailed", request => {
    const failure = request.failure();
    failedRequests.push(`${request.method()} ${request.url()} :: ${failure ? failure.errorText : "unknown failure"}`);
  });

  page.on("response", response => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.request().method()} ${response.url()} :: HTTP ${response.status()}`);
    }
  });

  return async () => {
    if (testInfo.status === testInfo.expectedStatus) return;

    const consoleBody = consoleMessages.length ? consoleMessages.join("\n") : "No console output captured.";
    const networkBody = failedRequests.length ? failedRequests.join("\n") : "No failed requests captured.";

    console.error("\n=== Playwright browser console ===\n" + consoleBody);
    console.error("\n=== Playwright network failures ===\n" + networkBody);

    await testInfo.attach("browser-console", {
      body: consoleBody,
      contentType: "text/plain"
    });

    await testInfo.attach("network-failures", {
      body: networkBody,
      contentType: "text/plain"
    });
  };
};

test.describe("Grimwild path flow", () => {
  test("keeps row actions visible for an empty-path character with a long name", async ({ page }, testInfo) => {
    const flushDebug = attachDebugLogging(page, testInfo);
    try {
      await page.goto("/?mockOwlbear=1");

      await page.evaluate(() => {
        window.__grimwildTestApi.setCharacters([
          {
            id: 1,
            name: "A Very Long Grimwild Character Name That Should Not Hide Open",
            path: "",
            player: "",
            background1: "",
            background2: "",
            wise1: "",
            wise2: "",
            groupArc: "",
            characterArc: "",
            features: "",
            conditions: "",
            brawn: 0,
            agility: 0,
            wits: 0,
            presence: 0,
            brawnMark: false,
            agilityMark: false,
            witsMark: false,
            presenceMark: false,
            bloodied: false,
            rattled: false,
            story1: false,
            story2: false,
            spark1: false,
            spark2: false,
            experience: 0,
            trait1: "",
            trait2: "",
            notTrait: "",
            desire1: "",
            desire2: "",
            notDesire: "",
            bonds: [],
            talents: [],
            coreTalent: null,
            bio: ""
          }
        ]);
      });

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

export const attachDebugLogging = (page, testInfo) => {
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

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 8000 --strictPort",
    url: "http://127.0.0.1:8000",
    reuseExistingServer: true,
    timeout: 30000
  },
  use: {
    baseURL: "http://127.0.0.1:8000",
    trace: "on-first-retry"
  }
});

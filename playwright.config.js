const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'e2e-tests', // where your E2E tests live
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  use: {
    headless: true,
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI, // speeds up local runs
    timeout: 120 * 1000,
  },
});

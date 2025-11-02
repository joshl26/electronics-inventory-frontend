const { test, expect } = require('@playwright/test');

test('homepage has app title', async ({ page }) => {
  await page.goto(process.env.E2E_BASE_URL || 'http://localhost:3000');
  const title = page.getByTestId('app-title');
  await expect(title).toBeVisible();
});

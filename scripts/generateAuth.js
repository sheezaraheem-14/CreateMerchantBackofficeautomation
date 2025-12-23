import { chromium } from '@playwright/test';
import { testData } from '../data/testData.js';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  await page.goto(`${testData.baseURL}/auth/login`, { waitUntil: 'networkidle' });

  if (testData.user.accountId) {
    await page.getByRole('textbox', { name: 'Account ID' }).fill(testData.user.accountId);
  }
  await page.getByRole('textbox', { name: 'Email' }).fill(testData.user.email);
  await page.getByTestId('password-input').fill(testData.user.password);
  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ Use the exact selector for Dashboard page
  await page.waitForSelector('span.page_title', { timeout: 60000 });

  // Save auth state
  await page.context().storageState({ path: 'auth.json' });
  console.log('✅ auth.json generated successfully');

  await browser.close();
})();

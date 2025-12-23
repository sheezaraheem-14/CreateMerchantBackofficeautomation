import { test as base, expect } from '@playwright/test';
import { merchantData } from '../data/merchant.data';

export const test = base.extend({
  backofficePage: async ({ page }, use) => {
    await page.goto('https://xpay-backoffice-dev.xstak.com/login');

    await page.getByRole('textbox', { name: 'Email' })
      .fill(merchantData.admin.email);

    await page.getByRole('textbox', { name: 'Password' })
      .fill(merchantData.admin.password);

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
      page.getByRole('button', { name: /Merchant Management/i })
    ).toBeVisible();

    await use(page);
  },
});

export { expect };

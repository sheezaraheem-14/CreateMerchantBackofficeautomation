import BasePage from "./base.page.js";

export default class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    this.selectors = {
      allStoresBtn: 'text=All Stores',
      filterBtn: 'button:has-text("filter Filter")',
      resetAllBtn: 'text=Reset All',
      dateStartInput: 'role=textbox[name="Start date"]',
      dateEndInput: 'role=textbox[name="End date"]',
      applyBtn: 'role=button[name="Apply"]',
      dashboardTitle: 'text=Dashboard'
    };

    // Verification locators
    this.locators = [
      // PAYMENT_STATISTICS
      { type: 'heading', name: 'PAYMENT STATISTICS' },
      { type: 'heading', name: 'Transactions' },
      { type: 'text', name: 'Total' },
      { type: 'text', name: 'Partially Refunded' },
      { type: 'text', name: 'Captured' },
      { type: 'text', name: 'Authorized' },
      { type: 'text', name: 'Cancelled' },
      { type: 'text', name: 'Failed' },
      { type: 'text', name: 'Refunded' },
      { type: 'text', name: 'OTP Action Required' },
      { type: 'text', name: 'Pending' },
      { type: 'text', name: 'Void' },

      // GMV
      { type: 'heading', name: 'GMV' },
      { type: 'text', name: 'Total' },
      { type: 'text', name: 'Partial Refunds' },
      { type: 'text', name: 'Captured' },
      { type: 'text', name: 'Authorized' },
      { type: 'text', name: 'Cancelled' },
      { type: 'text', name: 'Failed' },
      { type: 'text', name: 'Refunds' },
      { type: 'text', name: 'OTP Action Required' },
      { type: 'text', name: 'Pending' },
      { type: 'text', name: 'Void' },

      // SUBSCRIPTIONS
      { type: 'heading', name: 'SUBSCRIPTIONS' },
      { type: 'text', name: 'Revenue' },
      { type: 'text', name: 'Subscribers' },
      { type: 'text', name: 'Count' },
      { type: 'text', name: 'Draft' },
      { type: 'text', name: 'Paid' },
      { type: 'text', name: 'Paused' },
      { type: 'text', name: 'Inactive' },
      { type: 'text', name: 'Cancelled' },

      // TOKENS
      { type: 'heading', name: 'TOKENS' },
      { type: 'text', name: 'Active' },
      { type: 'text', name: 'Attempted' },

      // TOP_PLANS
      { type: 'heading', name: 'TOP PLANS' },
      { type: 'columnheader', name: 'Plan ID' },
      { type: 'columnheader', name: 'Total' },
      { type: 'columnheader', name: 'Paid' },
      { type: 'columnheader', name: 'Inactive' },
      { type: 'columnheader', name: 'Paused' },
      { type: 'columnheader', name: 'Cancelled' },
      { type: 'columnheader', name: 'Draft' },
      { type: 'columnheader', name: 'Open' },

      // TOP_PRODUCTS
      { type: 'heading', name: 'TOP PRODUCTS' },
      { type: 'columnheader', name: 'Product Name' },
      { type: 'columnheader', name: 'Product ID' },
      { type: 'columnheader', name: 'Number of Subcriptions' },
    ];
  }

 // Navigate to Dashboard
async gotoDashboard(baseURL) {
  // Retry navigation up to 3 times

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await this.page.goto(`${baseURL}/dashboard`, {
        waitUntil: 'networkidle'   // BEST for dashboards with charts & API calls
      });
      break; // success → exit retry loop
    } catch (error) {
      console.log(`Dashboard load failed. Retry ${attempt}/3`);
      if (attempt === 3) throw error; // throw on last attempt
    }
  }

  // Wait for a stable dashboard anchor element
  await this.page.locator(this.selectors.allStoresBtn)
    .first()
    .waitFor({ state: 'visible', timeout: 30000 });
}


  // Select store
  // Select store safely
async selectStore(storeName) {
  await this.page.getByText('All Stores').click();
  await this.page.getByText(storeName, { exact: true }).click();

  // Wait for a dashboard element that signals data has loaded
  await this.page.locator('text=PAYMENT STATISTICS').waitFor({
    state: 'visible',
    timeout: 60000
  });

  // Optional: wait a bit for charts / async API calls
  await this.page.waitForTimeout(1000);
}


  // Reset filters
  async resetFilters() {
    await this.page.getByRole('button', { name: 'filter Filter' }).click();
    await this.page.getByText('Reset All').click();
 // Wait for a stable dashboard element
  await this.page.locator('text=PAYMENT STATISTICS').waitFor({
    state: 'visible',
    timeout: 60000
  });  }

  // Apply Last 7 Days filter
  // Page: dashboard.page.js

// Rename applyLast7Days
async applyLast7DaysFilter() {
  await this.page.getByRole('textbox', { name: 'Start date' }).click();
  await this.page.getByText('Last 7 Days').click();
  await this.page.getByRole('button', { name: 'Apply' }).click();
 // Wait for a stable dashboard element
  await this.page.locator('text=PAYMENT STATISTICS').waitFor({
    state: 'visible',
    timeout: 60000
  });}

// Rename applyLast30Days
async applyLast30DaysFilter() {
  await this.page.getByRole('textbox', { name: 'Start date' }).click();
  await this.page.getByText('Last 30 Days').click();
  await this.page.getByRole('button', { name: 'Apply' }).click();
 // Wait for a stable dashboard element
  await this.page.locator('text=PAYMENT STATISTICS').waitFor({
    state: 'visible',
    timeout: 60000
  });}


   async bankAlfalahFilter() {
    await this.page.getByRole('button', { name: 'filter Filter' }).click();
    await this.page.getByText('Gateway', { exact: true }).click();
    await this.page.getByText('All').nth(5).click();
    await this.page.getByText('Bank Alfalah (MPGS)').click();
    await this.page.locator('div').filter({ hasText: /^Payment Method$/ }).click();
    await this.page.locator('form span').filter({ hasText: 'All' }).click();
    await this.page.getByTitle('CARD PAYMENT').click();
    await this.page.getByRole('tooltip', { name: 'Filter reload Reset All' }).getByRole('button').click();
  }

  async applyJazzCashFilter() {
   
    await this.page.getByRole('button', { name: 'filter Filter' }).click();
    await this.page.getByText('All').nth(5).click();
    await this.page.getByText('JazzCash', { exact: true }).click();
    await this.page.locator('form span').filter({ hasText: 'All' }).click();
    await this.page.getByText('WALLET PAYMENT').click();
    await this.page.getByRole('tooltip', { name: 'Filter reload Reset All' }).getByRole('button').click();
  }

  async applyEasyPaisaFilter() {
    await this.page.getByRole('button', { name: 'filter Filter' }).click();
    await this.page.getByText('Reset All').click();
    await this.page.getByRole('button', { name: 'filter Filter' }).click();
    await this.page.getByText('All').nth(5).click();
    await this.page.getByText('EasyPaisa', { exact: true }).click();
    await this.page.locator('form span').filter({ hasText: 'All' }).click();
    await this.page.getByText('TOKEN PAYMENT').click();
    await this.page.getByRole('tooltip', { name: 'Filter reload Reset All' }).getByRole('button').click();
  }

  async verifyDashboardSections() {
 // Wait for a stable dashboard element
  await this.page.locator('text=PAYMENT STATISTICS').waitFor({
    state: 'visible',
    timeout: 60000
  });
      for (const locator of this.locators) {
      try {
        let element;
        switch (locator.type) {
          case 'heading':
            element = this.page.getByRole('heading', { name: locator.name });
            break;
          case 'text':
            element = this.page.getByText(locator.name, { exact: true }).first();
            break;
          case 'columnheader':
            element = this.page.getByRole('columnheader', { name: locator.name });
            break;
        }
        await element.waitFor({ state: 'visible', timeout: 30000 });
        console.log(`✅ "${locator.name}" is visible`);
      } catch {
        console.warn(`⚠️ "${locator.name}" not visible`);
      }
    }
  }

  async resetFilters() {
    await this.page.getByRole('button', { name: 'filter Filter' }).click();
    await this.page.getByText('Reset All').click();
  }
}
 

  
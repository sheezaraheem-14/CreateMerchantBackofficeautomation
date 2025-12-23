// pages/plans.page.js
export default class PlansPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.plansTab = page.getByRole('link', { name: 'Plans' });
    this.createPlanBtn = page.getByRole('button', { name: 'Create Plan' });
    this.priceInput = page.getByRole('spinbutton', { name: 'Price' });
    this.intervalInput = page.getByRole('spinbutton', { name: 'Every' });
    this.intervalDropdown = page.getByText('Select Interval');
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.addButton = page.getByRole('button', { name: 'Add' });
  }

  // 🔹 Open Plans via Subscriptions tab
  async openPlans() {
    await this.page.getByRole('menuitem', { name: 'schedule Subscriptions' }).click();
    await this.plansTab.waitFor({ state: 'visible' });
    await this.plansTab.click();
    console.log("✅ Plans tab opened");
  }

  // 🔹 Create Plan
 async createPlan(plan) {
  const { price, currency, every, interval, description, productName } = plan;

  // Click Create Plan button
  await this.createPlanBtn.click();
  console.log("✅ Clicked Create Plan");

  // Fill Price
  await this.priceInput.fill(price.toString());
  console.log(`✅ Price filled: ${price}`);

  // Select Currency reliably
  const currencyOption = this.page.locator(`span.ant-select-selection-item[title="${currency}"]`);
  await currencyOption.click();
  console.log(`✅ Currency selected: ${currency}`);

  // Fill billing interval "Every"
  await this.intervalInput.fill(every.toString());
  console.log(`✅ Billing interval filled: Every ${every}`);

  // Select Interval from dropdown (Month/Year)
  const intervalDropdown = this.page.locator(
    '.ant-form-item:has(label:text("Interval")) .ant-select-selector'
  );
  await intervalDropdown.click();
  await this.page.locator(`.ant-select-item-option[title="${interval}"]`).click();
  console.log(`✅ Interval selected: ${interval}`);

  // Select Billing Cycle option
  

  // Fill Description
  await this.descriptionInput.fill(description);
  console.log(`✅ Description filled: ${description}`);

  // Select Product reliably
 // Open product dropdown
// Open product dropdown
// Open product dropdown
// Open product dropdown
await this.page.locator(
  '.ant-form-item.customInput.mobileInputView.product-select > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .select > .ant-select > .ant-select-selector'
).click();
console.log("✅ Product dropdown opened");

// Wait a little for dropdown options to render (AntD dropdown animation)
await this.page.waitForTimeout(500);

// Click the first visible product in the dropdown
await this.page.locator('.ant-select-item-option').filter({ hasText: 'xxxyyy /' }).first().click();
console.log("✅ First product clicked");

// Log selected product
const selectedProduct = await this.page.locator('.ant-select-selection-item').first().textContent();
console.log(`✅ Product selected: ${selectedProduct}`);






  // Click Add button
  await this.addButton.click();
  console.log(`✅ Plan created successfully for product: ${productName}`);
}


  // 🔹 Verify Plan (click first row and log details)
  async verifyPlan(plan) {
  const { price, currency, interval, every, productName } = plan;

  // Click the first visible plan row
  const firstDataRow = this.page.locator('tr.custom-row-class').first();
  await firstDataRow.waitFor({ state: 'visible' });
  await firstDataRow.click();
  console.log("✅ Clicked first plan row");

  // Fetch Plan ID
 // Fetch Plan ID
// Fetch Plan ID correctly
  const planId = await this.page.locator(
    'div.detail-value:has(h2:has-text("Plan ID")) .ant-space-item'
  ).textContent();
  console.log(`🔹 Plan ID: ${planId}`);
// Fetch Product ID (outside the Plan ID div)
const productId = await this.page.locator('div.ant-space.ant-space-horizontal.ant-space-align-center .ant-space-item').last().textContent();
console.log(`🔹 Product ID: ${productId}`);


  // Fetch other details
  const priceText = await this.page.getByText(`Price ${price.toFixed(2)}`).textContent();
  const currencyText = await this.page.getByText(`Currency ${currency}`).textContent();
  const intervalText = await this.page.getByText(`Interval ${interval.toLowerCase()}`).textContent();
  const everyText = await this.page.getByText(`Every ${every}`).textContent();
  const productText = await this.page.getByRole('cell', { name: productName }).textContent();

  console.log("🔹 Verifying Plan Details:");
  console.log(`   Product Name: ${productText}`);
  console.log(`   Price: ${priceText}`);
  console.log(`   Currency: ${currencyText}`);
  console.log(`   Interval: ${intervalText}`);
  console.log(`   Every: ${everyText}`);
}


}

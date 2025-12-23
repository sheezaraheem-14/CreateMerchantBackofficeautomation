import { expect } from '@playwright/test';
import { testData } from '../data/testData.js';

export default class TransactionsRefundPage {
  constructor(page) {
    this.page = page;

    // Tabs / Filters
    this.transactionsTab = page.getByRole('link', { name: 'Transactions' });

    // Buttons & Inputs
    this.refundButton = page.getByRole('button', { name: 'Refund Amount' });
    this.refundAmountInput = page.getByPlaceholder('Enter Refund Amount in (PKR)');
    this.reasonDropdown = page.getByText('Select Reason');
    this.customReasonInput = page.getByRole('textbox', {
      name: 'Enter Custom Refund Reason'
    });
    this.confirmRefundBtn = page
      .getByRole('dialog')
      .getByRole('button', { name: 'Refund Amount' });
    this.backButton = page.getByText('Back');
  }

  // Navigate to dashboard
  async gotoDashboard(baseURL) {
    await this.page.goto(`${baseURL}/dashboard`, { waitUntil: 'networkidle' });
    await this.page.getByRole('link', { name: 'Dashboard' }).waitFor({ state: 'visible', timeout: 60000 });
    console.log('✅ Dashboard loaded');
  }

  async selectStore(storeName) {
    await this.page.locator('.ant-select-selector').first().click();
    await this.page.getByText(storeName, { exact: true }).click();
    await this.page.locator('.ant-select-selection-item').first().waitFor({ state: 'visible' });
    console.log(`✅ Store selected: ${storeName}`);
  }

  // Open Transactions page
  async openTransactions() {
    await this.transactionsTab.click();
    console.log('✅ Transactions page loaded');
  }

  // Open any captured transaction
  async openAnyCapturedTransaction() {
    await this.page.waitForSelector('tbody tr', { timeout: 60000 });
    const capturedRow = this.page.locator('tbody tr', { hasText: 'Captured' }).first();
    await expect(capturedRow).toBeVisible({ timeout: 60000 });
    await capturedRow.click();
    console.log('✅ Captured transaction opened');
  }

  // Fetch Paid Amount dynamically
  async getPaidAmount() {
    const paidAmountSpan = this.page.locator('.detail-value', { hasText: 'Paid Amount' }).locator('span').first();
    await paidAmountSpan.waitFor({ state: 'visible', timeout: 30000 });
    const amountText = await paidAmountSpan.innerText();
    const amount = parseFloat(amountText.replace(/[^0-9.]/g, '')); // remove PKR if present
    if (isNaN(amount)) throw new Error(`❌ Invalid paid amount: "${amountText}"`);
    console.log(`✅ Paid Amount fetched: ${amount}`);
    return amount;
  }

  // Refund action
  async refund(amount) {
    await this.refundButton.click();
    await this.refundAmountInput.fill(amount.toString());

    // Open reason dropdown and select "Other"
    await this.reasonDropdown.click();
    const otherOption = this.page.locator('.ant-select-item-option-content', { hasText: 'Other' });
    await otherOption.waitFor({ state: 'visible', timeout: 15000 });
    await otherOption.click();

    // Enter custom refund reason
    await this.customReasonInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.customReasonInput.fill('xyz');

    // Submit refund
    await this.confirmRefundBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.confirmRefundBtn.click();
    await this.page.waitForTimeout(3000); // wait for backend update
    console.log(`✅ Refund of ${amount} initiated`);
  }




  // 🔹 Verify Full Refund
async verifyRefunded() {
  // Click first transaction in the table
  const firstTransaction = this.page.locator('tbody tr').first();
  await firstTransaction.click();
  console.log('✅ First transaction opened for verification');

  // Verify Payment Status label exists
  const statusTag = this.page.locator(
    '.detail-value',
    { has: this.page.getByText('Payment Status') }
  ).locator('.ant-tag', { hasText: 'Refunded' });

  await statusTag.waitFor({ state: 'visible', timeout: 15000 });
  await expect(statusTag).toBeVisible();
  console.log('✅ Payment status is Refunded');
}

// 🔹 Verify Partial Refund
async verifyPartiallyRefunded() {
  // Click first transaction in the table
  const firstTransaction = this.page.locator('tbody tr').first();
  await firstTransaction.click();
  console.log('✅ First transaction opened for verification');

  // Verify Payment Status label exists
  const statusTag = this.page.locator(
    '.detail-value',
    { has: this.page.getByText('Payment Status') }
  ).locator('.ant-tag', { hasText: 'Partially_Refunded' });

  await statusTag.waitFor({ state: 'visible', timeout: 15000 });
  await expect(statusTag).toBeVisible();
  console.log('✅ Payment status is Partially Refunded');
}

  // Verify Full Refund
  // 🔹 Verify Payment Status (Refunded or Partially Refunded)
async verifyPaymentStatus() {
  const statusTag = this.page
    .locator('.detail-value', { hasText: 'Payment Status' })
    .locator('.ant-tag');

  await expect(statusTag).toBeVisible();

  const status = await statusTag.innerText();
  console.log(`✅ Payment status verified: ${status}`);
}


  // 🔹 Verify refunded amount
/*async verifyRefundedAmount() {
  const refundedAmountLocator = this.page
    .locator('.detail-value', { hasText: 'Refunded Amount' })
    .locator('span')
    .first();

  await expect(refundedAmountLocator).toBeVisible({ timeout: 15000 });

  const refundedText = await refundedAmountLocator.innerText();
  console.log(`✅ Refunded Amount displayed: ${refundedText}`);
}

  */

  async goBack() {
    await this.backButton.click();
    console.log('✅ Navigated back');
  }
}

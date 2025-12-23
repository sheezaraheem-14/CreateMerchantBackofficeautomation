import { expect } from '@playwright/test';
import { testData } from '../data/testData.js';

export default class GatewayPage {

  constructor(page) {
    this.page = page;

    // Random Order ID
    this.ORDER_ID = "JZ" + Math.floor(1000000000 + Math.random() * 9000000000);

    // Common selectors
    this.paymentLinksMenu = page.getByRole('link', { name: 'Payment Links' });
    this.generateLinkBtn = page.getByRole('button', { name: 'Generate Link' });
    this.oneTimeUseOption = page.getByText('One Time Use');
    this.orderIdInput = page.getByRole('textbox', { name: 'Order ID', exact: true });
    this.orderAmountInput = page.getByRole('spinbutton', { name: 'Order Amount' });
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.paymentLinkText = page.getByText('Payment Linkhttps://stage.xta');
    this.reloadBtn = page.locator('.anticon.anticon-sync > svg');
  }

  async gotoDashboard(baseURL) {
    await this.page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
    await this.page.getByRole("link", { name: "Dashboard" }).waitFor({ state: "visible", timeout: 60000 });
    console.log("✅ Dashboard loaded");
  }

  async selectStore(storeName) {
    await this.page.locator(".ant-select-selector").first().click();
    await this.page.getByText(storeName, { exact: true }).click();
    await this.page.locator(".ant-select-selection-item").first().waitFor({ state: "visible" });
    console.log(`✅ Store selected: ${storeName}`);
  }

  async goToPaymentLinks() {
    await this.page.goto(`${testData.baseURL}/paymentlink`);
    await this.paymentLinksMenu.click();
  }

  async generatePaymentLink(gatewayKey) {
    const data = testData[gatewayKey];

    // Generate a dynamic Order ID
    const orderId = 'JZ' + Math.floor(1000000000 + Math.random() * 9000000000);
    this.ORDER_ID = orderId; // store in page object for reuse

    await this.generateLinkBtn.click();
    await this.oneTimeUseOption.click();
    await this.oneTimeUseOption.nth(1).click();
    await this.orderIdInput.fill(orderId);
    await this.orderAmountInput.fill(data.amount.toString());
    await this.submitBtn.click();

    // Click “Payment Link” text to open modal
    await this.page.getByText('Payment Link', { exact: true }).click();

    // Wait for popup
    const popupPromise = this.page.waitForEvent('popup');

    // Click the actual link inside modal
    await this.page.getByRole('dialog').getByRole('link').click();

    // Return popup, data, and orderId
    return { popup: await popupPromise, data, orderId };
}


async verifyOrderInTransactions(orderId) {

  // 🔥 Close Payment Link modal if it's still open
  const modal = this.page.locator('.ant-modal-wrap');
  if (await modal.isVisible()) {
    await this.page.keyboard.press('Escape');
    await modal.waitFor({ state: 'hidden', timeout: 10000 });
    console.log('✅ Payment Link modal closed');
  }

  await this.page.getByRole('link', { name: 'Transactions' }).click();
  await this.reloadBtn.click();

  // Click row
  const orderCell = this.page.getByRole('cell', { name: orderId });
  await orderCell.waitFor({ state: 'visible', timeout: 30000 });
  await orderCell.click();

  // Verify Payment ID
  await this.page
    .getByText(`Payment ID ${orderId}`)
    .first()
    .waitFor({ state: 'visible' });

  // Verify Order ID
  await this.page
    .getByText(`Order ID ${orderId}`)
    .first()
    .waitFor({ state: 'visible' });

  console.log(`✅ Verified Order ID in Transactions → ${orderId}`);
}


  async completeBAFLPayment(popup, data) {
    const frame = popup.locator('iframe[name="payment"]').contentFrame();
    await frame.getByRole('textbox', { name: 'email address' }).fill(data.email);
    await frame.getByRole('textbox', { name: 'Jon Dow' }).fill(data.cardName);
    await frame.getByRole('textbox', { name: '0000 0000 0000' }).fill(data.cardNumber);
    await frame.getByRole('textbox', { name: 'MM/YY' }).fill(data.expiry);
    await frame.getByRole('textbox', { name: 'CVC' }).fill(data.cvc);
    await popup.getByRole('button', { name: 'Pay PKR' }).click();
   // --- Pay Now ---
// --- Click Pay Button ---
  
console.log('✅ Pay PKR button clicked');


  // --- Wait for 3DS iframe ---
  const frame3DSHandle = await popup.waitForSelector('iframe[name="3ds form"]', { timeout: 30000 });
  const frame3DS = await frame3DSHandle.contentFrame();
  console.log('🔒 3DS iframe is now visible');

  // --- Click inside 3DS iframe ---
  await frame3DS.locator('html').click();
  await frame3DS.getByRole('heading', { name: 'ACS Emulator for 3DS V2' }).click();
  await frame3DS.getByText('Authentication Result:').click();
  await frame3DS.getByRole('button', { name: 'Submit' }).click();
  console.log('✅ 3DS Submit button clicked');

  // --- Wait for success message ---
  await popup.getByText(
    'Thank you! Your payment was successfulThe payment was completed successfully (',
    { exact: false }
  ).click();
  console.log('🎉 Payment completed successfully');
}

  async completeJazzCashPayment(popup, data) {
    const frame = popup.locator('iframe[name="payment"]').contentFrame();
    await frame.getByRole('img', { name: 'jazzcash' }).click({ force: true });
    
    await frame.getByRole('textbox', { name: '-1234567' }).fill(data.phone);
    await frame.getByRole('textbox', { name: 'Last 6 digits of CNIC number' }).fill(data.cnicLast6);
    await popup.getByRole('button', { name: 'Pay PKR' }).click({ force: true });

    await popup.getByText('Thank you for Using JazzCash').click();
  }

  async verifyOrderComplete() {
    await this.page.goto(`${testData.baseURL}/paymentlink`);
    await this.reloadBtn.click();
    await this.page.getByRole('cell', { name: this.ORDER_ID }).click();
    await this.page.getByText(`Order ID ${this.ORDER_ID}`).click();
    await this.page.getByText('Status Complete').click();


    // Click the "Back" button
  await this.page.getByText('Back', { exact: true }).click();
  console.log('⏮️ Back button clicked');
  }

    
async generateMultipleUsePaymentLink(multiData) {
    // Generate a dynamic Order ID
    const orderId = 'JZ' + Math.floor(1000000000 + Math.random() * 9000000000);
    this.ORDER_ID = orderId; // store for reuse in verification

    await this.generateLinkBtn.click();

    // --- Select "One Time Use" first (if needed) ---
    await this.page.locator('//span[@title="One Time Use"]').click();
    console.log('✅ One Time Use clicked');

    // --- Select "Multiple Use" option ---
    const multipleUseOption = this.page.locator('//div[contains(text(),"Multiple Use")]');
    await multipleUseOption.waitFor({ state: 'visible', timeout: 30000 });
    await multipleUseOption.click();
    console.log('✅ Multiple Use option selected');

    // --- ENTER NUMBER OF USAGE (usage limit) ---
    await this.page.locator('input[name="linkUsageLimit"]').fill(multiData.usageLimit.toString());
    console.log("✅ Usage limit added");

    // --- SET EXPIRY DATE → TOMORROW ---
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dd = String(tomorrow.getDate());

    await this.page.locator('.ant-picker.datePicker input').click({ force: true });
    console.log("📅 Date Picker opened");

    await this.page.locator(`td.ant-picker-cell:not(.ant-picker-cell-disabled) >> text="${dd}"`)
      .first()
      .click({ force: true });
      await this.page.waitForTimeout(200);
    console.log("📅 Tomorrow date selected");

    await this.page.locator('button.ant-btn-primary.ant-btn-sm:not([disabled])')
      .click({ force: true });
    console.log("✅ Date confirmed");

    // --- ENTER AMOUNT ---
    await this.page.locator('#amount').fill(multiData.amount.toString());
    console.log("💰 Amount filled");

    // --- SUBMIT ---
    await this.page.locator('button:has-text("Submit")').click({ force: true });
    console.log("🚀 Submitted");

    // --- Open modal → click Payment Link ---
    await this.page.getByText('Payment Link', { exact: true }).click();

    const popupPromise = this.page.waitForEvent('popup');

    // Click the actual link inside modal
    await this.page.getByRole('dialog').getByRole('link').click();

    // Return popup for payment
    return { popup: await popupPromise, orderId }; 
}


async verifyLatestTransaction(amount) {

  await this.page.getByRole('link', { name: 'Transactions' }).click();
  await this.reloadBtn.click();

  // Click first row (latest transaction)
  const firstRow = this.page.locator('tbody tr').first();
  await firstRow.waitFor({ state: 'visible', timeout: 30000 });
  await firstRow.click();

  // Verify status
  await this.page.getByText('Status Complete').waitFor({ state: 'visible' });

  // Verify amount
  await this.page.getByText(amount.toString()).waitFor({ state: 'visible' });

  console.log('✅ Verified latest multiple-use transaction');
}



/*async expirePaymentLink() {
    // Go to Payment Links page
    await this.page.getByRole('link', { name: 'Payment Links' }).click();

    // Click the first payment link in the table
    const firstLink = this.page.locator('table tr:first-child a').first();
    await firstLink.waitFor({ state: 'visible', timeout: 30000 });
    await firstLink.click();

    // Click "Expire Link" button and confirm
    await this.page.getByRole('button', { name: 'Expire Link' }).click();
    await this.page.getByRole('button', { name: 'Yes' }).click();

    console.log('🔗 First payment link clicked and expired');
}


  async verifyExpiredLink() {
    // Wait for expired message on the page
    const heading = this.page.getByRole('heading', { name: 'Payment Link Expired' });
    const message = this.page.getByText('The Payment Link is Expired.');

    await expect(heading).toBeVisible({ timeout: 30000 });
    await expect(message).toBeVisible({ timeout: 30000 });

    console.log('✅ Payment Link Expired verified on same page');
}*/





}

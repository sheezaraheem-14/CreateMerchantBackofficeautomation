import { merchantData } from '../data/merchant.data';


export class MerchantOnboardingPage {
  constructor(page) {
    this.page = page;
  }

  async openMerchantForm() {
    await this.page.getByRole('button', { name: /Merchant Management/i }).click();
    await this.page.getByRole('button', { name: /Create Merchant/i }).click();
  }

 async uploadLogo() {
  // Directly set file to hidden input
  await this.page.locator('input[type="file"]').first().setInputFiles(merchantData.files.logo);

  // Then click the Upload button
  //await this.page.getByRole('button', { name: 'Upload' }).click({state: 'visible', timeout: 200000});
 // ✅ WAIT until upload completes (pick ONE that matches your UI)
// Wait for the success toast to appear (scoped to the status container)
  const toast = this.page.locator('li[role="status"] div.text-sm.opacity-90', {
    hasText: 'Logo uploaded successfully.'
  });

  await toast.waitFor({ state: 'visible', timeout: 20000 });

  console.log('✅ Logo uploaded successfully');
}

  


  async fillBusinessInfo(businessName) {
  const { business } = merchantData;

  // Fill Business Name (auto-generated)
  // Remove dashes from auto-generated business name
  const cleanBusinessName = businessName.replace(/_/g, '');

  // Fill Business Name
  await this.page
    .getByRole('textbox', { name: 'Enter Business Name' })
    .fill(cleanBusinessName);

  // Business Type
  const businessType = this.page.getByRole('combobox').nth(0);
  await businessType.waitFor({ state: 'visible', timeout: 5000 });
  await businessType.click();
  await this.page.getByText(business.type).click();




  
  // Industry
  const industry = this.page.getByRole('combobox').nth(1);
  await industry.waitFor({ state: 'visible', timeout: 5000 });
  await industry.click();
  await this.page.getByText(business.industry).click();


  // Business Registration Date - select today's date
// Wait for the date picker container instead of just input
// Wait for the date picker input and click it
// Business Registration Date – select TODAY
const today = new Date();
const day = today.getDate();               // 1–31
const month = today.toLocaleString('default', { month: 'long' });
const year = today.getFullYear();

// Open calendar
await this.page.getByRole('button', { name: 'Select Date calendar' }).click();

// Select day
await this.page.getByRole('gridcell', { name: String(day) }).click();

// Confirm date (example: "September 18th, 2025 calendar")
const suffix =
  day % 10 === 1 && day !== 11 ? 'st' :
  day % 10 === 2 && day !== 12 ? 'nd' :
  day % 10 === 3 && day !== 13 ? 'rd' : 'th';

await this.page.getByRole('button', {
  name: `${month} ${day}${suffix}, ${year} calendar`,
}).click();



  // Province/State
  const province = this.page.getByRole('combobox').nth(3);
  await province.waitFor({ state: 'visible', timeout: 5000 });
  await province.click();
  await this.page.getByText(business.province).click();

  // City
  const city = this.page.getByRole('combobox').nth(4);
  await city.waitFor({ state: 'visible', timeout: 5000 });
  await city.click();
  await this.page.getByText(business.city).click();

  // Platform
  const platform = this.page.getByRole('combobox').nth(5);
  await platform.waitFor({ state: 'visible', timeout: 5000 });
  await platform.click();
  await this.page.getByText(business.platform).click();

  // Other fields
  await this.page.getByRole('textbox', { name: 'Enter Email Address' }).fill(business.email);
  await this.page.getByRole('textbox', { name: 'Enter Contact Number' }).fill(business.contact);
  await this.page.getByRole('textbox', { name: 'Enter FBR/NTN Number' }).fill(business.ntn);
  await this.page.getByRole('textbox', { name: 'Enter Website' }).fill(business.website);
  await this.page.getByRole('textbox', { name: 'Enter Address' }).fill(business.address);

  // Next button
await this.page.getByRole('button', { name: 'Next' }).first().click();
}


 /*async submitForm() {
  // Wait for the Next button and click it
  const nextBtn = this.page.getByRole('button', { name: 'Next' });
  await nextBtn.waitFor({ state: 'visible', timeout: 50000 });
  await nextBtn.click();

  // If there's a Submit button after Next, you can click it here
  // const submitBtn = this.page.getByRole('button', { name: 'Submit' });
  // await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
  // await submitBtn.click();
}*/


async fillOwnerInfo() {
  const { owner } = merchantData;

  // Owner / CEO Information
  await this.page
    .getByRole('textbox', { name: 'Enter Full Name' })
    .fill(owner.fullName);

  await this.page
    .getByRole('textbox', { name: 'Enter Email Address' })
    .fill(owner.email);

  await this.page
    .getByRole('textbox', { name: 'Enter CNIC' })
    .fill(owner.cnic);

  await this.page
    .getByRole('textbox', { name: 'Enter Contact Number' })
    .fill(owner.contact);

  await this.page
    .getByRole('textbox', { name: 'Enter Designation' })
    .fill(owner.designation);

  // Next → Authorized Person section
  await this.page.getByRole('button', { name: 'Next' }).click({ state: 'visible', timeout: 50000 });

  // Authorized Person = Same as Owner/CEO
  await this.page
    .getByRole('checkbox', { name: 'Same as Owner/CEO Information' })
    .check();

  // Next
  await this.page.getByRole('button', { name: 'Next' }).click({ state: 'visible', timeout: 50000 });
}


async fillSettlementInfo() {
  const { bank } = merchantData;

  // Select Bank from dropdown
  await this.page.getByRole('combobox').filter({ hasText: 'Select Bank' }).click();
  await this.page.getByText(bank.name).click();

  // Fill Account Number
  const accountNumberInput = this.page.getByRole('textbox', { name: 'Enter Account Number' });
  await accountNumberInput.click();
  await accountNumberInput.fill(bank.accountNumber);

  // Fill IBAN
  const ibanInput = this.page.getByRole('textbox', { name: 'Enter IBAN' });
  await ibanInput.click();
  await ibanInput.fill(bank.iban);

  // Fill Account Title
  const titleInput = this.page.getByRole('textbox', { name: 'Enter Account Title' });
  await titleInput.click();
  await titleInput.fill(bank.title);

  // Select Invoice Frequency
  await this.page.getByRole('combobox').filter({ hasText: 'Select Frequency' }).click();
  await this.page.getByRole('option', { name: bank.frequency }).click();

  // Next button
  await this.page.getByRole('button', { name: 'Next' }).click();
}

async fillFeatures() {
  await this.page.getByRole('checkbox', { name: 'XShield' }).click();
  await this.page.getByRole('checkbox', { name: 'Payment Links' }).click();
  await this.page.getByRole('checkbox', { name: 'Refund' }).click();
  await this.page.getByRole('checkbox', { name: 'Capture/Void' }).click();
  await this.page.getByRole('checkbox', { name: 'Payment Routing' }).click();
  await this.page.getByRole('checkbox', { name: 'Subscriptions' }).click();
  await this.page.getByRole('button', { name: 'Next' }).click();
}

async fillPaymentMethods() {
  await this.page.getByRole('combobox').first().click();
  await this.page.getByText('Partner').click();
  await this.page.getByRole('button', { name: 'Next' }).click();
}



async fillDocuments() {
  const file = merchantData.files.logo;

  // Each document card (1 input + 1 upload button)
  const docCards = this.page.locator(
    'div.flex.items-center.justify-between.w-full:has(input[type="file"])'
  );

  const count = await docCards.count();
  console.log(`📂 Total document cards found: ${count}`);

  for (let i = 0; i < count; i++) {
    console.log(`📄 Uploading document ${i + 1}`);

    const card = docCards.nth(i);

    // 1️⃣ Upload file (EXACTLY one input)
    const fileInput = card.locator('input[type="file"]').first();
    await fileInput.setInputFiles(file);

    // 2️⃣ Wait for Upload button to be visible and clickable
    /*const uploadBtn = card.getByRole('button', { name: 'Upload' });
    try {
      await uploadBtn.waitFor({ state: 'visible', timeout: 20000 });
      await uploadBtn.click();
    } catch {
      console.warn(`⚠️ Upload button for document ${i + 1} not visible, skipping`);
      continue;
    }*/

    // 3️⃣ Wait for success toast (long timeout for slow uploads)
    const toast = this.page
      .locator('li[role="status"] div.text-sm.opacity-90')
      .filter({ hasText: 'uploaded successfully' })
      .first();

    try {
      await toast.waitFor({ state: 'visible', timeout: 60000 });
      const msg = await toast.textContent();
      console.log(`✅ Uploaded: ${msg?.trim()}`);
    } catch {
      console.warn(`⚠️ Upload toast for document ${i + 1} not detected`);
    }

    // 4️⃣ Wait after each upload to let UI stabilize
    await this.page.waitForTimeout(2000);
  }

  // 5️⃣ Wait a bit before clicking Submit
  await this.page.waitForTimeout(20000);

  // 6️⃣ Locate the Submit button
  // 7️⃣ Click Submit and wait for navigation if any
const submitBtn = this.page.getByRole('button', { name: 'Submit' });
await submitBtn.waitFor({ state: 'visible', timeout: 20000 });

// Click Submit and wait for navigation (if triggered)
await Promise.all([
  submitBtn.click(),
  this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 2000 }).catch(() => {}),
]);

// 🕒 Extra buffer wait after submit to allow backend processing
await this.page.waitForTimeout(15000); // 15 seconds, adjust if needed

// Wait for either toast or text message to appear (max 10 minutes)
// Wait for either toast or text message (max 10 minutes)
const maxTimeout = 10 * 60 * 1000; // 10 minutes

try {
  const finalToast = this.page
    .locator('li[role="status"] div.text-sm.opacity-90')
    .filter({ hasText: 'created successfully' })
    .first(); // pick first element if multiple

  await finalToast.waitFor({ state: 'visible', timeout: maxTimeout });
  console.log('🎉 Merchant created successfully (toast detected)');
} catch {
  try {
    // Pick first match to avoid strict mode violation
    await this.page.waitForSelector('text=The merchant has been created', { timeout: maxTimeout });
    console.log('🎉 Merchant created successfully (text detected)');
  } catch {
    console.error('❌ Merchant creation message not found within timeout');
  }
}



}

async verifyMerchantInLogs(businessName) {
  console.log('🔍 Navigating to Merchant Logs page');

  // Normalize name (UI shows without underscore)
  const searchName = businessName.replace(/_/g, '');

  // 1️⃣ Navigate to Merchant Logs
  await this.page.goto('https://xpay-backoffice-dev.xstak.com/logs', {
    waitUntil: 'networkidle',
  });

  // 2️⃣ Open filter panel
  const filterBtn = this.page.getByRole('button', { name: /filter/i });
  await filterBtn.waitFor({ state: 'visible', timeout: 30000 });
  await filterBtn.click();
  console.log('🧰 Filter panel opened');

  // 3️⃣ Fill search input
  const searchInput = this.page.getByRole('textbox', {
    name: /Account ID, Business Name/i,
  });
  await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  await searchInput.fill(searchName);
  console.log(`🔎 Searching merchant: ${searchName}`);

  // 4️⃣ Apply filters
  const applyBtn = this.page.getByRole('button', { name: /Apply Filters/i });
  await applyBtn.waitFor({ state: 'visible', timeout: 10000 });
  await applyBtn.click();
  console.log('✅ Apply Filters clicked');

  // 5️⃣ Wait for REAL table rows (ignore measure row)
  const rows = this.page.locator('tbody tr.ant-table-row');
  await rows.first().waitFor({ state: 'visible', timeout: 10000 });

  const rowCount = await rows.count();
  console.log(`📊 Rows found after filter: ${rowCount}`);

  if (rowCount === 0) {
    throw new Error('❌ No merchant rows found after applying filters');
  }

  // 6️⃣ Find row containing merchant
  const merchantRow = rows.filter({ hasText: searchName }).first();
  await merchantRow.waitFor({ state: 'visible', timeout: 20000 });
  console.log('📌 Matching merchant row found');

  // 7️⃣ Click View Details from SAME row
  const viewDetailsBtn = merchantRow.locator('button', {
    hasText: 'View Details',
  });
  await viewDetailsBtn.waitFor({ state: 'visible', timeout: 20000 });
  await viewDetailsBtn.click();
  console.log('👁️ View Details clicked');

  // 8️⃣ Verify merchant name in details view
  const merchantNameLocator = this.page.locator(
    'div.font-semibold.text-xl.mb-2'
  );
  await merchantNameLocator.waitFor({ state: 'visible', timeout: 40000 });

  const displayedName = (await merchantNameLocator.textContent())?.trim();

  if (displayedName?.includes(searchName)) {
    console.log(`✅ Merchant detail verified: ${displayedName}`);
  } else {
    throw new Error(
      `❌ Merchant detail mismatch. Expected: ${searchName}, Found: ${displayedName}`
    );
  }
}


}
import { test, expect } from '../fixtures/merchant.fixtures';
import { MerchantOnboardingPage } from '../pages/createmerchant.page';
import { generateBusinessName } from '../helpers/nameGeneratorutils';
// At the top of your test file

test.describe.configure({ timeout: 15 * 60 * 1000 }); // 15 minutes max for the whole test

test.describe.serial('Backoffice | Merchant Onboarding', () => {
  let businessName;

  test('✅ Positive: Merchant is created successfully', async ({ backofficePage }) => {
    businessName = generateBusinessName();

    const merchantPage = new MerchantOnboardingPage(backofficePage);

    await merchantPage.openMerchantForm();
    await merchantPage.uploadLogo();
    await merchantPage.fillBusinessInfo(businessName);
    // 🔹 Owner / CEO Information
   

     await merchantPage.fillOwnerInfo();

     await merchantPage.fillSettlementInfo();
await merchantPage.fillFeatures();

await merchantPage.fillPaymentMethods();

// Fill Documents tab
await merchantPage.fillDocuments();

 // 9️⃣ Verify Merchant Created Toast
const toast = backofficePage
  .locator('li[role="status"] div.text-sm.opacity-90')
  .filter({ hasText: 'The merchant has been created successfully' })
  .first();

// Wait for toast to appear and assert visibility
await toast.waitFor({ state: 'visible', timeout: 30000 });
await expect(toast).toBeVisible();

console.log('🎉 Merchant created successfully (verified in spec)');


await merchantPage.verifyMerchantInLogs(businessName);

  });



});

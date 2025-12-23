import { test, expect } from "../fixtures/fixtures.js";


test.describe("Payment Links Automation", () => {



test("BAFL Payment Flow & Verify in Transactions", async ({ paymentsPage, testData, baseURL }) => {
    await paymentsPage.gotoDashboard(baseURL);
    await paymentsPage.selectStore(testData.storeName);
    await paymentsPage.goToPaymentLinks();

    // Generate BAFL payment link
    const { popup, data, orderId } = await paymentsPage.generatePaymentLink("bafl");

    // Complete BAFL payment
    await paymentsPage.completeBAFLPayment(popup, data);

    // Verify order on Payment Links page
    await paymentsPage.verifyOrderComplete(orderId);

    // ✅ Verify Order ID in Transactions
    await paymentsPage.verifyOrderInTransactions(orderId);

  // ---------- Expire ----------
   // await paymentsPage.expirePaymentLink();

    // Verify link expired
   // await paymentsPage.verifyExpiredLink();
});


  test("JazzCash Payment Flow & Expired Link", async ({ paymentsPage, testData, baseURL }) => {

    // Navigate to dashboard and select store
    await paymentsPage.gotoDashboard(baseURL);
    await paymentsPage.selectStore(testData.storeName);


    await paymentsPage.goToPaymentLinks();
    // Generate JazzCash Payment Link and complete payment
   const { popup, data, orderId } = await paymentsPage.generatePaymentLink("jazzcash");
await paymentsPage.completeJazzCashPayment(popup, data);
await paymentsPage.verifyOrderComplete(orderId);
await paymentsPage.verifyOrderInTransactions(orderId);

    // Verify link expired on reuse
   // await paymentsPage.verifyExpiredLink(data.link);
  });


test("BAFL Multiple Use Payment Link Flow", async ({ paymentsPage, testData, baseURL }) => {
  await paymentsPage.gotoDashboard(baseURL);
  await paymentsPage.selectStore(testData.storeName);
  await paymentsPage.goToPaymentLinks();

  // ✅ DEFINE IT HERE
  const multiDataBAFL = testData.paymentLinkMultipleUse;

  const { popup } =
    await paymentsPage.generateMultipleUsePaymentLink(multiDataBAFL);

  await paymentsPage.completeBAFLPayment(popup, testData.bafl);

});



test("JazzCash Multiple Use Payment Link Flow", async ({ paymentsPage, testData, baseURL }) => {
  await paymentsPage.gotoDashboard(baseURL);
  await paymentsPage.selectStore(testData.storeName);
  await paymentsPage.goToPaymentLinks();

  const multiData = testData.paymentLinkMultipleUse;

  const { popup, orderId } =
    await paymentsPage.generateMultipleUsePaymentLink(multiData);

  await paymentsPage.completeJazzCashPayment(popup, testData.jazzcash);
  console.log("✅ JazzCash payment completed");

  // ✅ ONLY Transactions verification
  await paymentsPage.completeJazzCashPayment(popup, testData.jazzcash);


});



});
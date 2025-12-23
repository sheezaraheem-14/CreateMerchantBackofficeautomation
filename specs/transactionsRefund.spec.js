import { test, expect } from '../fixtures/fixtures.js';

test.describe('Transactions - Refund Flows', () => {

  test('Full refund of captured transaction', async ({ paymentsPage, transactionsPage, testData, baseURL }) => {
    // STEP 1 — Dashboard
    await paymentsPage.gotoDashboard(baseURL);
    await paymentsPage.selectStore(testData.storeName);

    // STEP 2 — Transactions
    await transactionsPage.openTransactions();
    await transactionsPage.openAnyCapturedTransaction();

    // STEP 3 — Get Paid Amount dynamically
    const paidAmount = await transactionsPage.getPaidAmount();

    // STEP 4 — Full Refund
    await transactionsPage.refund(paidAmount);

    // STEP 5 — Verify
    await transactionsPage.verifyRefunded();
//await transactionsPage.verifyRefundedAmount();

  await transactionsPage.verifyPaymentStatus();
    
  });

  test('Partial refund of captured transaction', async ({ paymentsPage, transactionsPage, testData, baseURL }) => {
    // STEP 1 — Dashboard
    await paymentsPage.gotoDashboard(baseURL);
    await paymentsPage.selectStore(testData.storeName);

    // STEP 2 — Transactions
    await transactionsPage.openTransactions();
    await transactionsPage.openAnyCapturedTransaction();

    // STEP 3 — Get Paid Amount dynamically
    const paidAmount = await transactionsPage.getPaidAmount();

    // STEP 4 — Partial Refund (50%)
    const halfAmount = parseFloat((paidAmount / 2).toFixed(2));
    await transactionsPage.refund(halfAmount);

    // STEP 5 — Verify
    await transactionsPage.verifyPartiallyRefunded();
//await transactionsPage.verifyRefundedAmount();
    await transactionsPage.verifyPaymentStatus();

  });

});

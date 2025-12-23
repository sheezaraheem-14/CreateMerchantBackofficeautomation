import { test, expect } from "../fixtures/fixtures.js";

test.describe("Subscriptions → Customers", () => {
  test("✅ Create and verify customer successfully", async ({ baseURL, customersPage, testData }) => {
    // Go to dashboard
      // Go to dashboard
    await customersPage.page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
    console.log("✅ Dashboard loaded");

    // Select store
    await customersPage.page.locator(".ant-select-selector").first().click();
    await customersPage.page.getByText(testData.storeName, { exact: true }).click();
    console.log(`✅ Store selected: ${testData.storeName}`);
    // Go to Customers tab
    await customersPage.gotoCustomersTab();

    // Create Customer
    await customersPage.createCustomer(testData.validCustomer);

    // Verify Customer
    await customersPage.verifyCustomer(testData.validCustomer);
  });
});

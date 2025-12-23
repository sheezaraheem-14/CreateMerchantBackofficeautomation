import { test, expect } from "../fixtures/fixtures.js";

test.describe("Products | Create Product", () => {
  test("✅ Create and verify product successfully", async ({
    productPage,
    baseURL,
    testData,
  }) => {

    // 🔹 Step 1: Go to Dashboard
    await productPage.gotoDashboard(baseURL);

    // 🔹 Step 2: Select Store
    await productPage.selectStore(testData.storeName);

    await productPage.openProducts();        // 👈 navigation here
    // 🔹 Step 3: Create Product
    await productPage.createProduct(testData.validProduct);

    // 🔹 Step 4: Verify Product
    await productPage.verifyProduct(testData.validProduct);

    // 🔹 Step 5: Back
    await productPage.goBack();
  });
});

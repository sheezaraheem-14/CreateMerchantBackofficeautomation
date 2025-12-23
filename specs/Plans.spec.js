// specs/Plans.spec.js
import { test, expect } from "../fixtures/fixtures.js";

test.describe("Subscriptions → Plans | Create Plan", () => {
  test("✅ Create and verify plan successfully", async ({ plansPage, testData, baseURL }) => {

    // Go to dashboard
    await plansPage.page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
    console.log("✅ Dashboard loaded");

    // Select store
    await plansPage.page.locator(".ant-select-selector").first().click();
    await plansPage.page.getByText(testData.storeName, { exact: true }).click();
    console.log(`✅ Store selected: ${testData.storeName}`);

    // Open Plans tab
    await plansPage.openPlans();

    // Create plan
    await plansPage.createPlan(testData.validPlan);

    // Verify plan
    await plansPage.verifyPlan(testData.validPlan);
  });
});

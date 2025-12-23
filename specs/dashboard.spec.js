import { test } from "../fixtures/fixtures.js";
import DashboardPage from "../pages/dashboard.page.js";

test.describe("Dashboard - Filter & Verify", () => {
  let dashboardPage;

  test.beforeEach(async ({ page, testData, baseURL }) => {

    dashboardPage = new DashboardPage(page);
    await dashboardPage.gotoDashboard(baseURL);
    await dashboardPage.selectStore(testData.storeName);
    await dashboardPage.resetFilters(); // reset before every test
  });


  test("Test Case 1 - Last 7 Days", async () => {
    await dashboardPage.applyLast7DaysFilter();
    await dashboardPage.verifyDashboardSections();
  });

  test("Test Case 2 - Last 30 Days", async () => {
    await dashboardPage.applyLast30DaysFilter();
    await dashboardPage.verifyDashboardSections();
  });

 

  test("Test Case 3 - Gateway Filter (Bank Alfalah)", async () => {
    await dashboardPage.bankAlfalahFilter();
    await dashboardPage.verifyDashboardSections();
  });

  test("Test Case 4 - JazzCash Filter", async () => {
    await dashboardPage.applyJazzCashFilter();
    await dashboardPage.verifyDashboardSections();
  });

  test("Test Case 5 - EasyPaisa Filter", async () => {
    await dashboardPage.applyEasyPaisaFilter();
    await dashboardPage.verifyDashboardSections();
  });
 
 
});
import { test, expect } from "../fixtures/fixtures.js";
import { testData } from "../data/testData.js";
import DashboardPage from "../pages/dashboard.page.js";

test.describe('Login Flow', () => {

  test('happy path - login with valid credentials', async ({ loginPage, page, baseURL }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto(baseURL);
    await loginPage.login(testData.user);

    // Wait for dashboard fully loaded
    await dashboardPage.waitForDashboard();
    await expect(page.locator('text=All Stores')).toBeVisible();
    
  // Save login (cookies + session)
  await page.context().storageState({ path: 'auth.json' });
  });

  test('error path - login with invalid credentials', async ({ loginPage, page, baseURL }) => {
    await loginPage.goto(baseURL);
    await loginPage.login(testData.invalidUser);

   // ✅ Wait for error message instead of using boolean
  
  const errorText = await loginPage.waitForErrorMessage();
  console.log('Error shown:', errorText); // optional
  expect(errorText.length).toBeGreaterThan(0); // simple check that error exists
});
  });


// fixtures/fixtures.js
import { test as base, expect } from "@playwright/test";
import { testData } from "../data/testData.js";

import * as Utils from "../helpers/utils.js";

export const test = base.extend({
  baseURL: [testData.baseURL, { option: true }],
  testData: [testData, { option: true }],

  loginPage: async ({ page }, use) => {
    const { default: LoginPage } = await import("../pages/login.page.js");
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    const { default: DashboardPage } = await import("../pages/dashboard.page.js");
    await use(new DashboardPage(page));
  },

  paymentsPage: async ({ page }, use) => {
    const { default: GatewayPage } = await import("../pages/paymentLinks.page.js"); 
    await use(new GatewayPage(page));
  },

  subscriptionsPage: async ({ page }, use) => {
    const { default: SubscriptionsPage } = await import("../pages/subscriptions.page.js");
    await use(new SubscriptionsPage(page));
  },

  transactionsPage: async ({ page }, use) => {
    const { default: TransactionsPage } = await import("../pages/transactionsRefund.page.js");
    await use(new TransactionsPage(page));
  },


  addgatewayPage: async ({ page }, use) => {
    // ✅ Updated import to match your file name
    const { default: GatewayPage } = await import("../pages/addgateway.page.js");
    await use(new GatewayPage(page));
  },


  productPage: async ({ page }, use) => {
  const { default: ProductPage } = await import("../pages/products.page.js");
  await use(new ProductPage(page));
},


plansPage: async ({ page }, use) => {
    const { default: PlansPage } = await import("../pages/Plans.page.js");
    await use(new PlansPage(page));
  },


  customersPage: async ({ page }, use) => {
  const { default: CustomersPage } = await import("../pages/Customers.page.js");
  await use(new CustomersPage(page));
},



  utils: async ({}, use) => {
    await use(Utils);
  },



  
});

export { expect };

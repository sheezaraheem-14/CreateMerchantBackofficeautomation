export default class GatewayPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.settingsMenu = page.getByRole("menuitem", { name: "setting Settings" });
    this.gatewaysLink = page.getByRole("link", { name: "Gateways" });
    this.addGatewayBtn = page.getByRole("button", { name: "Add Gateway" });

    // Form fields
    this.gatewayName = page.getByRole("textbox", { name: "Gateway Name" });
    this.merchantId = page.getByRole("textbox", { name: "Merchant ID" });
    this.username = page.getByRole("textbox", { name: "Username" });
    this.apiPassword = page.getByRole("textbox", { name: "API Password" });
    this.webhookSecret = page.getByRole("textbox", { name: "Webhook Secret" });

    // Toggles
    this.enableToggle = page.getByRole("switch", { name: "Enable" });
    this.defaultToggle = page.getByRole("switch", { name: "Default" });

    // Submit
    this.submitBtn = page.getByRole("button", { name: "Submit" });
  }

  async gotoDashboard(baseURL) {
    await this.page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
    await this.page.getByRole("link", { name: "Dashboard" }).waitFor({ state: "visible", timeout: 60000 });
    console.log("✅ Dashboard loaded");
  }

  async selectStore(storeName) {
    await this.page.locator(".ant-select-selector").first().click();
    await this.page.getByText(storeName, { exact: true }).click();
    await this.page.locator(".ant-select-selection-item").first().waitFor({ state: "visible" });
    console.log(`✅ Store selected: ${storeName}`);
  }

  async gotoGateways() {
    await this.settingsMenu.click();
    await this.gatewaysLink.click();
    await this.page.getByText("Enabled").first().waitFor({ state: "visible", timeout: 30000 });
    console.log("✅ Gateways page loaded");
  }

  // -----------------------
  // Add a new gateway and return instanceId
  // -----------------------
  async addGateway(gatewayData) {
    await this.addGatewayBtn.click();

    // Select Gateway Type
    await this.page.getByText("Gateway ConfigurationPayment").click();
    await this.page.getByText("Card Payment").click();

    // Fill form
    await this.gatewayName.fill(gatewayData.name);
    await this.merchantId.fill(gatewayData.merchantId);
    await this.username.fill(gatewayData.username);
    await this.apiPassword.fill(gatewayData.apiPassword);
    await this.webhookSecret.fill(gatewayData.webhookSecret);

    const defaultToggle = this.page.locator('#isDefault');
    if (gatewayData.default && (await defaultToggle.getAttribute('aria-checked')) === 'false') {
      await defaultToggle.click();
    }

    // Submit and capture instanceId from API response triggered by submit
    
      this.submitBtn.click()
    
    // Wait for success toast
    await this.page.getByText("Gateway has been added successfully", { exact: false }).waitFor({ timeout: 60000 });
    console.log("✅ Gateway created successfully");

  }

  async getLatestRow(name) {
    const rows = this.page.locator("tr", { hasText: name });
    const count = await rows.count();
    if (count === 0) throw new Error(`❌ No gateway found with name "${name}"`);
    return rows.nth(count - 1);
  }

  async clickEditOnLatestRow(name) {
    const latestRow = await this.getLatestRow(name);
    await latestRow.locator('.table-action-btn.w-\\[56px\\]').click();
    console.log(`🛠 Editing most recent row of "${name}"`);
  }

  async disableGateway(name) {
    await this.clickEditOnLatestRow(name);

    const enableToggle = this.page.getByRole("switch", { name: "Enable" });
    if ((await enableToggle.getAttribute("aria-checked")) === "true") {
      await enableToggle.click();
    }

    await this.page.getByRole("button", { name: "Update" }).click();

    // Wait for toast safely
    await this.page.locator(".ant-notification-notice-message")
      .filter({ hasText: /updated|configuration/i })
      .first()
      .waitFor({ timeout: 60000 });

    console.log(`🚫 Gateway "${name}" disabled`);
  }

  async enableGateway(name) {
    await this.clickEditOnLatestRow(name);

    const enableToggle = this.page.getByRole("switch", { name: "Enable" });
    if ((await enableToggle.getAttribute("aria-checked")) === "false") {
      await enableToggle.click();
    }

    await this.page.getByRole("button", { name: "Update" }).click();

    // Wait for toast safely
    await this.page.locator(".ant-notification-notice-message")
      .filter({ hasText: /updated|configuration/i })
      .first()
      .waitFor({ timeout: 60000 });

    console.log(`🟢 Gateway "${name}" enabled`);
  }

  async verifyGatewayEnabled(name) {
    const latestRow = await this.getLatestRow(name);
    await latestRow.getByText("Enabled").waitFor({ timeout: 60000 });
    console.log(`✅ Most recent gateway "${name}" is Enabled in table`);
  }

  async verifyGatewayDisabled(name) {
    const latestRow = await this.getLatestRow(name);
    await latestRow.getByText("Disabled").waitFor({ timeout: 40000 });
    console.log(`✅ Most recent gateway "${name}" is Disabled in table`);
  }

}
export default class CustomersPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.storeDropdown = page.getByRole("combobox", { name: "Store" });
    this.subscriptionsTab = page.getByRole("menuitem", { name: "Subscriptions" });
    this.customersTab = page.getByRole("link", { name: "Customers" });
    this.createCustomerBtn = page.getByRole("button", { name: "Create Customer" });
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.emailInput = page.getByRole("textbox", { name: "Email", exact: true });
    this.phoneInput = page.getByRole("textbox", { name: "Phone", exact: true });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.backBtn = page.getByText("Back");
  }

  async selectStore(storeName) {
    await this.storeDropdown.waitFor({ state: "visible", timeout: 10000 });
    await this.storeDropdown.click();
    await this.page.getByText(storeName, { exact: true }).click();
    console.log(`✅ Store selected: ${storeName}`);
  }

  async gotoCustomersTab() {
    await this.subscriptionsTab.waitFor({ state: "visible", timeout: 5000 });
    await this.subscriptionsTab.click();
    await this.customersTab.waitFor({ state: "visible", timeout: 5000 });
    await this.customersTab.click();
    console.log("✅ Customers tab opened");
  }

  async createCustomer(customer) {
    const { firstName, lastName, email, phone } = customer;

    await this.createCustomerBtn.waitFor({ state: "visible", timeout: 5000 });
    await this.createCustomerBtn.click();
    console.log("✅ Clicked Create Customer");

    await this.firstNameInput.fill(firstName);
    console.log(`✅ First Name filled: ${firstName}`);

    await this.lastNameInput.fill(lastName);
    console.log(`✅ Last Name filled: ${lastName}`);

    await this.emailInput.fill(email);
    console.log(`✅ Email filled: ${email}`);

    await this.phoneInput.fill(phone);
    console.log(`✅ Phone filled: ${phone}`);

 // ⚠️ Fix: use this.page
  await this.page.getByRole('button', { name: 'Add' }).click();
  console.log("✅ Customer added");

  }

  async verifyCustomer(customer) {
    const { firstName, lastName, email, phone } = customer;

    const firstCustomerRow = this.page.locator("tr.custom-row-class").first();
    await firstCustomerRow.waitFor({ state: "visible", timeout: 10000 });
    await firstCustomerRow.click();
    console.log("✅ Clicked first customer row");

    // Fetch Customer ID
    const customerId = await this.page.locator(
      'div.detail-value:has(h2:has-text("Customer ID")) .ant-space-item'
    ).textContent();
    console.log(`🔹 Customer ID: ${customerId}`);

    // Verify details
    const firstNameText = await this.page.getByText(`First Name ${firstName}`).textContent();
    const lastNameText = await this.page.getByText(`Last Name ${lastName}`).textContent();
    const emailText = await this.page.getByText(`Email ${email}`).textContent();
    const phoneText = await this.page.getByText(`Phone ${phone}`).textContent();

    console.log("🔹 Verifying Customer Details:");
    console.log(`   First Name: ${firstNameText}`);
    console.log(`   Last Name: ${lastNameText}`);
    console.log(`   Email: ${emailText}`);
    console.log(`   Phone: ${phoneText}`);

    await this.backBtn.click();
    console.log("✅ Back button clicked");
  }
}

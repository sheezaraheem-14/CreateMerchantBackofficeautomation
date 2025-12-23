export default class ProductPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.createProductBtn = page.getByRole('button', { name: 'Create Product' });
    this.nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.priceInput = page.getByRole('spinbutton', { name: 'Price' });
    this.currencyDropdown = page.getByText('Select Currency');
    this.featureInput = page.getByRole('textbox', { name: 'Enter feature' });
    this.addFeatureBtn = page.getByRole('button', { name: 'Add' });
    this.backBtn = page.getByText('Back');
  }

  // 🔹 Subscriptions → Products navigation
  async openProducts() {
    await this.page
      .getByRole('menuitem', { name: 'schedule Subscriptions' })
      .click();

    await this.page
      .getByRole('link', { name: 'Products' })
      .click();
  }

  async createProduct(product) {
    const { name, description, price, currency, feature } = product;

    await this.createProductBtn.click();

    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    await this.priceInput.fill(price.toString());

    await this.currencyDropdown.click();
    await this.page.getByTitle(currency).click();

    await this.featureInput.fill(feature);
    await this.addFeatureBtn.click();
  }

  async verifyProduct(product) {
  const { name, price, currency } = product;

  // 🔹 Click the first product row
  const firstDataRow = this.page.locator("tr.custom-row-class").first();
  await firstDataRow.waitFor({ state: "visible" });
  await firstDataRow.click();
  console.log("✅ Clicked first product row");

  // 🔹 Get visible text for Name, Currency, Price
  const nameText = await this.page.getByText(`Name ${name}`).textContent();
  const currencyText = await this.page.getByText(`Currency ${currency}`).textContent();
  const priceText = await this.page.getByText(`Price ${price.toFixed(2)}`).textContent();

  // 🔹 Get Product ID dynamically
  const productIdLocator = this.page.locator(
    'div.detail-value:has(h2:has-text("Product ID")) span div.ant-space-item'
  );
  const productId = await productIdLocator.textContent();

  console.log("🔹 Verifying Product Details:");
  console.log(`   Product ID: ${productId}`);
  console.log(`   Name: ${nameText}`);
  console.log(`   Currency: ${currencyText}`);
  console.log(`   Price: ${priceText}`);

  // 🔹 Optional assertion on Product ID prefix
  if (!productId.startsWith("xpay_produ")) {
    throw new Error(`Unexpected Product ID: ${productId}`);
  }

  // 🔹 Wait for visibility as verification
  await this.page.getByText(`Name ${name}`).waitFor({ state: "visible" });
  await this.page.getByText(`Currency ${currency}`).waitFor({ state: "visible" });
  await this.page.getByText(`Price ${price.toFixed(2)}`).waitFor({ state: "visible" });
}




  async goBack() {
    await this.backBtn.click();
  }

  async gotoDashboard(baseURL) {
    await this.page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
    await this.page
      .getByRole("link", { name: "Dashboard" })
      .waitFor({ state: "visible", timeout: 60000 });
    console.log("✅ Dashboard loaded");
  }

  async selectStore(storeName) {
    await this.page.locator(".ant-select-selector").first().click();
    await this.page.getByText(storeName, { exact: true }).click();
    await this.page
      .locator(".ant-select-selection-item")
      .first()
      .waitFor({ state: "visible" });
    console.log(`✅ Store selected: ${storeName}`);
  }
}

export default class BasePage {
  constructor(page) {
    this.page = page;
  }
  
  async goto(url) {
    await this.page.goto(url);
  }

  async waitForVisible(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { state: "visible", timeout });
  }

  async getText(selector) {
    await this.waitForVisible(selector);
    return this.page.textContent(selector);
  }

  async click(selector) {
    await this.waitForVisible(selector);
    await this.page.click(selector);
  }

  async type(selector, value) {
    await this.waitForVisible(selector);
    await this.page.fill(selector, value);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }


  // ⭐ Add Common Store Selection Function
  async selectStore(storeName) {
    await this.page.getByText('All Stores').click();
    await this.page.getByText(storeName, { exact: true }).click();
  }

}

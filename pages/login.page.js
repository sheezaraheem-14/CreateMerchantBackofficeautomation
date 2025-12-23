// pages/login.page.js
export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      accountId: 'role=textbox[name="Account ID"]',
      email: 'role=textbox[name="Email"]',
      password: 'data-testid=password-input',
      loginButton: 'role=button[name="Login"]',
      errorMsg: '.ant-notification-notice-message' // Error message container
    };
  }

  // Go to login page
  async goto(baseURL) {
    await this.page.goto(`${baseURL}/auth/login`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  // Login with credentials object {accountId?, email, password}
  async login({ accountId, email, password }) {
    if (accountId) {
      await this.page.getByRole('textbox', { name: 'Account ID' }).fill(accountId);
    }
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByTestId('password-input').fill(password);

    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  // Check if error message is visible
a// login.page.js
async waitForErrorMessage(timeout = 30000) {
  const locator = this.page.locator(this.selectors.errorMsg);
  
  await locator.waitFor({ state: 'visible', timeout });
  const text = await locator.textContent({ timeout });

  // Just check that there is some text (error is shown)
  if (!text || text.trim() === '') {
    throw new Error('Expected an error message, but none appeared');
  }

  return text.trim(); // optionally return text for logging
}
}
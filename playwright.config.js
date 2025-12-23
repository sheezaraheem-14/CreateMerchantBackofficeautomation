import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  retries: 0,
  reporter: [['list']],
 projects: [
    /*{
      name: 'setup', // login tests run first
      testMatch: /.*login\.spec\.js$/,
      use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        actionTimeout: 30000,
        screenshot: 'off',
        video: 'off',
        ...devices['Desktop Chrome'],
      },
    },*/
    {
      name: 'e2e',
     // testMatch: /^(?!.*login).*\.spec\.js$/, // exclude login.spec.js
      use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        actionTimeout: 30000,
        screenshot: 'off',
        video: 'off',
        storageState: 'auth.json', // load session
        ...devices['Desktop chrome'],
         
      },
      //dependencies: ['setup'], // ensure login runs first
    },
  ],
});


import { test, expect } from '../../fixtures/baseFixture';
import { loginTestData } from '../../test-data/loginData';  

// Basic test to verify the login page title
  test('verify setup', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.getPage()).toHaveTitle(/Ninza CRM/);
  });

// Smoke test for successful login
  test('Verify user can log in successfully @smoke', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.enterUsername(process.env.USERNAME!);
    await loginPage.enterPassword(process.env.PASSWORD!);
    await loginPage.clickSignIn();
    await expect(loginPage.getPage()).toHaveURL(/dashboard/);
  });
/*
// Data-driven test for login scenarios
  const loginData = [
    { username: '', password: 'pass1', errorMessage: 'Username is required', scenario: 'empty username' },
    { username: 'admin', password: '', errorMessage: 'Password is required', scenario: 'empty password' },
  ];
*/
  //loginData.forEach((data) => {
  loginTestData.forEach((data) => {
    test(`Verify login with missing fields: ${data.scenario}`, async ({loginPage}) => {

      await loginPage.goto();
      await loginPage.enterUsername(data.username);
      await loginPage.enterPassword(data.password); 
      await loginPage.clickSignIn();
      
      if(data.scenario === 'empty username') {
       expect( await loginPage.getUsernameRequiredMessage()).toBe(data.errorMessage);
      } 
      if(data.scenario === 'empty password') {
        expect( await loginPage.getPasswordRequiredMessage()).toBe(data.errorMessage);
      }
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    const path = `test-screenshots/${testInfo.title}_${Date.now()}.png`;
    const screenShot = await page.screenshot({ path });
    await testInfo.attach('screenshot', { 
      body: screenShot, 
      contentType: 'image/png' 
    });
    
    await page.close();
  });
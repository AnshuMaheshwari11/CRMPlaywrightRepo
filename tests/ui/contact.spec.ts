import { SelectCampaignPage } from '../../index';
import {test, expect} from '../../fixtures/baseFixture';
import { contactTestData } from '../../test-data/contactData';
import { makeContactDataUnique } from '../../utils/dataGenerator';

  // Basic test to verify the contact page header
  test('verify contacts page', async ({loginPage, navigationPage, contactPageFactory}) => {
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await navigationPage.clickContactsLink();
    const header = await contactPageFactory.getContactPage().getContactPageHeader();
    expect(header).toBe('Contacts');
  });

  // Test to verify contact form visibility
  test('Verify create contact page', async ({loginPage, navigationPage, contactPageFactory}) => {
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await navigationPage.clickContactsLink();
    await contactPageFactory.getContactPage().clickCreateContactButton();
    const createContactHeader = await contactPageFactory.getCreateContactPage().getCreateContactPage();
    expect(createContactHeader).toBe('Create Contact');
  });
    
/*
  // Data-driven test for create contact valid scenarios
  const loginData = [
    { org: 'A1', title: 'IT',dept: 'HR',off:1000000000 , name: 'Jo', mob:1000000000, email: 'jo@cd.co', scenario: 'lowerboundary' },
    { org: 'GlobalTech Solutions Pvt Ltd 123', title: 'SalesLead1',dept: 'Enterprise Services 123',off:9999999999 , name: 'Christopher Johnson', mob:9999999999, email: 'alex123@bigcompanydomain.in', scenario: 'upperboundary' },
    { org: 'ABC123 Corp', title: 'Manager',dept: '',off: undefined, name: 'Riya Mehta', mob:9876543219, email: '', scenario: 'normal' },
    { org: '1World Systems', title: '2Consult',dept: '3Suport Team',off:1023456789 , name: 'Amit Verma', mob:1023456789, email: '1contact@123app.net', scenario: 'normalnumeric' },
  ];
*/
  // Iterate over the test data and create a test for each valid create contact scenario
  //loginData.forEach((data) => {
  contactTestData.forEach((testData) => {
    test(`Verify valid Contact creation @current : ${testData.scenario}`, async ({loginPage, navigationPage, contactPageFactory, getPage}) => {

      await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
      
      await navigationPage.clickContactsLink();
      const contactPage = contactPageFactory.getContactPage();
      await contactPage.clickCreateContactButton();
      const createContactPage = contactPageFactory.getCreateContactPage();

      const uniqueData = makeContactDataUnique(testData)
      await createContactPage.fillContactForm(uniqueData);

      const childPage = await createContactPage.openSelectCampaignPage();
      await childPage.waitForLoadState('domcontentloaded');
      const  selectCampaignPage = getPage(SelectCampaignPage, childPage);
      
      //await selectCampaignPage.selectCampaign('Campaign ID', 'CAM09266');
      await selectCampaignPage.selectCampaign();
      await createContactPage.bringToFront();   
      await createContactPage.submitForm();
      expect(await createContactPage.getContactCreatedMessage()).toBe(`Contact ${testData.contactName} Successfully Added`);
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


  /*
      const jwtToken = await loginPage.getTokenOnLogin(process.env.USERNAME!, process.env.PASSWORD!);
      
      await childPage.evaluate(async (token) => {
      localStorage.setItem('jwt', token);
      await new Promise(resolve => setTimeout(resolve, 500)); 
      window.postMessage({ token: token }, window.location.origin);
      }, jwtToken);
  */
  /*
  test.beforeAll(async ({ request, browser }) => {
    // Login via API
    const apiContext = await getAPIContext();
    const loginApi = new LoginApi(apiContext);
    const loginResponse = await loginApi.login(process.env.USERNAME!, process.env.PASSWORD!);
    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Create a browser context with token
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(process.env.BASE_URL!);

    // Inject token in localStorage
    await page.evaluate((token) => {
      localStorage.setItem('jwt', token);
    }, token);

    // Save storageState to reuse in tests
    await context.storageState({ path: 'auth.json' });
    await context.close();
  });
*/
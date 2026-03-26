import { test as base, expect, Page} from '@playwright/test';
import { LoginPage, NavigationPage, ContactPageFactory } from '../index'; 

type BaseFixture = {
  loginPage: LoginPage;
  navigationPage: NavigationPage;
  contactPageFactory: ContactPageFactory;
  //getPage: (page: any) => SelectCampaignPage;
  getPage: <T>(PageClass: new (page: Page) => T, page: Page) => T;
};

export const test = base.extend<BaseFixture>({
  // Page objects
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },

  contactPageFactory: async ({ page }, use) => {
    await use(new ContactPageFactory(page));
  },

  // getPage:  async ({}, use) => {
  //   await use((page) => new SelectCampaignPage(page));
  // }

  getPage: ({}, use) => {
    use(<T>(PageClass: new (page: Page) => T, customPage: Page) => {
      return new PageClass(customPage);
    });
  },

});

export { expect };
import { test as base, expect} from '@playwright/test';
import { LoginPage, NavigationPage, ContactPage, CreateContactPage } from '../index'; 

type BaseFixture = {
  loginPage: LoginPage;
  navigationPage: NavigationPage;
  contactPage: ContactPage;
  createContactPage: CreateContactPage;
};

export const test = base.extend<BaseFixture>({
  // Page objects
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  createContactPage: async ({ page }, use) => {
    await use(new CreateContactPage(page));
  },

});

export { expect };
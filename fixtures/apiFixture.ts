// fixtures/apiFixture.ts
import { test as base } from '@playwright/test';
import { getAPIContext } from '../utils/apiConfig';
import { AuthApi, ContactApi } from '../index';


type ApiFixture = {
  authApi: AuthApi;
  contactApi: ContactApi;
};

export const test = base.extend<ApiFixture>({
  authApi: async ({}, use) => {
    const apiContext = await getAPIContext();
    await use(new AuthApi(apiContext));
  },
  contactApi: async ({}, use) => {
    const apiContext = await getAPIContext();
    await use(new ContactApi(apiContext));
  }
});

export { expect } from '@playwright/test';
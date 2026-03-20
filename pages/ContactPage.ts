import { Page, Locator } from '@playwright/test';

export class ContactPage {

   private readonly contactHeader: Locator;

   constructor (private page: Page) {
      this.contactHeader = page.locator('h2');
   }
   async clickCreateContactButton() {
      await this.page.getByRole('button', { name: 'Create Contact' }).click();
   }
   
   async getContactPageHeader() {
      return await this.contactHeader.textContent();
   }
}
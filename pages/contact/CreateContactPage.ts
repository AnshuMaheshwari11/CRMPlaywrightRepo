import { Page, Locator } from '@playwright/test';
import { ContactData } from '../../test-data/contactData';

type numberOrUndefined = number | undefined;

export class CreateContactPage {

    private readonly heading: Locator;
    private readonly organization: Locator;
    private readonly title: Locator;
    private readonly department: Locator;
    private readonly officePhone: Locator;
    private readonly contactName: Locator;
    private readonly mobile: Locator;
    private readonly email: Locator;
    private readonly createButton: Locator;
    private readonly addIcon: Locator;
    private readonly successMessage: Locator;

   constructor(private page: Page) {
      this.heading = page.locator('h3');
      this.organization = page.locator('input[name="organizationName"]');
      this.title = page.locator('input[name="title"]');
      this.department = page.locator('input[name="department"]');
      this.officePhone = page.locator('input[name="officePhone"]');
      this.contactName = page.locator('input[name="contactName"]');
      this.mobile = page.locator('input[name="mobile"]');
      this.email = page.locator('input[name="email"]');
      this.createButton = page.getByRole('button', { name: 'Create Contact' });
      this.addIcon = page.locator('[data-icon="plus"]');
      this.successMessage = page.getByRole('alert');
   }

   async fillContactForm(data: ContactData) {
      await this.organization.fill(data.organizationName);
      await this.title.fill(data.title);
      if (data.department !== undefined) {
         await this.department.fill(data.department);
      }
      if (data.officePhone !== undefined) {
         await this.officePhone.fill(data.officePhone.toString());
      }
      await this.contactName.fill(data.contactName);
      await this.mobile.fill(data.mobile);
      if (data.email !== undefined) {
         await this.email.fill(data.email); 
      }
   }

   async openSelectCampaignPage(): Promise<Page> {
      const [childPage] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.addIcon.click(),
      ]);
      await childPage.waitForLoadState();
      return childPage;
   }

   async bringToFront() {
      await this.page.bringToFront();
   } 

   async submitForm() {
      await this.createButton.click();
   }

   async getCreateContactPage() {
      return await this.heading.textContent();
   }

   async getContactCreatedMessage() {
      return await (this.successMessage).textContent();
   }
} 
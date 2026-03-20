import { Page, Locator } from "@playwright/test";

export class NavigationPage {
    
  private readonly contactsTab: Locator;

  constructor(private page: Page) {
    this.contactsTab = this.page.getByRole('link', { name: 'Contacts' });
 }

  async clickContactsLink() {
      await this.contactsTab.click();
  }
}
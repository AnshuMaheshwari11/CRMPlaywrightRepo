import { Page } from "@playwright/test";
import { ContactPage, CreateContactPage } from "../index";

export class ContactPageFactory {
  contactPage: ContactPage;
  createContactPage: CreateContactPage;

  constructor(private page: Page) {
    this.contactPage = new ContactPage(page);
    this.createContactPage = new CreateContactPage(page);
  }

  getContactPage() {
    return this.contactPage;
  }

  getCreateContactPage() {
    return this.createContactPage;
  }
}
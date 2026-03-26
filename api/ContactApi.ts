import { APIRequestContext } from '@playwright/test';
import { ContactPayload } from '../test-data/contactData';
import { generateUniqueEmail, generateUniqueMobile } from '../utils/dataGenerator';



export class ContactApi {
    private readonly apiContext: APIRequestContext;
    
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async getAllContact(page: number, size: number) {
        const response = await this.apiContext.get('/contact/all',{
            params: {
                page: page.toString(),
                size: size.toString()
            }
        });
        return response;
    }
    
    async getContactCount() {
        const response = await this.apiContext.get('/contact/count');
        return response;
    }

    async createContact(contactData: ContactPayload, campaignId: string) {
    
        const response = await this.apiContext.post('/contact', {
            params: {
                campaignId: campaignId
            },
            data: contactData
        });
        const data = await response.json();
        return { response, contactId: data.contactId };
    }

    async updateContact(contactData: ContactPayload, contactId: string, campaignId:  string) {
        const response = await this.apiContext.put('/contact', {
            params: {
                contactId: contactId,
                campaignId: campaignId
            },
            data: contactData
        });
        return response;
    }

    async deleteContact(contactId: string) {
        const response = await this.apiContext.delete('/contact', {
            params: {
                contactId: contactId
            }
        });
        return response;
    }
}       
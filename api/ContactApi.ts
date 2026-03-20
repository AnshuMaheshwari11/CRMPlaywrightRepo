import { APIRequestContext } from '@playwright/test';

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

    async createContact(contactData: object, campaignId: string) {
        const response = await this.apiContext.post('/contact', {
            params: {
                campaignId: campaignId
            },
            data: contactData
        });
        return response;
    }

    async updateContact(contactData: object, contactId: string, campaignId:  string) {
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
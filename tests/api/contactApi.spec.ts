
import { test, expect } from '../../fixtures/apiFixture';
import {
  createContactPayload, 
  updateContactPayload, 
  defaultCampaignID,
  updatedCampaignID
} from '../../test-data/contactData';
import { makeContactDataUnique } from '../../utils/dataGenerator';

test('Get All Contacts', async ({ contactApi }) => {
    const getAllResponse = await contactApi.getAllContact(1, 10);
    expect(getAllResponse.status()).toBe(200);
    const responseBody = await getAllResponse.json();
    console.log('Get All Contacts successful, body:', responseBody);
    expect(responseBody.size).toBeLessThanOrEqual(10);
});

test ('Get Contact Count', async ({ contactApi }) => {
    const countResponse = await contactApi.getContactCount();
    expect(countResponse.status()).toBe(200);
    const responseBody = await countResponse.json();
    console.log('Get Contact Count successful, body:', responseBody);
    expect(responseBody).toBeGreaterThan(0);
});

test('Create Contact', async ({ contactApi }) => {
    const uniquePayload = makeContactDataUnique(createContactPayload);
    const campaignId = defaultCampaignID;
     const { response: createResponse, contactId } 
            = await contactApi.createContact(uniquePayload, campaignId);

    const responseBody = await createResponse.json();
    expect(createResponse.status()).toBe(201);
    expect(contactId).toBeTruthy();
    expect(responseBody.contactName).toBe(uniquePayload.contactName);
    expect(responseBody.email).toBe(uniquePayload.email);
    expect(responseBody.campaign.campaignId).toBe(campaignId);
    expect(responseBody.mobile).toBe(uniquePayload.mobile);
    expect(responseBody.officePhone).toBe(uniquePayload.officePhone);
    expect(responseBody.organizationName).toBe(uniquePayload.organizationName);
    expect(responseBody.title).toBe(uniquePayload.title);
    expect(responseBody.department).toBe(uniquePayload.department);
    console.log('Create Contact successful, body:', responseBody);
});

test ('Update Contact', async ({ contactApi }) => {
    const uniquePayload = makeContactDataUnique(createContactPayload);
    const { response: createResponse, contactId } = await contactApi.createContact(uniquePayload, defaultCampaignID);
    expect(createResponse.status()).toBe(201);

    const uniqueUpdatePayload = makeContactDataUnique(updateContactPayload);
    const campaignId = updatedCampaignID;
    const updateResponse = await contactApi.updateContact(uniqueUpdatePayload, contactId, campaignId);

    expect(updateResponse.status()).toBe(200);
    const responseBody = await updateResponse.json();
    expect(responseBody.contactId).toBe(contactId);
    expect(responseBody.contactName).toBe(uniqueUpdatePayload.contactName);
    expect(responseBody.email).toBe(uniqueUpdatePayload.email);
    expect(responseBody.campaign.campaignId).toBe(campaignId);
    expect(responseBody.mobile).toBe(uniqueUpdatePayload.mobile);
    expect(responseBody.officePhone).toBe(uniqueUpdatePayload.officePhone);
    expect(responseBody.organizationName).toBe(uniqueUpdatePayload.organizationName);
    expect(responseBody.title).toBe(uniqueUpdatePayload.title);
    expect(responseBody.department).toBe(uniqueUpdatePayload.department);
    console.log('Update Contact successful, body:', responseBody);
});

test('Delete Contact', async ({ contactApi }) => {
   const uniquePayload = makeContactDataUnique(createContactPayload);
   const { response: createResponse, contactId } = await contactApi.createContact(uniquePayload, defaultCampaignID);
    expect(createResponse.status()).toBe(201);

    const deleteResponse = await contactApi.deleteContact(contactId);
    expect(deleteResponse.status()).toBe(204);
    console.log('Delete Contact successful for contactId:', contactId);
});

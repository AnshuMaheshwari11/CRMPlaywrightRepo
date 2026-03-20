
import { test, expect } from '../../fixtures/apiFixture';
import { 
  createContactPayload, 
  updateContactPayload, 
  setContactId, 
  getContactId, 
  defaultCampaignID,
  updatedCampaignID,
} from '../../test-data/contactData';

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
    const contactData = createContactPayload;
    const campaignId = defaultCampaignID;
    const createResponse = await contactApi.createContact(contactData, campaignId);

    const responseBody = await createResponse.json();
    setContactId(responseBody.contactId); // save ID for other tests
    expect(createResponse.status()).toBe(201);
    expect(responseBody.contactId).toBeTruthy();
    expect(responseBody.contactName).toBe(contactData.contactName);
    expect(responseBody.email).toBe(contactData.email);
    expect(responseBody.campaign.campaignId).toBe(campaignId);
    expect(responseBody.mobile).toBe(contactData.mobile);
    expect(responseBody.officePhone).toBe(contactData.officePhone);
    expect(responseBody.organizationName).toBe(contactData.organizationName);
    expect(responseBody.title).toBe(contactData.title);
    expect(responseBody.department).toBe(contactData.department);
    console.log('Create Contact successful, body:', responseBody);
});

test ('Update Contact', async ({ contactApi }) => {
    const updateData = updateContactPayload;
    const campaignId = updatedCampaignID;
    const contactId = getContactId();
    const updateResponse = await contactApi.updateContact(updateData, contactId, campaignId);

    expect(updateResponse.status()).toBe(200);
    const responseBody = await updateResponse.json();
    expect(responseBody.contactId).toBe(contactId);
    expect(responseBody.contactName).toBe(updateData.contactName);
    expect(responseBody.email).toBe(updateData.email);
    expect(responseBody.campaign.campaignId).toBe(campaignId);
    expect(responseBody.mobile).toBe(updateData.mobile);
    expect(responseBody.officePhone).toBe(updateData.officePhone);
    expect(responseBody.organizationName).toBe(updateData.organizationName);
    expect(responseBody.title).toBe(updateData.title);
    expect(responseBody.department).toBe(updateData.department);
    console.log('Update Contact successful, body:', responseBody);
});

test('Delete Contact', async ({ contactApi }) => {
    const contactId = getContactId();
    const deleteResponse = await contactApi.deleteContact(contactId);
    expect(deleteResponse.status()).toBe(204);
    console.log('Delete Contact successful for contactId:', contactId);
});

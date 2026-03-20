export const contactRuntimeData: { contactId?: string } = {};
export const defaultCampaignID = 'CAM09242';
export const updatedCampaignID = 'CAM09266';

//Static payload for API Create Contact
export const createContactPayload = {
  mobile: '1000000001',
  contactName: 'Harry Potter',
  email: 'harry.potter@example.com',
  organizationName: 'Acme Corp',
  title: 'Manager',
  department: 'Sales',
  officePhone: '1000000001'
};

//Static payload for API Update Contact
export const updateContactPayload = {
  mobile: '1000000002',
  contactName: 'Harry Updated',
  email: 'harry.updated@example.com',
  organizationName: 'Acme Updated',
  title: 'Senior Manager',
  department: 'Marketing',
  officePhone: '1000000002'
};

//Functions to set/get contactId
export function setContactId(id: string) {
  contactRuntimeData.contactId = id;
}

export function getContactId() {
  if (!contactRuntimeData.contactId) throw new Error('contactId not set! Run Create Contact first.');
  return contactRuntimeData.contactId;
}

//UI boundary test data (edge cases)
export const contactBoundaryData = [
  {
    org: 'A1',
    title: 'IT',
    dept: 'HR',
    off: 1000000000,
    name: 'Jo',
    mob: 1000000000,
    email: 'jo@cd.co',
    scenario: 'lowerboundary'
  },
  {
    org: 'GlobalTech Solutions Pvt Ltd 123',
    title: 'SalesLead1',
    dept: 'Enterprise Services 123',
    off: 9999999999,
    name: 'Christopher Johnson',
    mob: 9999999999,
    email: 'alex123@bigcompanydomain.in',
    scenario: 'upperboundary'
  },
  {
    org: 'ABC123 Corp',
    title: 'Manager',
    dept: '',
    off: undefined,
    name: 'Riya Mehta',
    mob: 9876543219,
    email: '',
    scenario: 'normal'
  },
  {
    org: '1World Systems',
    title: '2Consult',
    dept: '3Support Team',
    off: 1023456789,
    name: 'Amit Verma',
    mob: 1023456789,
    email: '1contact@123app.net',
    scenario: 'normalnumeric'
  }
];

export type ContactPayload = {
  contactName: string;
  organizationName: string;
  title: string;
  department?: string;
  officePhone?: string;
  mobile: string;
  email?: string;
};

export type ContactData = ContactPayload & {
  scenario?: string;           // e.g., 'lowerboundary', 'upperboundary'
  expectedErrorMessage?: string; // optional, for UI validation
};

export const defaultCampaignID = 'CAM09242';
export const updatedCampaignID = 'CAM09266';

//Static payload for API Create Contact
export const createContactPayload: ContactPayload = {
  mobile: '1000000001',
  contactName: 'Harry Potter',
  email: 'harry.potter@example.com',
  organizationName: 'Acme Corp',
  title: 'Manager',
  department: 'Sales',
  officePhone: '1000000001'
};

//Static payload for API Update Contact
export const updateContactPayload: ContactPayload = {
  mobile: '1000000002',
  contactName: 'Harry Updated',
  email: 'harry.updated@example.com',
  organizationName: 'Acme Updated',
  title: 'Senior Manager',
  department: 'Marketing',
  officePhone: '1000000002'
};

//UI boundary test data (edge cases)
export const contactTestData:ContactData[] = [
  {
    contactName: 'Jo',
    organizationName: 'A1',
    title: 'IT',
    department: 'HR',
    officePhone: '1000000000',
    mobile: '1000000000',
    email: 'jo@cd.co',
    scenario: 'lowerboundary'
  },
  {
    contactName: 'Christopher Johnson',
    organizationName: 'GlobalTech Solutions Pvt Ltd 123',
    title: 'SalesLead1',
    department: 'Enterprise Services 123',
    officePhone: '9999999999',
    mobile: '9999999999',
    email: 'alex123@bigcompanydomain.in',
    scenario: 'upperboundary'
  },
  {
    contactName: 'Riya Mehta',
    organizationName: 'ABC123 Corp',
    title: 'Manager',
    department: '',
    officePhone: undefined,
    mobile: '9876543219',
    email: '',
    scenario: 'normal'
  },
  {
    contactName: 'Amit Verma',
    organizationName: '1World Systems',
    title: '2Consult',
    department: '3Support Team',
    officePhone: '1023456789',
    mobile: '1023456789',
    email: '1contact@123app.net',
    scenario: 'normalnumeric'
  }
];
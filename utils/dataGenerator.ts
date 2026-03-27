import { ContactData, ContactPayload } from "../test-data/contactData";

export function generateUniqueEmail(baseEmail: string) {
  if (!baseEmail) return '';
  //const timestamp = Date.now();
  const timestamp = new Date().toISOString().slice(11, 23).replace(/[:.]/g, '');
  const [name, domain] = baseEmail.split('@');
  return `${name}${timestamp}@${domain}`;
}

export function generateUniqueMobile(baseMobile: string) {
  const random = Math.floor(1000 + Math.random() * 9000);
  return (`${baseMobile.slice(0, 6)}${random}`);
}

// Works for both ContactPayload and ContactData
export function makeContactDataUnique<T extends ContactPayload | ContactData>(data: T): T {
    return {
        ...data,
        email: data.email ? generateUniqueEmail(data.email) : undefined,
        mobile: data.mobile ? generateUniqueMobile(data.mobile) : undefined
    };
}
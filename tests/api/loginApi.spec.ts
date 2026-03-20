import { test, expect } from '../../fixtures/apiFixture';

test('CRM API Login Test', async ({ authApi }) => {
    
    const response = await authApi.login(process.env.USERNAME!, process.env.PASSWORD!);
    expect(response.status()).toBe(202);
    const body = await response.json();
    expect(body.msg).toBe('Successfully Logged In');
    expect(body.username).toBe(process.env.USERNAME);
    expect(body.role).toBe('ROLE_ADMIN');
    expect(body.jwtToken).toBeTruthy();
    console.log('CRM API Login successful, body: ', body);
});


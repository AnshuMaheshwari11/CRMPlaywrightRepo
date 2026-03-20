import { APIRequestContext } from '@playwright/test';

export class AuthApi {
    private readonly apiContext: APIRequestContext;
    
    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }   

    async login(username: string, password: string) {
        const base64 = Buffer.from(`${username}:${password}`).toString('base64');
        const response = await this.apiContext.get('/login', {
           headers: {
                'Authorization': `Basic ${base64}`
            },
        });
        return response;
    }

    async getToken(username: string, password: string): Promise<string> {
    const response = await this.login(username, password);

    if (response.status() !== 202) {
        throw new Error('Login failed');
    }

    const body = await response.json();
    return body.jwtToken;
}
}
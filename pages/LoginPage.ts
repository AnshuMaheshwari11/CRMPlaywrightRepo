import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly username : Locator;
    private readonly password : Locator;
    private readonly signInButton : Locator;
    private readonly usernameError : Locator;
    private readonly passwordError : Locator;

    constructor(private page: Page) {
        this.username = page.locator('#username');
        this.password = page.locator('#inputPassword');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.usernameError = page.locator('input#username + .invalid-feedback');
        this.passwordError = page.locator('input#inputPassword + .invalid-feedback');
    }

    async goto() {
        await this.page.goto('/');
    }

    async enterUsername(username: string) {
        await this.username.fill(username);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async getUsernameRequiredMessage() {
        return this.usernameError.textContent(); 
    }

    async getPasswordRequiredMessage() {
        return this.passwordError.textContent();        
    }

    async login(username: string, password: string) {
        await this.goto();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSignIn();
    }

   async getTokenOnLogin(username: string, password: string): Promise<string> {

        await this.goto();
        await this.enterUsername(username);
        await this.enterPassword(password);
        // Prepare to capture the login response (replace with your actual API endpoint)
        const loginResponsePromise = this.page.waitForResponse(response => 
            response.url().includes(`/login`) && response.status() === 202
        );
        await this.clickSignIn();

        const loginResponse = await loginResponsePromise;
        const responseBody = await loginResponse.json();
        console.log('Login API response body: ', responseBody);
        console.log('Extracted JWT Token: ', responseBody.jwtToken);
        return responseBody.jwtToken;
    }   
    
    getPage() {
        return this.page;
    }
}
import{expect,Locator,Page} from '@playwright/test';

export class LoginPage {

    usernameInput:Locator;
    passwordInput:Locator;
    loginButton:Locator;
    pageHeader:Locator;
    page:Page;
    // username:string="";

    constructor(page:Page) {
        this.page = page;
        this.usernameInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button#login-btn');
        this.pageHeader = page.getByText('Featured Events');
        // this.pageHeader = page.getByText(`Featured Events ${this.username}`);
    }

    async login(username:string, password:string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect( this.pageHeader).toBeVisible();
        
    }
}
import { test } from '@playwright/test';

export class MainPage {

   constructor(page) {
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' }).describe('Sign up button');
    }

    async gotoRegister() {
        return test.step('Go to the registration page', async (step) => {
            await this.signupLink.click();
        })
    }

    async open(url = '/') {
        return test.step(`Go to page ${url} `, async (step) => {
            await this.page.goto(url);
        })
    }
}
import { test } from '@playwright/test';

export class MainPage {

   constructor(page) {
        this.page = page;
        this.signupLink = page.getByRole('link', { name: 'Sign up' }).describe('Кнопка//cсылка зарегистрироваться');
    }

    async gotoRegister() {
        return test.step('Перейти на страницу Регистрации', async (step) => {
            this.signupLink.click();
        })
    }

    async open(url = '/') {
        return test.step(`Перейти на страницу ${url} `, async (step) => {

            await this.page.goto(url);
        })
    }
}
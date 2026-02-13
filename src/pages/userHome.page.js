import { test } from '@playwright/test';

export class UserHomePage {
    constructor(page) {
        this.page = page;
        this.userMenuDropdownButton = page.locator('div.nav-link.dropdown-toggle');
        this.settingsMenuButton = page.locator('a[href="#/settings"]');
        this.createNewArticleButton = page.locator('a[href="#/editor"]');
        this.yourFeedButton = page.getByRole('button', { name: 'Your feed' });
    }

    async clickUserMenuDropdownButton() {
        return test.step("Click 'User' menu dropdown button ", async (step) => {
            await this.userMenuDropdownButton.click();
        })
    }

    async clickSettingsMenuButton() {
        return test.step("Click 'Settings' menu dropdown button ", async (step) => {
            await this.settingsMenuButton.click();
        })
    }

    async clickCreateNewArticleButton() {
        return test.step("Click 'Create new article' button", async (step) => {
            await this.createNewArticleButton.click();
        })
    }
}
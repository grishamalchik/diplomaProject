import { test } from '@playwright/test';

export class SettingsPage {

    constructor(page) {
        this.page = page;
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
        this.imageUrlInput = page.getByRole('textbox', { name: 'URL of profile picture' });
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.bioInput = page.getByRole('textbox', { name: 'Short bio about you' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.userMenuDropdownButton = page.locator('div.nav-link.dropdown-toggle');
        this.settingsMenuButton = page.locator('a[href="#/settings"]')
    }

    async updateName(newName) {
        return test.step("Change name in 'Name' field and click 'Update settings' button", async (step) => {
            await this.nameInput.click();
            await this.nameInput.fill(newName);
            await this.updateSettingsButton.click();
        })
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
}

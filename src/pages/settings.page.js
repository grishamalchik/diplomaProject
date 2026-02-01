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

    async fillName(newName) {
        await this.nameInput.click();
        await this.nameInput.fill(newName);
    }

    async clickUpdateSettingsButton() {
        await this.updateSettingsButton.click();
    }

    async clickUserMenuDropdownButton() {
        await this.userMenuDropdownButton.click();
    }

    async clickSettingsMenuButton() {
        await this.settingsMenuButton.click();
    }
}

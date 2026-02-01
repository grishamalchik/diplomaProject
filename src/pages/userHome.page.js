export class UserHomePage {
    constructor(page) {
        this.page = page;
        this.userMenuDropdownButton = page.locator('div.nav-link.dropdown-toggle');
        this.settingsMenuButton = page.locator('a[href="#/settings"]');
        this.createNewArticleButton = page.locator('a[href="#/editor"]');
        this.yourFeedButton = page.getByRole('button', { name: 'Your feed' });
    }

    async clickUserMenuDropdownButton() {
        await this.userMenuDropdownButton.click();
    }

    async clickSettingsMenuButton() {
        await this.settingsMenuButton.click();
    }

    async clickCreateNewArticleButton() {
        await this.createNewArticleButton.click();
    }
}
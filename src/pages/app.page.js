import { UserHomePage, MainPage, RegisterPage, SettingsPage, NewArticlePage, CreatedArticlePage, EditArticlePage } from './index';

export class App {
    constructor(page) {
        this.page = page;
        this.userHome = new UserHomePage(page);
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);
        this.settings = new SettingsPage(page);
        this.newArticle = new NewArticlePage(page);
        this.createdArticle = new CreatedArticlePage(page);
        this.editArticle = new EditArticlePage(page);
    }
}
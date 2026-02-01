export class NewArticlePage {

    constructor(page) {
        this.page = page;
        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
        this.articleTitleInput = page.getByRole('textbox', { name: 'Article title' });
        this.articleDescriptionInput = page.getByRole('textbox', { name: `What's this article about?` });
        this.articleBodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
    }

    async fillNewArticleFields(title, description, body, tags) {
        await this.articleTitleInput.click();
        await this.articleTitleInput.fill(title);
        await this.articleDescriptionInput.click();
        await this.articleDescriptionInput.fill(description);
        await this.articleBodyInput.click();
        await this.articleBodyInput.fill(body);
        await this.tagsInput.click();
        await this.tagsInput.fill(tags);
    }

    async clickPublishArticleButton() {
        await this.publishArticleButton.click();
    }
}
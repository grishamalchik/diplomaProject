import { test } from '@playwright/test';

export class EditArticlePage {

    constructor(page) {
        this.page = page;
        this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
        this.articleTitleInput = page.getByRole('textbox', { name: 'Article title' });
        this.articleDescriptionInput = page.getByRole('textbox', { name: `What's this article about?` });
        this.articleBodyInput = page.getByRole('textbox', { name: 'Write your article (in markdown)' });
        this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
    }

    async updateArticleBody(newBody) {
        return test.step("Enter new text in the body of the article and click 'Update article' button", async (step) => {
            await this.articleBodyInput.click();
            await this.articleBodyInput.fill(newBody);
            await this.updateArticleButton.click();
        })
    }
}

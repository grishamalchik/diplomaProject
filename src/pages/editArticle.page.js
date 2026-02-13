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

    async fillArticleBody(newBody) {
        return test.step('Enter new text in the body of the article', async (step) => {
        await this.articleBodyInput.click();
        await this.articleBodyInput.fill(newBody);
        })
    }

    async clickUpdateArticleButton() {
        return test.step('Update article', async (step) => {
        await this.updateArticleButton.click();
        })
    }
}
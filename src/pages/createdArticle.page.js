import { test } from '@playwright/test';

export class CreatedArticlePage {

    constructor(page) {
        this.page = page;
        this.articleHeading = page.getByRole('heading', { level: 1 });
        this.newCommentTextbox = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.publishedCommentTextbox = page.locator('.card-text');
        this.deleteArticleButton = page.locator('.banner').getByRole('button', { name: /Delete Article/ });
        this.editArticleButton = page.locator('.banner').getByRole('link', { name: /Edit Article/ });
        this.articleBody = page.locator('.article-content p');
    }

    async addNewComment(commentText) {
        return test.step("Enter new comment text and click 'Post comment' button", async (step) => {
            await this.newCommentTextbox.click();
            await this.newCommentTextbox.fill(commentText);
            await this.postCommentButton.click();
        })
    }

    async clickEditArticleButton() {
        return test.step("Click 'Edit article' button", async (step) => {
            await this.editArticleButton.click();
        })
    }

    async deleteArticle() {
        return test.step('Delete article', async (step) => {
            this.page.once('dialog', dialog => dialog.accept());
            await this.deleteArticleButton.click();
        })
    }
}
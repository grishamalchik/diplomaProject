import { faker } from '@faker-js/faker';

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

    async fillNewCommentTextbox(commentText) {
        await this.newCommentTextbox.click();
        await this.newCommentTextbox.fill(commentText);
    }

    async clickPostCommentButton() {
        await this.postCommentButton.click();
    }

    async clickEditArticleButton() {
        await this.editArticleButton.click();
    }

    async deleteArticle() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.deleteArticleButton.click();
    }
}

// @ts-nocheck
import { expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/index';
import { ArticleBuilder } from '../src/helpers/builders/index';
import { test } from '../src/helpers/fixtures/fixture';


test.describe('Tests with registered user', () => {
    let user;

    test.beforeEach(async ({ app }) => {
        user = new UserBuilder().withEmail().withName().withPassword().build();
        const { email, name, password } = user;
        await app.main.open('/');
        await app.main.gotoRegister();
        await app.register.register(name, email, password);
    });

    test('User can change their name', async ({ app }) => {
        const newName = new UserBuilder().withName().build().name;

        await app.userHome.clickUserMenuDropdownButton();
        await app.userHome.clickSettingsMenuButton();
        await app.settings.updateName(newName);

        await expect(app.settings.userMenuDropdownButton).toContainText(newName);
    });

    test('User can create a new article', async ({ app }) => {
        const article = new ArticleBuilder().withTitle().withDescription().withBody().withTags().build();
        const { title, description, body, tags } = article;

        await app.userHome.clickCreateNewArticleButton();
        await app.newArticle.publishNewArticle(title, description, body, tags);

        await expect(app.createdArticle.articleHeading).toContainText(article.title);
    });

});

test.describe('Tests with registered user and created article', () => {

    let user;
    let article;

    test.beforeEach(async ({ app }) => {
        user = new UserBuilder().withEmail().withName().withPassword().build();
        const { email, name, password } = user;
        article = new ArticleBuilder().withTitle().withDescription().withBody().withTags().build();
        const { title, description, body, tags } = article;

        await app.main.open('/');
        await app.main.gotoRegister();
        await app.register.register(name, email, password);
        await app.userHome.clickCreateNewArticleButton();
        await app.newArticle.publishNewArticle(title, description, body, tags);
    });

    test('User can add a comment to the article', async ({ app }) => {
        const commentText = new ArticleBuilder().withComment().build().comment;

        await app.createdArticle.addNewComment(commentText);

        await expect(app.createdArticle.publishedCommentTextbox).toContainText(commentText);
    });

    test('User can edit the article', async ({ app }) => {
        const newBody = new ArticleBuilder().withBody().build().body;

        await app.createdArticle.clickEditArticleButton();
        await app.editArticle.updateArticleBody(newBody);

        await expect(app.createdArticle.articleBody).toContainText(newBody);
    });


    test('User can delete the article', async ({ app }) => {
        await app.createdArticle.deleteArticle();

        await expect(app.userHome.yourFeedButton).toContainText('Your Feed');
    });
});
// @ts-nocheck
import { expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/index';
import { ArticleBuilder } from '../src/helpers/builders/index';
import { faker } from '@faker-js/faker';
import { test } from '../src/helpers/fixtures/fixture';


test.describe('Тесты с зарегистрированным пользователем', () => {
    let user;

    test.beforeEach(async ({ app }) => {
        user = new UserBuilder().withEmail().withName().withPassword().build();
        const { email, name, password } = user;
        await app.main.open('/');
        await app.main.gotoRegister();
        await app.register.register(name, email, password);
    });

    test('Пользователь может изменить имя', async ({ app }) => {
        const newName = faker.person.fullName();

        await app.userHome.clickUserMenuDropdownButton();
        await app.userHome.clickSettingsMenuButton();
        await app.settings.fillName(newName);
        await app.settings.clickUpdateSettingsButton();

        await expect(app.settings.userMenuDropdownButton).toContainText(newName);
    });

    test('Пользователь может создать статью', async ({ app }) => {
        const article = new ArticleBuilder().withTitle().withDescription().withBody().withTags().build();
        const { title, description, body, tags } = article;

        await app.userHome.clickCreateNewArticleButton();
        await app.newArticle.fillNewArticleFields(title, description, body, tags);
        await app.newArticle.clickPublishArticleButton();

        await expect(app.createdArticle.articleHeading).toContainText(article.title);
    });

});

test.describe('Тесты с зарегистрированным пользователем и добавленной статьей', () => {

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
        await app.newArticle.fillNewArticleFields(title, description, body, tags);
        await app.newArticle.clickPublishArticleButton();
    });

    test('Пользователь может добавить комментарий к статье', async ({ app }) => {
        const commentText = faker.lorem.text();

        await app.createdArticle.fillNewCommentTextbox(commentText);
        await app.createdArticle.clickPostCommentButton();

        await expect(app.createdArticle.publishedCommentTextbox).toContainText(commentText);
    });

    test('Пользователь может отредактировать статью', async ({ app }) => {
        const newBody = faker.lorem.text();

        await app.createdArticle.clickEditArticleButton();
        await app.editArticle.fillArticleBody(newBody);
        await app.editArticle.clickUpdateArticleButton();

        await expect(app.createdArticle.articleBody).toContainText(newBody);
    });


    test('Пользователь может удалить статью', async ({ app }) => {
        await app.createdArticle.deleteArticle();

        await expect(app.userHome.yourFeedButton).toContainText('Your Feed');
    });
});
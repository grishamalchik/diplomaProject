import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    withTitle(title) {
        this.title = title ?? `${faker.lorem.words(3)} ${faker.string.alphanumeric(5)}`;
        return this;
    }

    withDescription(description) {
        this.description = description ?? faker.lorem.paragraph();
        return this;
    }
    withBody(body) {
        this.body = body ?? faker.lorem.text();
        return this;

    }
    withTags(tags) {
        this.tags = tags ?? `${faker.lorem.word()}, ${faker.lorem.word()}, ${faker.lorem.word()}`;
        return this;

    }
    build() {
        const result = { ...this };
        return result;
    }
}
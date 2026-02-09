import { faker } from '@faker-js/faker';

export class TodoBuilder {
    withTitle(title) {
        this.title = title ?? faker.company.buzzPhrase();
        return this;
    }

    withDoneStatus(doneStatus) {
        this.doneStatus = doneStatus ?? faker.datatype.boolean();
        return this;
    }
    withDescription(description) {
        this.description = description ?? faker.lorem.sentence({ min: 3, max: 5 });
        return this;

    }
    build() {
        const result = { ...this };
        return result;
    }
}


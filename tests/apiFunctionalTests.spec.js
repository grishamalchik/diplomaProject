// @ts-nocheck
import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';
import { Api } from '../src/services/api.facade'
import { faker } from '@faker-js/faker';
import { TodoBuilder } from '../src/helpers/builders';

let token;
let defaultTestTodoResponse;

test.describe('API tests', () => {
    test.beforeAll(async ({ api }, testInfo) => {
        let response = await api.challenger.post(testInfo);
        token = response.headers['x-challenger'];
    });

    test.beforeEach(async ({ api }, testInfo) => {
        const newTodoData = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
        defaultTestTodoResponse = await api.todos.createNewTodo(testInfo, token, newTodoData);
    });

    test("User can get specific to-do list item", async ({ api }, testInfo) => {
        let defaultTestTodoBody = await defaultTestTodoResponse.json();
        let todoId = defaultTestTodoBody.id;

        let getTodoByIdResponse = await api.todos.getTodoById(testInfo, token, todoId);

        expect(getTodoByIdResponse.body.id).toBe(todoId);
    });


    test("User can get the list of to-do list items filtered by 'Done' status", async ({ api }, testInfo) => {
        const firstNewTodoData = new TodoBuilder().withTitle().withDoneStatus(true).withDescription().build();
        const secondNewTodoData = new TodoBuilder().withTitle().withDoneStatus(false).withDescription().build();
        let firstResponse = await api.todos.createNewTodo(testInfo, token, firstNewTodoData);
        let secondResponse = await api.todos.createNewTodo(testInfo, token, secondNewTodoData);

        let getFilteredResponse = await api.todos.getTodosFilteredByDone(testInfo, token);

        getFilteredResponse.body.todos.forEach(item => {
            expect(item).toEqual(expect.objectContaining({ doneStatus: true }));
        })
    });


    test("User can create to-do list item", async ({ api }, testInfo) => {
        const newTodoData = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();

        let createdResponse = await api.todos.createNewTodo(testInfo, token, newTodoData);
        const createdTodoBody = await createdResponse.json();

        expect(createdTodoBody.title).toBe(newTodoData.title);
    });

    test("User can change the title of the to-do list item", async ({ api }, testInfo) => {
        const newTitle = faker.company.buzzPhrase();
        const defaultTestTodoBody = await defaultTestTodoResponse.json();
        let todoId = defaultTestTodoBody.id;

        let createdNewTitleResponse = await api.todos.updateTodoTitle(testInfo, token, todoId, newTitle);
        const todoWithNewTitleBody = await createdNewTitleResponse.json();

        expect(todoWithNewTitleBody.title).toBe(newTitle);
    });

    test("User can delete a to-do list item", async ({ api }, testInfo) => {
        const defaultTestTodoBody = await defaultTestTodoResponse.json();
        let todoId = defaultTestTodoBody.id;

        await api.todos.deleteTodo(testInfo, token, todoId);
        let getDeletedTodoByIdResponse = await api.todos.getTodoById(testInfo, token, todoId);

        expect(getDeletedTodoByIdResponse.status).toBe(404);
    });
});
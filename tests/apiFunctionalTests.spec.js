// @ts-nocheck
import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';
import { TodoBuilder } from '../src/helpers/builders';

test.describe('API tests', () => {

    test("User can get specific to-do list item", async ({ authenticatedApi }, testInfo) => {
        const newTodoData = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
        const createdResponse = await authenticatedApi.todos.createNewTodo(testInfo, authenticatedApi.token, newTodoData);
        let defaultTestTodoBody = await createdResponse.json();
        let todoId = defaultTestTodoBody.id;

        let getTodoByIdResponse = await authenticatedApi.todos.getTodoById(testInfo, authenticatedApi.token, todoId);

        expect(getTodoByIdResponse.body.id).toBe(todoId);
    });

    test("User can get the list of to-do list items filtered by 'Done' status", async ({ authenticatedApi }, testInfo) => {
        const firstNewTodoData = new TodoBuilder().withTitle().withDoneStatus(true).withDescription().build();
        const secondNewTodoData = new TodoBuilder().withTitle().withDoneStatus(false).withDescription().build();
        let firstResponse = await authenticatedApi.todos.createNewTodo(testInfo, authenticatedApi.token, firstNewTodoData);
        let secondResponse = await authenticatedApi.todos.createNewTodo(testInfo, authenticatedApi.token, secondNewTodoData);

        let getFilteredResponse = await authenticatedApi.todos.getTodosFilteredByDone(testInfo, authenticatedApi.token);

        getFilteredResponse.body.todos.forEach(item => {
            expect(item).toEqual(expect.objectContaining({ doneStatus: true }));
        })
    });

    test("User can create to-do list item", async ({ authenticatedApi }, testInfo) => {
        const newTodoData = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();

        let createdResponse = await authenticatedApi.todos.createNewTodo(testInfo, authenticatedApi.token, newTodoData);
        const createdTodoBody = await createdResponse.json();

        expect(createdTodoBody.title).toBe(newTodoData.title);
    });

    test("User can change the title of the to-do list item", async ({ authenticatedApi }, testInfo) => {
        const newTitle = new TodoBuilder().withTitle().build().title;
        const newTodoData = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
        const createdResponse = await authenticatedApi.todos.createNewTodo(testInfo, authenticatedApi.token, newTodoData);
        const defaultTestTodoBody = await createdResponse.json();
        let todoId = defaultTestTodoBody.id;

        let createdNewTitleResponse = await authenticatedApi.todos.updateTodoTitle(testInfo, authenticatedApi.token, todoId, newTitle);
        const todoWithNewTitleBody = await createdNewTitleResponse.json();

        expect(todoWithNewTitleBody.title).toBe(newTitle);
    });

    test("User can delete a to-do list item", async ({ authenticatedApi }, testInfo) => {
        const newTodoData = new TodoBuilder().withTitle().withDoneStatus().withDescription().build();
        const createdResponse = await authenticatedApi.todos.createNewTodo(testInfo, authenticatedApi.token, newTodoData);
        const defaultTestTodoBody = await createdResponse.json();
        let todoId = defaultTestTodoBody.id;

        await authenticatedApi.todos.deleteTodo(testInfo, authenticatedApi.token, todoId);
        let getDeletedTodoByIdResponse = await authenticatedApi.todos.getTodoById(testInfo, authenticatedApi.token, todoId);

        expect(getDeletedTodoByIdResponse.status).toBe(404);
    });
});
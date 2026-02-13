import { test } from '@playwright/test';

export class TodosService {
    constructor(request) {
        this.request = request;
    }

    async get(testInfo, token) {
        return test.step('GET /todos', async () => {
            const response = await this.request.get(`${testInfo.project.use.apiUrl}todos`,
                {
                    headers:
                    {
                        'X-CHALLENGER': token,
                    }
                });

            const body = await response.json();
            const headers = response.headers();
            return { body, headers }
        })
    };

    async getTodoById(testInfo, token, todoId) {
        return test.step('GET /todo', async () => {
            const response = await this.request.get(`${testInfo.project.use.apiUrl}todos/${todoId}`,
                {
                    headers:
                    {
                        'X-CHALLENGER': token,
                    }
                });

            if (!response.ok()) {
                return { body: null, status: response.status() }
            };

            const body = await response.json();
            const headers = response.headers();
            const todo = body.todos[0];
            return { body: todo, status: response.status(), headers }
        })
    };

    async getTodosFilteredByDone(testInfo, token) {
        return test.step("GET /todos filtered by 'Done'", async () => {
            const response = await this.request.get(`${testInfo.project.use.apiUrl}todos?doneStatus=true`,
                {
                    headers:
                    {
                        'X-CHALLENGER': token,
                    }
                });

            const body = await response.json();
            const headers = response.headers();
            return { body, headers }
        })
    };


    async createNewTodo(testInfo, token, newTodoData) {
        return test.step('POST /todos', async () => {

            const response = await this.request.post(`${testInfo.project.use.apiUrl}todos`,
                {
                    headers:
                    {
                        'X-CHALLENGER': token,
                    },
                    data: newTodoData,
                });
            return response;
        })
    };

    async updateTodoTitle(testInfo, token, todoId, newTitle) {
        return test.step('PUT /todos/{id} change of the title', async () => {

            const response = await this.request.put(`${testInfo.project.use.apiUrl}todos/${todoId}`,
                {
                    headers:
                    {
                        'X-CHALLENGER': token,
                    },
                    data: { title: newTitle },
                });
            return response;
        })
    };

    async deleteTodo(testInfo, token, todoId) {
        return test.step('DELETE /todos/{id}', async () => {

            const response = await this.request.delete(`${testInfo.project.use.apiUrl}todos/${todoId}`,
                {
                    headers:
                    {
                        'X-CHALLENGER': token,
                    }
                });
            return response;
        })
    };
}
import Router from '@koa/router';
import { StatusCodes } from 'http-status-codes';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

export const tasksRouter = new Router({ prefix: '/boards' })

tasksRouter.get('/:boardId/tasks', async (ctx) => {
    const tasks = await TasksService.getAll();
    ctx.body = tasks.map(Task.toResponse);
});

tasksRouter.get('/:boardId/tasks/:taskId', async (ctx) => {
    try {
        const { taskId } = ctx.params;
        const task = await TasksService.getById(taskId);
        ctx.body = Task.toResponse(task);
    } catch {
        ctx.status = StatusCodes.NOT_FOUND;
    }
});

tasksRouter.post('/:boardId/tasks', async (ctx) => {
    const { boardId } = ctx.params;
    const { body } = ctx.request;
    const task = await TasksService.create(boardId, body);
    ctx.status = StatusCodes.CREATED;
    ctx.body = Task.toResponse(task);
});

tasksRouter.put('/:boardId/tasks/:taskId', async (ctx) => {
    const { taskId } = ctx.params;
    const { body } = ctx.request;
    const task = await TasksService.update(taskId, body);
    ctx.body = Task.toResponse(task);
});

tasksRouter.delete('/:boardId/tasks/:taskId', async (ctx) => {
    const { taskId } = ctx.params;
    await TasksService.delete(taskId);
    ctx.status = StatusCodes.NO_CONTENT;
});

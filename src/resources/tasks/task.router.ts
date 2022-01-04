import Router from 'koa-router';
import { StatusCodes } from 'http-status-codes';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { IRouterContext } from '../common/common.interfaces';
import { ITask } from './task.interfaces';

/**
 * Create Route to manage Task entities
 */
export const tasksRouter = new Router({ prefix: '/boards' })

/**
 * Register Route to request collection of all Task entity
 */
tasksRouter.get('/:boardId/tasks', async (ctx: IRouterContext<ITask[], ITask[]>) => {
    const tasks = await TasksService.getAll();
    ctx.body = tasks.map(Task.toResponse);
});

/**
 * Register Route to request Task entity by id
 */
tasksRouter.get('/:boardId/tasks/:taskId', async (ctx: IRouterContext<ITask, ITask>) => {
    const { taskId } = ctx.params;
    const task = await TasksService.getById(taskId);
    ctx.body = Task.toResponse(task);
});

/**
 * Register Route to create new Task entity
 */
tasksRouter.post('/:boardId/tasks', async (ctx: IRouterContext<ITask, ITask>) => {
    const { boardId } = ctx.params;
    const body = <ITask>ctx.request.body;
    const task = await TasksService.create(boardId, body);
    ctx.status = StatusCodes.CREATED;
    ctx.body = Task.toResponse(task);
});

/**
 * Register Route to update existed Task entity
 */
tasksRouter.put('/:boardId/tasks/:taskId', async (ctx: IRouterContext<ITask, ITask>) => {
    const { taskId } = ctx.params;
    const body = <ITask>ctx.request.body;
    const task = await TasksService.update(taskId, body);
    ctx.body = Task.toResponse(task);
});

/**
 * Register Route to delete existed Task entity
 */
tasksRouter.delete('/:boardId/tasks/:taskId', async (ctx) => {
    const { taskId } = ctx.params;
    await TasksService.delete(taskId);
    ctx.status = StatusCodes.NO_CONTENT;
});

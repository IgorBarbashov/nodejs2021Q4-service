import Router from 'koa-router';
import { getAllUsers } from '../users/user.repository';
import { getAllBoards } from '../boards/board.repository';
import { getAllColumns } from '../columns/column.repository';
import { getAllTasks } from '../tasks/task.repository';

/**
 * Create root Route
 */
export const rootRouter = new Router();

/**
 * Register root Route
 */
rootRouter.get('/', async (ctx) => {
    ctx.body = 'Service is running!';
});

/**
 * Register Route to watch all DB
 */
rootRouter.get('/db', async (ctx) => {
    const usersPromise = getAllUsers();
    const boardsPromise = getAllBoards();
    const columnsPromise = getAllColumns();
    const tasksPromise = getAllTasks();
    const [ users, boards, columns, tasks ] = await Promise.all([usersPromise, boardsPromise, columnsPromise, tasksPromise]);
    ctx.body = { users, boards, columns, tasks };
});

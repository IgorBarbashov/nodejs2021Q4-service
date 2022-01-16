import Router from 'koa-router';
import { getAllUsers } from '../users/user.repository';
import { boardsRepository } from '../boards/board.memory.repository';
import { columnsRepository } from '../columns/column.memory.repository';
import { tasksRepository } from '../tasks/task.memory.repository';
import { IUserBD } from '../users/user.interfaces';
import { IBoardBD } from '../boards/board.interfaces';
import { IColumnBD } from '../columns/column.interfaces';
import { ITaskBD } from '../tasks/task.interfaces';

type EntityBd = IUserBD | IBoardBD | IColumnBD | ITaskBD;

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
    const mapToObj = (map: EntityBd) => [...map.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const users = await getAllUsers();
    const boards = await boardsRepository.getAll();
    const columns = await columnsRepository.getAll();
    const tasks = await tasksRepository.getAll();
    const state = {
        users,
        boards: mapToObj(boards),
        columns: mapToObj(columns),
        tasks: mapToObj(tasks)
    };
    ctx.body = state;
});

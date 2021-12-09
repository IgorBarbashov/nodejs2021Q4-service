import Router from '@koa/router';
import { usersRepository } from '../users/user.memory.repository';
import { boardsRepository } from '../boards/board.memory.repository';
import { columnsRepository } from '../columns/column.memory.repository';
import { tasksRepository } from '../tasks/task.memory.repository';

export const rootRouter = new Router();

rootRouter.get('/', async (ctx) => {
    ctx.body = 'Service is running!';
});

rootRouter.get('/db', async (ctx) => {
    const mapToObj = map => [...map.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const users = await usersRepository.getAll();
    const boards = await boardsRepository.getAll();
    const columns = await columnsRepository.getAll();
    const tasks = await tasksRepository.getAll();
    const state = {
        users: mapToObj(users),
        boards: mapToObj(boards),
        columns: mapToObj(columns),
        tasks: mapToObj(tasks)
    };
    ctx.body = state;
});

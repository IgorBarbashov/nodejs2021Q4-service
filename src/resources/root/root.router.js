const Router = require('@koa/router');
const { usersRepository } = require('../users/user.memory.repository');
const { boardsRepository } = require('../boards/board.memory.repository');
const { columnsRepository } = require('../columns/column.memory.repository');

const rootRouter = new Router();

rootRouter.get('/', async (ctx) => {
    ctx.body = 'Service is running!';
});

rootRouter.get('/db', async (ctx) => {
    const mapToObj = map => [...map.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const users = await usersRepository.getAll();
    const boards = await boardsRepository.getAll();
    const columns = await columnsRepository.getAll()
    const state = {
        users: mapToObj(users),
        boards: mapToObj(boards),
        columns: mapToObj(columns)
    };
    ctx.body = state;
});

module.exports = {
    rootRouter
};

const Router = require('@koa/router');
const { StatusCodes } = require('http-status-codes');
const { User } = require('./user.model');
const { UsersService } = require('./user.service');

const usersRouter = new Router({ prefix: '/users' })

usersRouter.get('/', async (ctx) => {
    const users = await UsersService.getAll();
    ctx.body = users.map(User.toResponse);
});

usersRouter.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    const user = await UsersService.getById(id);
    ctx.body = User.toResponse(user);
});

usersRouter.post('/', async (ctx) => {
    const { body } = ctx.request;
    const user = await UsersService.create(body);
    ctx.status = StatusCodes.CREATED;
    ctx.body = User.toResponse(user);
});

usersRouter.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { body } = ctx.request;
    const user = await UsersService.update(id, body);
    ctx.body = User.toResponse(user);
});

usersRouter.delete('/:id', async (ctx) => {
    const { id } = ctx.params;
    await UsersService.delete(id);
    ctx.status = StatusCodes.NO_CONTENT;
});

module.exports = {
    usersRouter
};

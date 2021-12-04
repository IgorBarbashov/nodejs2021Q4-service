const Router = require('@koa/router');
const User = require('./user.model');
const usersService = require('./user.service');

const usersRouter = new Router({ prefix: '/users' })

usersRouter.get('/', async (ctx) => {
    const users = await usersService.getAll();
    ctx.body = (users.map(User.toResponse));
});

module.exports = {
    usersRouter
};

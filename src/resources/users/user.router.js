const Router = require('@koa/router');

const usersRouter = new Router({ prefix: '/users' })

usersRouter.get('/', async (ctx) => {
    ctx.body = 'Welcome to Users Router';
});

module.exports = {
    usersRouter
};

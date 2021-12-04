const Router = require('@koa/router');

const rootRouter = new Router();

rootRouter.get('/', async (ctx) => {
    ctx.body = 'Welcome to Root Router';
});

module.exports = {
    rootRouter
};

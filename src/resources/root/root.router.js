const Router = require('@koa/router');

const rootRouter = new Router();

rootRouter.get('/', async (ctx) => {
    ctx.body = 'Service is running!';
});

module.exports = {
    rootRouter
};

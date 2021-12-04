const Koa = require('koa');
const { rootRouter } = require('./resources/root/root.router');

const app = new Koa();

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

module.exports = app;

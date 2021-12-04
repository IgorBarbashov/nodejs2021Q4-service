const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { rootRouter } = require('./resources/root/root.router');
const { usersRouter } = require('./resources/users/user.router');

const app = new Koa();

app.use(bodyParser());

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

module.exports = app;

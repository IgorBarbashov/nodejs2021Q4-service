const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { rootRouter } = require('./resources/root/root.router');
const { usersRouter } = require('./resources/users/user.router');
const { docRouter } = require('./resources/doc/doc.router');

const app = new Koa();

app.use(bodyParser());

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.use(docRouter.routes());
app.use(docRouter.allowedMethods());

module.exports = app;

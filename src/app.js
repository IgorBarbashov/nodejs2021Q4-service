const Koa = require('koa');

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Service is running!';
});

module.exports = app;

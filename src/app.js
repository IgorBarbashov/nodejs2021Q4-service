const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { router } = require('./resources');

const app = new Koa();

app.use(bodyParser());
app.use(router());

module.exports = {
    app
};

const combineRouters = require('koa-combine-routers')
const { rootRouter } = require('./root/root.router');
const { usersRouter } = require('./users/user.router');
const { docRouter } = require('./doc/doc.router');

const router = combineRouters(
  rootRouter,
  docRouter,
  usersRouter
);

module.exports = {
    router
};

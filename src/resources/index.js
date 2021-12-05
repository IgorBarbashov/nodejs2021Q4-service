const combineRouters = require('koa-combine-routers')
const { rootRouter } = require('./root/root.router');
const { docRouter } = require('./doc/doc.router');
const { usersRouter } = require('./users/user.router');
const { boardsRouter } = require('./boards/board.router');
const { tasksRouter } = require('./tasks/task.router');

const router = combineRouters(
  rootRouter,
  docRouter,
  usersRouter,
  boardsRouter,
  tasksRouter
);

module.exports = {
    router
};

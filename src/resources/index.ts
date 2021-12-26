import combineRouters from 'koa-combine-routers';
import { rootRouter } from './root/root.router';
import { docRouter } from './doc/doc.router';
import { usersRouter } from './users/user.router';
import { boardsRouter } from './boards/board.router';
import { tasksRouter } from './tasks/task.router';

/**
 * Utility function to combine all routers
 */
export const router = combineRouters(
  rootRouter,
  docRouter,
  usersRouter,
  boardsRouter,
  tasksRouter
);

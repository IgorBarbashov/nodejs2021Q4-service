import { winstonLogger } from './logger';
import { PORT } from './common/config';
import { app } from './app';
import { dbConnection } from './dbConnection';
import { LOGGING_LEVELS } from './constants/index';

/**
 * Set connection to DB and start REST service on the defined PORT
 */
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      winstonLogger.log(LOGGING_LEVELS.NAME.info, `App is running on http://localhost:${PORT}`);
    });
  })
  .catch((e: Error) => {
    winstonLogger.log(LOGGING_LEVELS.NAME.error, e.message);
    setTimeout(() => {
      process.exit(1);
  }, 100);
  });

/**
 * Register Uncaught Exception handler which used to log and restart docker image
 */
 process.on('uncaughtException', (e: Error) => {
  winstonLogger.log(LOGGING_LEVELS.NAME.error, `Uncaught Exception: ${e.message}`);
  setTimeout(() => {
      process.exit(1);
  }, 100);
});

/**
* Register Unhandled Rejection handler which used to log and restart docker image
*/
process.on('unhandledRejection', (e: string) => {
  winstonLogger.log(LOGGING_LEVELS.NAME.error, `Unhandled Rejection: ${e}`);
  setTimeout(() => {
      process.exit(1);
  }, 100);
});

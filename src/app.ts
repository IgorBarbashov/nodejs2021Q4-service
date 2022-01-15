import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logger, winstonLogger } from './logger';
import { customErrorHandler } from './errors/customErrorHandler';
import { router } from './resources';
import { LOGGING_LEVELS } from './constants/index';

/**
 * Create HTTP-server
 */
export const app = new Koa();

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

/**
 * Register bodyParser middleware
 */
app.use(bodyParser());

/**
 * Register logger middleware
 */
app.use(logger);

/**
 * Register standard Repository layer errors handler (entity not found, entity already exists e.t.c.)
 */
app.use(customErrorHandler);

/**
 * Register router middleware
 */
app.use(router());

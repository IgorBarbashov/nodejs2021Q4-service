import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logger } from './logger';
import { customErrorHandler } from './errors/customErrorHandler';
import { router } from './resources';

/**
 * Create HTTP-server
 */
export const app = new Koa();

/**
 * Register Uncaught Exception handler which used to restart docker image
 */
 process.on('uncaughtException', () => {
    setTimeout(() => {
        process.exit(1)
    }, 100);
});

/**
 * Register Unhandled Rejection handler which used to restart docker image
 */
 process.on('unhandledRejection', () => {
    setTimeout(() => {
        process.exit(1)
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

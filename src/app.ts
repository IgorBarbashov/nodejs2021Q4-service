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
 * Register Uncaught Exception and Unhandled Rejection handlers
 * which are should be used to restart docker image
 */
process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));

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

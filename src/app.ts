import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logger } from './logger';
import { customErrorHandler } from './errors/customErrorHandler';
import { auth } from './auth';
import { router } from './resources';

/**
 * Create HTTP-server
 */
export const app = new Koa();

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
 * Register authentication middleware
 */
 app.use(auth);

/**
 * Register router middleware
 */
app.use(router());

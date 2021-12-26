import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logger } from './logger';
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
 * Register router middleware
 */
app.use(router());

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
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
 * Register router middleware
 */
app.use(router());

import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';
import path from 'path';
import yamljs from 'yamljs';

/**
 * Create Doc Route
 */
export const docRouter = new Router({ prefix: '/doc' });
const spec = yamljs.load(path.join(__dirname, '../../../doc/api.yaml'));

/**
 * Register Route to watch Swagger documentation
 */
docRouter.get('/', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));
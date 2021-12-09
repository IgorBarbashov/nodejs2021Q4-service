const Router = require('@koa/router');
const { koaSwagger } = require('koa2-swagger-ui');
const path = require('path');
const yamljs = require('yamljs');

const docRouter = new Router({ prefix: '/doc' });
const spec = yamljs.load(path.join(__dirname, '../../../doc/api.yaml'));

docRouter.get('/', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

module.exports = {
    docRouter
};

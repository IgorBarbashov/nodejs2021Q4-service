import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router } from './resources';

export const app = new Koa();

app.use(bodyParser());
app.use(router());

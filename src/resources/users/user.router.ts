import Router from 'koa-router';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from './user.service';
import { IUser, IUserResponseContext, IAllUserResponseContext } from './user.interfaces';

export const usersRouter = new Router({ prefix: '/users' })

usersRouter.get('/', async (ctx: IAllUserResponseContext) => {
    const users = await UsersService.getAll();
    ctx.body = users;
});

usersRouter.get('/:id', async (ctx: Router.IRouterParamContext & IUserResponseContext) => {
    const { id } = ctx.params;
    const user = await UsersService.getById(id);
    ctx.body = user;
});

usersRouter.post('/', async (ctx: IUserResponseContext) => {
    const body = <IUser>ctx.request.body;
    const user = await UsersService.create(body);
    ctx.status = StatusCodes.CREATED;
    ctx.body = user;
});

usersRouter.put('/:id', async (ctx: Router.IRouterParamContext & IUserResponseContext) => {
    const { id } = ctx.params;
    const body = <IUser>ctx.request.body;
    const user = await UsersService.update(id, body);
    ctx.body = user;
});

usersRouter.delete('/:id', async (ctx) => {
    const { id } = ctx.params;
    await UsersService.delete(id);
    ctx.status = StatusCodes.NO_CONTENT;
});

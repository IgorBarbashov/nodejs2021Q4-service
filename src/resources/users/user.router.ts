import Router from 'koa-router';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from './user.service';
import { IUser, IUserResponseContext, IAllUserResponseContext } from './user.interfaces';

/**
 * Create Route to manage User entities
 * 
 * @param Object - Object that describe prefix of URL to manage User entities
 * @returns new Router entity to manage User entities
 */
export const usersRouter = new Router({ prefix: '/users' })

/**
 * Register Route to request collection of all User entity
 */
usersRouter.get('/', async (ctx: IAllUserResponseContext) => {
    const users = await UsersService.getAll();
    ctx.body = users;
});

/**
 * Register Route to request User entity by id
 */
usersRouter.get('/:id', async (ctx: Router.IRouterParamContext & IUserResponseContext) => {
    const { id } = ctx.params;
    const user = await UsersService.getById(id);
    ctx.body = user;
});

/**
 * Register Route to create new User entity
 */
usersRouter.post('/', async (ctx: IUserResponseContext) => {
    const body = <IUser>ctx.request.body;
    const user = await UsersService.create(body);
    ctx.status = StatusCodes.CREATED;
    ctx.body = user;
});

/**
 * Register Route to update existed User entity
 */
usersRouter.put('/:id', async (ctx: Router.IRouterParamContext & IUserResponseContext) => {
    const { id } = ctx.params;
    const body = <IUser>ctx.request.body;
    const user = await UsersService.update(id, body);
    ctx.body = user;
});

/**
 * Register Route to delete existed User entity
 */
usersRouter.delete('/:id', async (ctx) => {
    const { id } = ctx.params;
    await UsersService.delete(id);
    ctx.status = StatusCodes.NO_CONTENT;
});

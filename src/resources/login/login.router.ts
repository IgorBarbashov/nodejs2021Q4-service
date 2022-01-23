import Router from 'koa-router';
import { LoginService } from './login.service';
import { ILogin, ILoginResponse } from './login.interfaces';
import { IRouterContext } from '../common/common.interfaces';

/**
 * Create Route to authorize users
 */
export const loginRouter = new Router({ prefix: '/login' })

/**
 * Register Route to authorize users
 */
 loginRouter.post('/', async (ctx: IRouterContext<ILogin[], ILoginResponse>) => {
    const body = <ILogin>ctx.request.body;
    const jwtToken = await LoginService.authorizeUser(body);
    ctx.body = { token: jwtToken };
});

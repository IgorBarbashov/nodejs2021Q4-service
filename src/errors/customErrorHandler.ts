import { Context, Next } from 'koa';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFoundError, EntityExistsError, ForbiddenError } from './customErrors';
 
export const customErrorHandler = async (ctx: Context, next: Next): Promise<void> => {
    try {
        await next();
    } catch (err) {
        if (err instanceof EntityNotFoundError) {
            ctx.body = err.message;
            ctx.status = StatusCodes.NOT_FOUND;
        } else if (err instanceof EntityExistsError) {
            ctx.body = err.message;
            ctx.status = StatusCodes.BAD_REQUEST;
        } else if (err instanceof ForbiddenError) {
            ctx.body = err.message;
            ctx.status = StatusCodes.FORBIDDEN;
        } else {
            throw err;
        }
    }
};

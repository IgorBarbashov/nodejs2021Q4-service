import { Request, Context } from 'koa'
import Router from 'koa-router';

interface ParameterizedEntityRequest<T> extends Request {
    body?: T;
}

interface EntityRequestContext<T> {
    request: ParameterizedEntityRequest<T>;
}

interface EntityResponseContext<T> extends Context {
    body: T;
}

export type IRouterContext<Q, P> =
    & Router.IRouterParamContext
    & EntityRequestContext<Q>
    & EntityResponseContext<P>;

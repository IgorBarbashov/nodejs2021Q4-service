import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { pathsWithoutAuth, authHeader, authMethod } from '../common/authConfig';
import { UnauthorizedError } from '../errors/customErrors';
import { REPOSITORY_ERROR_MESSAGES } from '../constants';

export const auth = async (ctx: Context, next: Next) => {
  const { path, header } = ctx;
  const authHeaderValue = header[authHeader] || '';
  const [method = '', token = ''] = authHeaderValue.split(' ');
  const isPathWithoutAuth = pathsWithoutAuth.includes(path);

  if (isPathWithoutAuth) {
    await next();
    return;
  }

  if (!header[authHeader]) {
    throw new UnauthorizedError(`${REPOSITORY_ERROR_MESSAGES.AUTH.INVALID_HEADER}`);
  }

  if (method !== authMethod) {
    throw new UnauthorizedError(`${REPOSITORY_ERROR_MESSAGES.AUTH.INVALID_SCHEME}`);
  }
  
  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch(err) {
    throw new UnauthorizedError(`${REPOSITORY_ERROR_MESSAGES.AUTH.INVALID_TOKEN}`);
  }

  await next();
};

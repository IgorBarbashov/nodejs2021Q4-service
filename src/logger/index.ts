import winston from 'winston';
import { Context, Request, Next } from 'koa';

interface IRequestWithBody extends Request {
  body?: Record<string, unknown>;
}

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: './logs/common.log' })
  ],
});

export const logger = async (ctx: Context, next: Next) => {
  const { request } = ctx;
  const { method, url, body = {} } = request as IRequestWithBody;

  const start = (new Date).toLocaleString();
  const [path, queryParameters] = url.split('?');
  const urlLog = `url=${path};`;
  const queryParametersLog = `${queryParameters ? ` query='${queryParameters}';` : ''}`;
  const bodyLog = Object.entries(body).length ? ` body=${JSON.stringify(body)}` : '';
  winstonLogger.info(`${start} - ${method} ${urlLog}${queryParametersLog}${bodyLog}`);

  next();
};

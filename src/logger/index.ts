import winston from 'winston';
import { Context, Request, BaseResponse, Next } from 'koa';

interface IRequestWithBody extends Request {
  body?: Record<string, unknown>;
}

interface IResponseWithBody extends BaseResponse {
  body: Record<string, unknown>;
}

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: './logs/common.log' })
  ],
});

export const logger = async (ctx: Context, next: Next) => {
  const { request, response } = ctx;
  
  const { method, url, body: requestBody = {} } = request as IRequestWithBody;
  const requestDate = Date.now();
  const requestDateLog = (new Date(requestDate)).toLocaleString();
  const [path, queryParameters] = url.split('?');
  const urlLog = `url=${path};`;
  const queryParametersLog = `${queryParameters ? ` query='${queryParameters}';` : ''}`;
  const requestBodyLog = Object.entries(requestBody).length ? ` body=${JSON.stringify(requestBody)}` : '';
  winstonLogger.info(`${requestDateLog} request - ${method} ${urlLog}${queryParametersLog}${requestBodyLog}`);

  await next();
  const { status, message, body: responseBody = {} } = response as IResponseWithBody;
  const responseDate = Date.now();
  const responseDateLog = (new Date(responseDate)).toLocaleString();
  const msLog = `[${responseDate - requestDate}ms]`;
  const responseBodyLog = Object.entries(responseBody).length ? ` body=${JSON.stringify(responseBody)}` : '';
  winstonLogger.info(`${responseDateLog} response - ${msLog} '${status} ${message}'${responseBodyLog}`);
};

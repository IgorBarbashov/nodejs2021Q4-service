import winston from 'winston';
import { StatusCodes } from 'http-status-codes';
import { Context, Request, BaseResponse, Next } from 'koa';
import { EVENTS } from '../constants/index';

interface IRequestWithBody extends Request {
  body?: Record<string, unknown>;
}

interface IResponseWithBody extends BaseResponse {
  body: Record<string, unknown>;
}

const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple(), handleExceptions: true }),
    new winston.transports.File({ level:'info', filename: './logs/common.log', handleExceptions: true }),
    new winston.transports.File({ level:'error', filename: './logs/error.log', handleExceptions: true })
  ],
  exitOnError: true
});

const requestLogger = (request: IRequestWithBody): number => {
  const { method, url, body: requestBody = {} } = request;
  const requestDate = Date.now();
  const requestDateLog = (new Date(requestDate)).toLocaleString();
  const [path, queryParameters] = url.split('?');
  const urlLog = `url=${path};`;
  const queryParametersLog = `${queryParameters ? ` query='${queryParameters}';` : ''}`;
  const requestBodyLog = Object.entries(requestBody).length || Array.isArray(requestBody) ? ` body=${JSON.stringify(requestBody)}` : '';
  winstonLogger.info(`${requestDateLog} request - ${method} ${urlLog}${queryParametersLog}${requestBodyLog}`);
  return requestDate;
};

const responseLogger = (response: IResponseWithBody, requestDate: number): void => {
  const { status, message, body: responseBody = {} } = response;
  const responseDate = Date.now();
  const responseDateLog = (new Date(responseDate)).toLocaleString();
  const msLog = `[${responseDate - requestDate}ms]`;
  const responseBodyLog = Object.entries(responseBody).length || Array.isArray(responseBody) ? ` body=${JSON.stringify(responseBody)}` : '';
  winstonLogger.info(`${responseDateLog} response - ${msLog} '${status} ${message}'${responseBodyLog}`);
};

const errorLogger = (err: Error) => {
  winstonLogger.error(err.message);
};

export const logger = async (ctx: Context, next: Next) => {
  const { request, response } = ctx;
  const requestDate = requestLogger(request);
  try {
    await next();
    responseLogger(response as IResponseWithBody, requestDate);
  } catch (err) {
    errorLogger(err as Error);
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.app.emit(EVENTS.ERROR, err, ctx);
  }
};

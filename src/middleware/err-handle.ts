import { Logger } from 'pino'
import { Context } from 'koa'
import { HttpError, ServiceError } from '@lib/error'

interface IHttpStatusMap {
  [key: number]: number
}

const httpStatusMap: IHttpStatusMap = {
  10000: 500,
  20000: 404,
  30000: 400,
  30002: 401,
  30003: 403
}

export const errorHandler = (logger: Logger) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (error) {
      logger.error('Error Handler:', error)
      if (error instanceof HttpError || error instanceof ServiceError) {
        ctx.body = error.getErrorInfo()
        ctx.status = error instanceof HttpError ? (httpStatusMap[error.code] ? httpStatusMap[error.code] : 500) : 200
      } else {
        ctx.status = 500
        ctx.body = {
          msg: 'unknown error'
        }
      }
    }
  }
}

'use strict'

import * as Koa from 'koa'
import * as Kcors from 'kcors'
import * as helmet from 'koa-helmet'
import * as pino from 'pino'
import * as middlewares from './middleware'

const app = new Koa()
const logger = pino({
  prettyPrint: {
    timeTransOnly: true
  }
})

// koa-helmet
app.use(helmet())

// cors
app.use(Kcors())

// response logger in x-response-time
app.use(middlewares.logResponse())

// request logger
app.use(middlewares.logRequest(logger))

// error handler
app.use(middlewares.errorHandler(logger))

// globale error
app.on('error', (err: any, ctx: Koa.Context) => {
  logger.error(`walle server error!`, err)
})

// listener
app.listen('1234', () => {
  logger.info('walle server start! 🚀')
})

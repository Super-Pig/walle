import { Context } from 'koa'

export const logResponse = () => async (ctx: Context, next: () => Promise<any>) => {
  const start = Date.now()

  await next()

  ctx.set('X-Response-Time', (Date.now() - start).toString())
}

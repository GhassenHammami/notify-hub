import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CleanSessionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const output = await next()
    const isInertia = ctx.request.header('X-Inertia')
    const hasErrors = ctx.session.responseFlashMessages.has('errors')
    if (isInertia && hasErrors) {
      ctx.session.flashOnly(['errors', 'errorsBag', 'inputErrorsBag'])
    }
    return output
  }
}

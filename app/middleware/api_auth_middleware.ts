import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import Project from '#models/project'

export default class ApiAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const apiKey =
      ctx.request.header('X-API-Key') || ctx.request.header('Authorization')?.replace('Bearer ', '')

    if (!apiKey) {
      return ctx.response.status(401).json({
        error: 'API key is required',
        message: 'Please provide your API key in the X-API-Key header or Authorization header',
      })
    }

    const project = await Project.query().where('apiKey', apiKey).first()

    if (!project) {
      return ctx.response.status(401).json({
        error: 'Invalid API key',
        message: 'The provided project API key is invalid.',
      })
    }

    if (!project.isActive) {
      return ctx.response.status(403).json({
        error: 'Project not active',
        message: 'This project is currently inactive. Please activate it and try again.',
      })
    }

    ctx.request.updateBody({
      ...ctx.request.body(),
      projectId: project.id,
    })

    ctx.request.updateQs({
      ...ctx.request.qs(),
      projectId: project.id,
    })

    ctx.project = project

    await next()
  }
}

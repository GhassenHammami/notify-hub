import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

export default class SilentProjectMiddleware {
  async handle({ session, auth }: HttpContext, next: () => Promise<void>) {
    const currentProject = session.get('current_project')

    if (currentProject) {
      try {
        const user = auth.user
        if (!user) {
          session.forget('current_project')
        } else {
          const project = await Project.query()
            .where('id', currentProject.id)
            .where('userId', user.id)
            .first()

          if (!project) {
            session.forget('current_project')
          }
        }
      } catch (error) {
        session.forget('current_project')
      }
    }
    await next()
  }
}

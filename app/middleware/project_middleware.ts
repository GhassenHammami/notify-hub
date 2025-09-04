import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'

export default class ProjectMiddleware {
  async handle({ session, response, auth }: HttpContext, next: () => Promise<void>) {
    let currentProject = session.get('current_project')

    if (!currentProject) {
      const user = auth.user
      if (!user) {
        session.flash('error', 'You must be logged in to access project resources.')
        return response.redirect().toRoute('auth.login')
      }

      const defaultProject = await Project.getDefaultProject(user.id)
      if (defaultProject) {
        session.put('current_project', defaultProject)
        currentProject = defaultProject
      } else {
        session.flash('error', 'Please select a project to view its resources.')
        return response.redirect().toRoute('projects.index')
      }
    }

    try {
      const user = auth.user
      if (!user) {
        session.flash('error', 'You must be logged in to access project resources.')
        return response.redirect().toRoute('auth.login')
      }

      const project = await Project.query()
        .where('id', currentProject?.id)
        .where('userId', user.id)
        .first()

      if (!project) {
        session.flash('error', 'Project not found or you do not have access to it.')
        session.forget('current_project')
        return response.redirect().toRoute('projects.index')
      }
      await next()
    } catch (error) {
      session.flash('error', 'An error occurred while validating your project access.')
      return response.redirect().toRoute('projects.index')
    }
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { nanoid } from 'nanoid'

export default class ProjectsController {
  async index({ inertia, auth }: HttpContext) {
    const projects = await Project.query()
      .where('user_id', auth.user!.id)
      .withCount('notifications')
      .orderBy('created_at', 'desc')

    const projectsWithCounts = projects.map((project) => ({
      ...project.toJSON(),
      notificationsCount: project.$extras.notifications_count,
    }))

    return inertia.render('projects/index', { projects: projectsWithCounts })
  }

  async show({ inertia, auth, params }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .withCount('notifications')
      .firstOrFail()

    const projectWithCount = {
      ...project.toJSON(),
      notificationsCount: project.$extras.notifications_count,
    }

    return inertia.render('projects/show', { project: projectWithCount })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('projects/create')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { name } = request.only(['name'])

    let apiKey: string = ''
    let isUnique = false

    while (!isUnique) {
      apiKey = nanoid(32)
      const existingProject = await Project.query().where('api_key', apiKey).first()
      if (!existingProject) {
        isUnique = true
      }
    }

    const project = await Project.create({
      name,
      apiKey: apiKey!,
      userId: auth.user!.id,
    })

    session.flash('success', `Project "${name}" has been created successfully!`)

    return response.redirect().toRoute('projects.show', { id: project.id })
  }

  async update({ request, response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    const { name } = request.only(['name'])

    project.name = name
    await project.save()

    session.flash('success', `Project name updated to "${name}" successfully!`)

    return response.redirect().toRoute('projects.show', { id: project.id })
  }

  async destroy({ response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    const projectName = project.name
    await project.delete()

    session.flash('success', `Project "${projectName}" has been deleted successfully!`)

    return response.redirect().toRoute('projects.index')
  }

  async regenerateApiKey({ response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    let apiKey: string = ''
    let isUnique = false

    while (!isUnique) {
      apiKey = nanoid(32)
      const existingProject = await Project.query().where('api_key', apiKey).first()
      if (!existingProject) {
        isUnique = true
      }
    }

    project.apiKey = apiKey
    await project.save()

    session.flash(
      'success',
      `API key for project "${project.name}" has been regenerated successfully!`
    )

    return response.redirect().toRoute('projects.show', { id: project.id })
  }
}

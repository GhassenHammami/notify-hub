import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { nanoid } from 'nanoid'
import { createProjectValidator, updateProjectValidator } from '#validators/project_validator'

export default class ProjectsController {
  async index({ inertia, auth }: HttpContext) {
    const projects = await Project.query()
      .where('userId', auth.user!.id)
      .orderBy('isDefault', 'desc')
      .orderBy('createdAt', 'desc')
      .select('id', 'name', 'apiKey', 'createdAt', 'updatedAt', 'isActive', 'isDefault')
    return inertia.render('projects/index', { projects })
  }

  async show({ inertia, auth, params }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('userId', auth.user!.id)
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
    const data = await request.validateUsing(createProjectValidator)

    let apiKey: string = ''
    let isUnique = false

    while (!isUnique) {
      apiKey = nanoid(32)
      const existingProject = await Project.query().where('apiKey', apiKey).first()
      if (!existingProject) {
        isUnique = true
      }
    }

    const project = await Project.create({
      name: data.name,
      apiKey: apiKey!,
      userId: auth.user!.id,
      isActive: true,
    })

    session.flash('success', `Project "${data.name}" has been created successfully!`)

    return response.redirect().toRoute('projects.show', { id: project.id })
  }

  async update({ request, response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('userId', auth.user!.id)
      .firstOrFail()

    const data = await request.validateUsing(updateProjectValidator)

    project.name = data.name
    await project.save()

    session.flash('success', `Project name updated to "${data.name}" successfully!`)

    return response.redirect().toRoute('projects.show', { id: project.id })
  }

  async destroy({ response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('userId', auth.user!.id)
      .firstOrFail()

    const projectName = project.name
    await project.delete()

    session.forget('current_project')
    session.flash('success', `Project "${projectName}" has been deleted successfully!`)

    return response.redirect().toRoute('projects.index')
  }

  async regenerateApiKey({ response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('userId', auth.user!.id)
      .firstOrFail()

    let apiKey: string = ''
    let isUnique = false

    while (!isUnique) {
      apiKey = nanoid(32)
      const existingProject = await Project.query().where('apiKey', apiKey).first()
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

  async switch({ request, response, auth, session }: HttpContext) {
    const { projectId } = request.only(['projectId'])

    const project = await Project.query()
      .where('id', projectId)
      .where('userId', auth.user!.id)
      .firstOrFail()

    session.put('current_project', project)

    session.flash('success', `Switched to project "${project.name}"`)

    return response.redirect().back()
  }

  async toggleActive({ response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('userId', auth.user!.id)
      .firstOrFail()

    project.isActive = !project.isActive
    await project.save()
    session.put('current_project', project)

    const status = project.isActive ? 'activated' : 'deactivated'
    session.flash('success', `Project "${project.name}" has been ${status} successfully!`)

    return response.redirect().back()
  }

  async setAsDefault({ response, auth, params, session }: HttpContext) {
    const project = await Project.query()
      .where('id', params.id)
      .where('userId', auth.user!.id)
      .firstOrFail()

    await Project.setAsDefault(project.id, auth.user!.id)

    session.flash('success', `Project "${project.name}" has been set as your default project!`)

    return response.redirect().back()
  }

  async unsetDefault({ response, auth, session }: HttpContext) {
    await Project.unsetDefault(auth.user!.id)

    session.flash('success', 'Default project has been unset successfully!')

    return response.redirect().back()
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import Template from '#models/template'
import Project from '#models/project'
import Notification from '#models/notification'
import Channel from '../enums/channel.js'

export default class TemplatesController {
  async index({ inertia, session, request }: HttpContext) {
    const currentProject = session.get('current_project') as Project
    const {
      channel,
      notification: notificationId,
      time,
    } = request.only(['channel', 'notification', 'time'])

    let query = Template.query()
      .join('notifications', 'templates.notification_id', 'notifications.id')
      .where('notifications.project_id', currentProject?.id)
      .select('templates.*', 'notifications.title as notification_title')
      .orderBy('templates.created_at', 'desc')

    if (channel && Object.values(Channel).includes(channel)) {
      query = query.where('templates.channel', channel)
    }

    if (notificationId) {
      query = query.where('templates.notification_id', notificationId)
    }

    if (time) {
      const now = new Date()
      switch (time) {
        case 'today':
          query = query.where('templates.created_at', '>=', now.toISOString().split('T')[0])
          break
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          query = query.where('templates.created_at', '>=', weekAgo.toISOString())
          break
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          query = query.where('templates.created_at', '>=', monthAgo.toISOString())
          break
      }
    }

    const templates = await query
    const transformedTemplates = templates.map((template) => ({
      id: template.id,
      channel: template.channel,
      content: template.content,
      notificationTitle: template.$extras.notification_title,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    }))

    const notifications = await Notification.query()
      .where('project_id', currentProject?.id)
      .select('id', 'title')
      .orderBy('title')

    return inertia.render('templates/index', {
      templates: transformedTemplates,
      notifications,
      filters: { channel, notification: notificationId, time },
    })
  }

  async create({ inertia, session, request }: HttpContext) {
    const currentProject = session.get('current_project') as Project
    const { notification: notificationId } = request.only(['notification'])

    const notifications = await Notification.query()
      .where('project_id', currentProject?.id)
      .select('id', 'title')
      .orderBy('title')

    const selectedNotification = notificationId
      ? notifications.find((n) => n.id.toString() === notificationId)
      : null

    const existingTemplates = await Template.query()
      .join('notifications', 'templates.notification_id', 'notifications.id')
      .where('notifications.project_id', currentProject?.id)
      .select('templates.id', 'templates.channel', 'templates.notification_id')

    return inertia.render('templates/create', {
      notifications,
      selectedNotification,
      existingTemplates,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const data = request.only(['notification_id', 'channel', 'content'])

    if (!data.notification_id || !data.channel || !data.content) {
      session.flash('error', 'Please fill in all required fields.')
      return response.redirect().back()
    }

    const notification = await Notification.query()
      .where('id', data.notification_id)
      .where('project_id', currentProject.id)
      .first()

    if (!notification) {
      session.flash('error', 'Notification not found or you do not have access to it.')
      return response.redirect().back()
    }

    const existingTemplate = await Template.query()
      .where('notification_id', data.notification_id)
      .where('channel', data.channel)
      .first()

    if (existingTemplate) {
      session.flash(
        'error',
        `A ${data.channel.toLowerCase()} template already exists for this notification.`
      )
      return response.redirect().back()
    }

    await Template.create({
      notificationId: data.notification_id,
      channel: data.channel,
      content: data.content,
    })

    session.flash('success', `${data.channel} template created successfully!`)
    return response.redirect().toPath('/templates')
  }

  async show({ inertia, params, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const template = await Template.query()
      .join('notifications', 'templates.notification_id', 'notifications.id')
      .where('notifications.project_id', currentProject?.id)
      .where('templates.id', params.id)
      .select('templates.*', 'notifications.title as notification_title')
      .firstOrFail()

    const templateData = {
      id: template.id,
      notificationId: template.notificationId,
      channel: template.channel,
      content: template.content,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
      notification: {
        id: template.notificationId,
        title: template.$extras.notification_title,
      },
    }

    return inertia.render('templates/show', {
      template: templateData,
    })
  }

  async edit({ inertia, params, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const template = await Template.query()
      .join('notifications', 'templates.notification_id', 'notifications.id')
      .where('notifications.project_id', currentProject?.id)
      .where('templates.id', params.id)
      .select('templates.*', 'notifications.title as notification_title')
      .firstOrFail()

    const templateData = {
      id: template.id,
      notificationId: template.notificationId,
      channel: template.channel,
      content: template.content,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
      notification: {
        title: template.$extras.notification_title,
      },
    }

    return inertia.render('templates/edit', {
      template: templateData,
    })
  }

  async update({ request, response, params, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const template = await Template.query()
      .where('id', params.id)
      .preload('notification', (notificationQuery) => {
        notificationQuery.where('project_id', currentProject?.id)
      })
      .firstOrFail()

    const data = request.only(['content'])

    if (!data.content || data.content.trim() === '') {
      session.flash('error', 'Template content is required.')
      return response.redirect().back()
    }

    template.content = data.content.trim()
    await template.save()

    session.flash('success', `${template.channel} template updated successfully!`)
    return response.redirect().toPath('/templates')
  }

  async destroy({ response, params, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const template = await Template.query()
      .where('id', params.id)
      .preload('notification', (query) => {
        query.where('project_id', currentProject?.id)
      })
      .firstOrFail()

    const templateChannel = template.channel
    await template.delete()

    session.flash('success', `${templateChannel} template deleted successfully!`)
    return response.redirect().toPath('/templates')
  }
}

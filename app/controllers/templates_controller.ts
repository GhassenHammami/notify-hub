import type { HttpContext } from '@adonisjs/core/http'
import Template from '#models/template'
import Project from '#models/project'
import Notification from '#models/notification'
import Attribute from '#models/attribute'
import Channel from '../enums/channel.js'
import { createTemplateValidator, updateTemplateValidator } from '#validators/template_validator'
import { formatChannelName } from '#utils/formatChannelName'
import { nanoid } from 'nanoid'
import drive from '@adonisjs/drive/services/main'

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
      .preload('attributes')
      .orderBy('templates.created_at', 'desc')
      .orderBy('templates.id', 'desc')

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
      attributes: template.attributes,
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
      .preload('attributes')

    return inertia.render('templates/create', {
      notifications,
      selectedNotification,
      existingTemplates,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const { notification_id, channel, content, attributes, images } =
      await createTemplateValidator.validate(request.all())

    const notification = await Notification.query()
      .where('id', notification_id)
      .where('project_id', currentProject.id)
      .first()

    if (!notification) {
      session.flash('error', 'Notification not found or you do not have access to it.')
      return response.redirect().back()
    }

    const existingTemplate = await Template.query()
      .where('notification_id', notification_id)
      .where('channel', channel)
      .first()

    if (existingTemplate) {
      session.flash(
        'error',
        `${formatChannelName(channel, 'withArticle')} template already exists for this notification.`
      )
      return response.redirect().back()
    }

    let newContent = content

    if (images && images.length > 0) {
      const uploadedPaths: string[] = []

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        if (!image) continue

        try {
          const fileType = image.extname
          const key = `${nanoid()}.${fileType}`
          await image.moveToDisk(key)

          uploadedPaths.push(image.meta.url)
        } catch (error) {
          console.error(`Failed to upload image ${i}:`, error)
          continue
        }
      }

      uploadedPaths.forEach((path, index) => {
        newContent = newContent.replaceAll(`__IMG_${index}__`, path)
      })
    }

    const template = await Template.create({
      notificationId: notification_id,
      channel: channel,
      content: newContent,
    })

    if (attributes && attributes.length > 0) {
      const attributesData = attributes.map((attr) => ({
        templateId: template.id,
        name: attr.name,
        type: attr.type,
        isRequired: attr.isRequired,
      }))

      await Attribute.createMany(attributesData)
    }

    session.flash('success', `${formatChannelName(channel)} template created successfully!`)
    return response.redirect().toPath('/templates')
  }

  async show({ inertia, params, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const template = await Template.query()
      .join('notifications', 'templates.notification_id', 'notifications.id')
      .where('notifications.project_id', currentProject?.id)
      .where('templates.id', params.id)
      .select('templates.*', 'notifications.title as notification_title')
      .preload('attributes')
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
      attributes: template.attributes,
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
      .preload('attributes')
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
      attributes: template.attributes,
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
      .preload('attributes')
      .firstOrFail()

    const { content, attributes, images } = await updateTemplateValidator.validate({
      ...request.all(),
      channel: template.channel,
    })

    const uploadedImgRegex = /<img[^>]+src="(\/uploads\/[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)"[^>]*>/g
    const oldImages = Array.from(
      new Set(Array.from(template.content.matchAll(uploadedImgRegex), (m) => m[1]))
    )
    const newImages = Array.from(
      new Set(Array.from(content.matchAll(uploadedImgRegex), (m) => m[1]))
    )
    const removedImages = oldImages.filter((img) => !newImages.includes(img))

    const disk = drive.use()
    await Promise.all(
      removedImages.map(async (url) => {
        const key = url.split('/').pop()!
        try {
          if (await disk.exists(key)) await disk.delete(key)
        } catch (error) {
          console.error(`[Update] Failed to delete removed image ${key}:`, error)
        }
      })
    )

    let newContent = content

    if (images && images.length > 0) {
      const uploadedPaths: string[] = []

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        if (!image) continue

        try {
          const fileType = image.extname
          const key = `${nanoid()}.${fileType}`
          await image.moveToDisk(key)
          uploadedPaths.push(key)
        } catch (error) {
          console.error(`[Update] Failed to upload image ${i}:`, error)
          continue
        }
      }

      uploadedPaths.forEach((path, index) => {
        newContent = newContent.replaceAll(`__IMG_${index}__`, `/uploads/${path}`)
      })
    }

    template.content = newContent
    await template.save()

    if (attributes) {
      const newAttributeNames = attributes.map((attr) => attr.name)
      const attributesToDelete = template.attributes.filter(
        (attr) => !newAttributeNames.includes(attr.name)
      )

      if (attributesToDelete.length > 0) {
        await Attribute.query()
          .whereIn(
            'id',
            attributesToDelete.map((attr) => attr.id)
          )
          .delete()
      }

      const attributesToUpdate = attributes.filter((attr) =>
        template.attributes.some((existingAttr) => existingAttr.name === attr.name)
      )
      const attributesToCreate = attributes.filter(
        (attr) => !template.attributes.some((existingAttr) => existingAttr.name === attr.name)
      )

      if (attributesToUpdate.length > 0) {
        const updatePromises = attributesToUpdate.map(async (attr) => {
          const existingAttr = template.attributes.find((existing) => existing.name === attr.name)
          if (existingAttr) {
            existingAttr.type = attr.type
            existingAttr.isRequired = attr.isRequired
            await existingAttr.save()
          }
        })
        await Promise.all(updatePromises)
      }

      if (attributesToCreate.length > 0) {
        const newAttributesData = attributesToCreate.map((attr) => ({
          templateId: template.id,
          name: attr.name,
          type: attr.type,
          isRequired: attr.isRequired,
        }))
        await Attribute.createMany(newAttributesData)
      }
    }

    session.flash(
      'success',
      `${formatChannelName(template.channel)} template updated successfully!`
    )
    return response.redirect().toPath('/templates')
  }

  async destroy({ response, params, session }: HttpContext) {
    const currentProject = session.get('current_project') as Project

    const template = await Template.query()
      .where('id', params.id)
      .preload('notification', (query) => {
        query.where('project_id', currentProject?.id)
      })
      .preload('attributes')
      .firstOrFail()

    const disk = drive.use()
    const imageKeys: string[] = []
    const imgRegex = /\/uploads\/([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)\b/g
    let match
    while ((match = imgRegex.exec(template.content))) {
      imageKeys.push(match[1])
    }

    await Promise.all(
      imageKeys.map(async (key) => {
        try {
          const exists = await disk.exists(key)
          if (exists) await disk.delete(key)
        } catch (error) {
          console.error(`Failed to delete image ${key}:`, error)
        }
      })
    )

    const templateChannel = template.channel
    await template.delete()

    session.flash('success', `${formatChannelName(templateChannel)} template deleted successfully!`)
    return response.redirect().toPath('/templates')
  }
}

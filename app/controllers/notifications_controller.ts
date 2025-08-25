import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import NotificationDelivery from '#models/notification_delivery'
import {
  createNotificationValidator,
  updateNotificationValidator,
} from '#validators/notification_validator'
import NotificationDeliveryStatus from '../enums/notification_delivery_status.js'

export default class NotificationsController {
  async index({ inertia, session }: HttpContext) {
    const currentProject = session.get('current_project')

    const notifications = await Notification.query()
      .where('projectId', currentProject?.id)
      .select('id', 'title', 'externalId', 'createdAt')
      .orderBy('createdAt', 'desc')

    return inertia.render('notifications/index', {
      notifications,
      currentProject,
    })
  }

  async create({ inertia, session }: HttpContext) {
    const currentProject = session.get('current_project')
    return inertia.render('notifications/create', { currentProject })
  }

  async store({ request, response, session }: HttpContext) {
    const currentProject = session.get('current_project')

    const data = await request.validateUsing(createNotificationValidator)

    await Notification.create({
      title: data.title,
      externalId: data.externalId || null,
      projectId: currentProject.id,
    })

    session.flash('success', `Notification "${data.title}" has been created successfully!`)

    return response.redirect().toPath('/notifications')
  }

  async show({ inertia, params, session }: HttpContext) {
    const currentProject = session.get('current_project')

    const notification = await Notification.query()
      .where('projectId', currentProject.id)
      .where('id', params.id)
      .preload('templates')
      .firstOrFail()

    const deliveryStats = await NotificationDelivery.query()
      .whereHas('template', (query) => {
        query.where('notificationId', notification.id)
      })
      .select('status', 'templateId', 'createdAt')

    const apiUsage = {
      totalDeliveries: deliveryStats.length,
      successfulDeliveries: deliveryStats.filter(
        (d) => d.status === NotificationDeliveryStatus.SENT
      ).length,
      failedDeliveries: deliveryStats.filter((d) => d.status === NotificationDeliveryStatus.FAILED)
        .length,
      pendingDeliveries: deliveryStats.filter(
        (d) => d.status === NotificationDeliveryStatus.PENDING
      ).length,
      lastDelivery:
        deliveryStats.length > 0
          ? Math.max(...deliveryStats.map((d) => d.createdAt.toMillis()))
          : null,
      deliveryChannels: [...new Set(deliveryStats.map((d) => d.templateId))],
      deliveryRate:
        deliveryStats.length > 0
          ? (
              (deliveryStats.filter((d) => d.status === NotificationDeliveryStatus.SENT).length /
                deliveryStats.length) *
              100
            ).toFixed(1)
          : '0',
    }

    return inertia.render('notifications/show', {
      notification,
      currentProject,
      templates: notification.templates,
      apiUsage,
    })
  }

  async edit({ inertia, params, session }: HttpContext) {
    const currentProject = session.get('current_project')

    const notification = await Notification.query()
      .where('projectId', currentProject.id)
      .where('id', params.id)
      .firstOrFail()

    return inertia.render('notifications/edit', {
      notification,
      currentProject,
    })
  }

  async update({ request, response, params, session }: HttpContext) {
    const currentProject = session.get('current_project')

    const notification = await Notification.query()
      .where('id', params.id)
      .where('projectId', currentProject.id)
      .firstOrFail()

    const data = await request.validateUsing(updateNotificationValidator)

    notification.title = data.title
    notification.externalId = data.externalId || null
    await notification.save()

    session.flash('success', `Notification "${data.title}" has been updated successfully!`)

    return response.redirect().toPath('/notifications')
  }

  async destroy({ response, params, session }: HttpContext) {
    const currentProject = session.get('current_project')

    const notification = await Notification.query()
      .where('id', params.id)
      .where('projectId', currentProject.id)
      .firstOrFail()

    const notificationTitle = notification.title
    await notification.delete()

    session.flash('success', `Notification "${notificationTitle}" has been deleted successfully!`)

    return response.redirect().toPath('/notifications')
  }
}

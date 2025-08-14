import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import NotificationDelivery from '#models/notification_delivery'
import Channel from '../enums/Channel.js'
import NotificationDeliveryStatus from '../enums/NotificationDeliveryStatus.js'
import { DateTime } from 'luxon'

export default class DashboardController {
  async show({ inertia }: HttpContext) {
    const totalNotifications = await Notification.query().count('* as total').first()

    const emailDeliveries = await NotificationDelivery.query()
      .join('templates', 'notification_deliveries.template_id', 'templates.id')
      .where('templates.channel', Channel.EMAIL)
      .where('notification_deliveries.status', NotificationDeliveryStatus.SENT)
      .count('* as total')
      .first()

    const smsSent = await NotificationDelivery.query()
      .join('templates', 'notification_deliveries.template_id', 'templates.id')
      .where('templates.channel', Channel.SMS)
      .where('notification_deliveries.status', NotificationDeliveryStatus.SENT)
      .count('* as total')
      .first()

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = DateTime.now().minus({ days: i })
      return {
        date: date.toFormat('EEE'),
        startOfDay: date.startOf('day').toSQL(),
        endOfDay: date.endOf('day').toSQL(),
      }
    }).reverse()

    const notificationActivity = await Promise.all(
      last7Days.map(async ({ date, startOfDay, endOfDay }) => {
        const count = await NotificationDelivery.query()
          .whereBetween('created_at', [startOfDay, endOfDay])
          .count('* as total')
          .first()

        return {
          date,
          count: count?.$extras.total || 0,
        }
      })
    )

    const recentNotifications = await NotificationDelivery.query()
      .join('templates', 'notification_deliveries.template_id', 'templates.id')
      .join('notifications', 'notification_deliveries.notification_id', 'notifications.id')
      .select(
        'notification_deliveries.id',
        'notification_deliveries.status',
        'notification_deliveries.created_at',
        'templates.channel',
        'notifications.title'
      )
      .orderBy('notification_deliveries.created_at', 'desc')
      .limit(10)

    const stats = {
      totalNotifications: totalNotifications?.$extras.total || 0,
      emailDeliveries: emailDeliveries?.$extras.total || 0,
      smsSent: smsSent?.$extras.total || 0,
    }

    const chartData = {
      labels: notificationActivity.map((item) => item.date),
      data: notificationActivity.map((item) => item.count),
    }

    const recentData = recentNotifications.map((delivery: any) => ({
      id: delivery.id,
      type: delivery.$extras.channel?.toLowerCase() || 'unknown',
      title: delivery.$extras.title || 'Unknown',
      recipient: this.getRecipientDisplay(delivery.$extras.channel),
      status: delivery.status.toLowerCase(),
      time: this.formatTimeAgo(delivery.createdAt),
    }))

    return inertia.render('dashboard', {
      stats,
      chartData,
      recentNotifications: recentData,
    })
  }

  private getRecipientDisplay(channel: string): string {
    switch (channel) {
      case Channel.EMAIL:
        return 'user@example.com'
      case Channel.SMS:
        return '+1234567890'
      case Channel.PUSH:
        return 'All Users'
      default:
        return 'Unknown'
    }
  }

  private formatTimeAgo(createdAt: any): string {
    const now = DateTime.now()
    const created = DateTime.fromJSDate(createdAt)
    const diff = now.diff(created, 'minutes')

    if (diff.minutes < 1) return 'Just now'
    if (diff.minutes < 60) return `${Math.floor(diff.minutes)} minutes ago`
    if (diff.minutes < 1440) return `${Math.floor(diff.minutes / 60)} hours ago`
    return `${Math.floor(diff.minutes / 1440)} days ago`
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import NotificationDelivery from '#models/notification_delivery'
import NotificationDeliveryStatus from '../enums/notification_delivery_status.js'
import { DateTime } from 'luxon'
import Project from '#models/project'
import Template from '#models/template'
import Channel from '../enums/channel.js'

interface ChannelDeliveryCounts {
  channel: Channel
  total: number
}

interface DashboardStats {
  totalProjects: number
  totalNotifications: number
  totalTemplates: number
  channelDeliveryCounts: ChannelDeliveryCounts[]
}

interface DashboardChartData {
  day: string
  data: number
}

interface DashboardRecentNotification {
  id: number
  type: Channel
  title: string
  recipient: string
  status: string
  time: string
}

export interface DashboardData {
  stats: DashboardStats
  chartData: DashboardChartData[]
  recentNotifications: DashboardRecentNotification[]
}

export default class DashboardController {
  async show({ inertia, auth, session }: HttpContext) {
    if (!session.get('current_project')) {
      const defaultProject = await Project.getDefaultProject(auth.user!.id)
      if (defaultProject) {
        session.put('current_project', defaultProject)
      }
    }
    const startOfWeek = DateTime.now().minus({ days: 6 }).startOf('day')
    const endOfToday = DateTime.now().endOf('day')

    const [
      totalProjects,
      totalNotifications,
      totalTemplates,
      channelDeliveryCounts,
      deliveries,
      recentNotifications,
    ] = await Promise.all([
      Project.query().where('userId', auth.user!.id).count('*', 'total').first(),
      Notification.query()
        .whereHas('project', (query) => {
          query.where('user_id', auth.user!.id)
        })
        .count('*', 'total')
        .first(),
      Template.query()
        .whereHas('notification', (notificationQuery) => {
          notificationQuery.whereHas('project', (projectQuery) => {
            projectQuery.where('user_id', auth.user!.id)
          })
        })
        .count('*', 'total')
        .first(),
      NotificationDelivery.query()
        .join('templates', 'notification_deliveries.template_id', 'templates.id')
        .join('notifications', 'templates.notification_id', 'notifications.id')
        .join('projects', 'notifications.project_id', 'projects.id')
        .where('projects.user_id', auth.user!.id)
        .where('notification_deliveries.status', NotificationDeliveryStatus.SENT)
        .groupBy('templates.channel')
        .select('templates.channel')
        .count('notification_deliveries.id as total'),
      NotificationDelivery.query()
        .whereBetween('created_at', [startOfWeek.toSQL(), endOfToday.toSQL()])
        .select('created_at'),
      NotificationDelivery.query()
        .join('templates', 'notification_deliveries.template_id', 'templates.id')
        .join('notifications', 'templates.notification_id', 'notifications.id')
        .join('projects', 'notifications.project_id', 'projects.id')
        .where('projects.user_id', auth.user!.id)
        .select(
          'notification_deliveries.id',
          'notification_deliveries.title',
          'notification_deliveries.status',
          'notification_deliveries.created_at',
          'notification_deliveries.recipient',
          'templates.channel'
        )
        .orderBy('notification_deliveries.created_at', 'desc')
        .limit(5),
    ])

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = startOfWeek.plus({ days: i })
      return { date, count: 0 }
    })

    const stats: DashboardStats = {
      totalProjects: totalProjects?.$extras.total || 0,
      totalNotifications: totalNotifications?.$extras.total || 0,
      totalTemplates: totalTemplates?.$extras.total || 0,
      channelDeliveryCounts: channelDeliveryCounts.map((sc: any) => ({
        channel: sc.$extras.channel,
        total: sc.$extras.total,
      })),
    }

    const chartData: DashboardChartData[] = last7Days.map((day) => ({
      day: day.date.toFormat('EEE'),
      data: deliveries.filter((d) => d.createdAt.toISODate() === day.date.toISODate()).length,
    }))

    const recentData: DashboardRecentNotification[] = recentNotifications.map((delivery: any) => ({
      id: delivery.id,
      type: delivery.$extras.channel,
      title: delivery.title,
      recipient: delivery.recipient,
      status: delivery.status,
      time: this.formatTimeAgo(delivery.createdAt),
    }))

    const dashboardData: DashboardData = {
      stats,
      chartData,
      recentNotifications: recentData,
    }

    return inertia.render('dashboard', dashboardData)
  }

  private formatTimeAgo(createdAt: any): string {
    const now = DateTime.now()
    const created = DateTime.fromISO(createdAt)
    const diff = now.diff(created, 'minutes')

    if (diff.minutes < 1) return 'Just now'
    if (diff.minutes < 60) return `${Math.floor(diff.minutes)} minutes ago`
    if (diff.minutes < 1440) return `${Math.floor(diff.minutes / 60)} hours ago`
    return `${Math.floor(diff.minutes / 1440)} days ago`
  }
}

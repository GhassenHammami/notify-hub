import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async show({ inertia }: HttpContext) {
    const stats = {
      totalNotifications: 24500,
      emailDeliveries: 18200,
      smsSent: 4300,
      activeUsers: 1200,
    }

    return inertia.render('dashboard', { stats })
  }
}

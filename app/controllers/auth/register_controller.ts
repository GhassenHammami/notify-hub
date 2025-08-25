import User from '#models/user'
import { registerValidator } from '#validators/auth_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    await auth.use('web').login(user)

    session.flash(
      'success',
      `Welcome to NotifyHub, ${user.fullName}! Start creating your first project to get started.`
    )

    return response.redirect().toRoute('dashboard.show')
  }
}

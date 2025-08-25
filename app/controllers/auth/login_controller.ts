import User from '#models/user'
import { loginValidator } from '#validators/auth_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ inertia, session }: HttpContext) {
    if (session.has('current_project')) {
      session.forget('current_project')
    }
    return inertia.render('auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { email, password, isRememberMe } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user, isRememberMe)
    session.forget('current_project')
    return response.redirect().toRoute('dashboard.show')
  }
}

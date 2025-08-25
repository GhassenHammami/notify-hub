import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ response, auth, session }: HttpContext) {
    session.forget('current_project')
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}

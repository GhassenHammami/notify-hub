import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { registerValidator, loginValidator } from '#validators/auth_validator'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    await User.create({
      fullName: data.fullName,
      email: data.email,
      password: await hash.make(data.password),
    })

    return response.redirect().toRoute('login')
  }

  // async login({ request, response, auth }: HttpContext) {
  //   try {
  //     const data = await loginValidator.validate(request.body())

  //     const user = await User.verifyCredentials(data.email, data.password)
  //     const token = await User.accessTokens.create(user)

  //     return response.ok({
  //       message: 'Login successful',
  //       user: {
  //         id: user.id,
  //         fullName: user.fullName,
  //         email: user.email,
  //       },
  //       token: token,
  //     })
  //   } catch (error) {
  //     console.error('Login error:', error)

  //     // Handle validation errors
  //     if (error.messages) {
  //       const formattedErrors = formatValidationErrors(error.messages)
  //       return response.redirect().back().withErrors({ email: 'Email is already taken.' }).withQs()
  //     }

  //     return response.unauthorized({
  //       message: 'Invalid credentials',
  //     })
  //   }
  // }

  // async logout({ response, auth }: HttpContext) {
  //   try {
  //     // await auth.use('api').revoke()
  //     return response.ok({
  //       message: 'Logged out successfully',
  //     })
  //   } catch (error) {
  //     return response.internalServerError({
  //       message: 'Logout failed',
  //     })
  //   }
  // }

  // async profile({ response, auth }: HttpContext) {
  //   try {
  //     const user = auth.user!
  //     return response.ok({
  //       user: {
  //         id: user.id,
  //         fullName: user.fullName,
  //         email: user.email,
  //       },
  //     })
  //   } catch (error) {
  //     return response.unauthorized({
  //       message: 'Not authenticated',
  //     })
  //   }
  // }
}

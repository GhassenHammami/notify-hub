import { HttpContext } from '@adonisjs/core/http'

export default class ApiDocsController {
  async show({ inertia, request }: HttpContext) {
    const baseUrl = request.completeUrl().split(request.url())[0]
    return inertia.render('api_docs', {
      baseUrl,
    })
  }
}

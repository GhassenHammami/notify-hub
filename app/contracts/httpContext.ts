import Project from '#models/project'
import '@adonisjs/core/http'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    project: Project
  }
}

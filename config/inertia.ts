import Project from '#models/project'
import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => {
      ctx.session?.flashMessages.get('errors')
    },
    user: (ctx) => ctx.inertia.always(() => ctx.auth?.user),
    currentProject: (ctx) => ctx.inertia.always(() => ctx.session?.get('current_project')),
    allProjects: async (ctx) => {
      if (!ctx.auth?.user) return null
      return await Project.query()
        .where('user_id', ctx.auth.user.id)
        .orderBy('created_at', 'desc')
        .select('id', 'name')
    },
    flash: (ctx) => {
      const success = ctx.session?.flashMessages.get('success')
      const error = ctx.session?.flashMessages.get('error')
      const warning = ctx.session?.flashMessages.get('warning')
      const info = ctx.session?.flashMessages.get('info')

      return { success, error, warning, info }
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}

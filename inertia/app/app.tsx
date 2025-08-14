import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import AppLayout from '~/layouts/AppLayout'

export type InertiaPage<P = any> = ((props: P) => React.JSX.Element) & {
  layout?: (element: React.JSX.Element) => React.JSX.Element
}
const appName = import.meta.env.VITE_APP_NAME || 'NotifyHub'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const page = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob<{ default: InertiaPage }>('../pages/**/*.tsx')
    )
    page.default.layout = page.default.layout || ((page) => <AppLayout children={page} />)
    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})

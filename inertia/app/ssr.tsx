import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { InertiaPage } from './app'
import AppLayout from '~/layouts/AppLayout'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<{ default: InertiaPage }>('../pages/**/*.tsx', { eager: true })
      const page = pages[`../pages/${name}.tsx`]
      page.default.layout = page.default.layout || ((page: any) => <AppLayout children={page} />)
      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}

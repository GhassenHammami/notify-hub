import { Head, Link } from '@inertiajs/react'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'
import { route } from '@izzyjs/route/client'
import { InertiaPage } from '~/app/app'
import GuestLayout from '~/layouts/GuestLayout'

interface NotFoundProps {
  error?: string
  message?: string
  code?: string
  title?: string
  resource?: string
}

const NotFound: InertiaPage<NotFoundProps> = ({
  error,
  message,
  code = '404',
  title = 'Page Not Found',
  resource,
}) => {
  const errorMessage =
    message ||
    error ||
    `The ${resource || 'page'} you're looking for doesn't exist or has been moved.`

  return (
    <>
      <Head title={title} />

      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="mb-4 text-6xl font-bold text-gray-900">{code}</h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">{title}</h2>
            <p className="text-lg text-gray-600">{errorMessage}</p>
          </div>

          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-center">
              <Search className="mr-2 h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">What you can do:</span>
            </div>
            <ul className="space-y-2 text-left text-sm text-gray-600">
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                Check the URL for typos or spelling errors
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                Go back to the previous page
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                Return to the homepage
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link
              href={route('home')}
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-400">
            <p>If you believe this is an error, please contact support.</p>
          </div>
        </div>
      </div>
    </>
  )
}

NotFound.layout = (page) => {
  const props = page.props as NotFoundProps
  if (props.resource === 'page') {
    return <GuestLayout>{page}</GuestLayout>
  }

  return page
}

export default NotFound

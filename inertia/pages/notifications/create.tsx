import React from 'react'
import { Head, useForm, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { Bell, ArrowLeft, Save } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { route } from '@izzyjs/route/client'
import Project from '#models/project'

const CreateNotification: InertiaPage = () => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    externalId: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (data.title.trim()) {
      post(route('notifications.store').path)
    }
  }

  return (
    <>
      <Head title="Create Notification" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <Link
                  href={route('notifications.index')}
                  className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Notifications
                </Link>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create Notification
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Create a new notification element for{' '}
                {currentProject?.name || 'the current project'}.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    placeholder="Enter notification title"
                    required
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a descriptive title for your notification (e.g., "Welcome Email", "Order
                    Confirmation")
                  </p>
                </div>

                <div>
                  <label htmlFor="externalId" className="block text-sm font-medium text-gray-700">
                    External ID (Optional)
                  </label>
                  <input
                    type="text"
                    id="externalId"
                    value={data.externalId}
                    onChange={(e) => setData('externalId', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    placeholder="Reference ID from your system"
                  />
                  {errors.externalId && (
                    <p className="mt-1 text-sm text-red-600">{errors.externalId}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Use this to track notifications in your external system. Must be unique within
                    this project. Only letters, numbers, hyphens, and underscores are allowed.
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start">
                    <Bell className="mt-0.5 mr-3 h-5 w-5 text-blue-600" />
                    <div className="text-sm text-blue-700">
                      <h4 className="font-medium">What happens next?</h4>
                      <ul className="mt-2 space-y-1">
                        <li>• A new notification element will be created</li>
                        <li>• You can assign templates to this notification</li>
                        <li>• Use it to organize and categorize your notifications</li>
                        <li>• Track delivery status and analytics per notification type</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
                <Link
                  href={route('notifications.index')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={processing || !data.title.trim()}
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                  {processing ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Notification
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNotification

import React from 'react'
import { Head, useForm, Link, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { Bell, ArrowLeft, Save } from 'lucide-react'
import { route } from '@izzyjs/route/client'
import Project from '#models/project'
import Notification from '#models/notification'

interface NotificationsEditProps {
  notification: Notification
}

const NotificationsEdit: InertiaPage<NotificationsEditProps> = ({ notification }) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const { data, setData, patch, processing, errors } = useForm({
    title: notification.title,
    externalId: notification.externalId || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (data.title.trim()) {
      patch(route('notifications.update', { params: { id: notification.id.toString() } }).path, {
        onSuccess: () => {},
      })
    }
  }

  return (
    <>
      <Head title={`Edit ${notification.title} - Notification`} />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href={route('notifications.show', { params: { id: notification.id.toString() } })}
              className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Notification
            </Link>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Edit Notification
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Update notification element "{notification.title}" for{' '}
              {currentProject?.name || 'the current project'}.
            </p>
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
                  <p className="mt-1 text-sm text-gray-500">
                    Use this to track notifications in your external system. Must be unique within
                    this project. Only letters, numbers, hyphens, and underscores are allowed.
                  </p>
                  {errors.externalId && (
                    <p className="mt-1 text-sm text-red-600">{errors.externalId}</p>
                  )}
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start">
                    <Bell className="mt-0.5 mr-3 h-5 w-5 text-blue-600" />
                    <div className="text-sm text-blue-700">
                      <h4 className="font-medium">Current Information</h4>
                      <ul className="mt-2 space-y-1">
                        <li>
                          • Created: {new Date(notification.createdAt as any).toLocaleDateString()}
                        </li>
                        <li>
                          • Last Updated:{' '}
                          {new Date(notification.updatedAt as any).toLocaleDateString()}
                        </li>
                        <li>• Internal ID: {notification.id}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
                <Link
                  href={route('notifications.show', { params: { id: notification.id.toString() } })}
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
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Notification
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

export default NotificationsEdit

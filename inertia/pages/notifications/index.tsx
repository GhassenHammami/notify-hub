import { useState } from 'react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { Plus, Bell, Calendar, Edit, Trash2, Hash, ExternalLink, Eye, FileEdit } from 'lucide-react'
import Modal from '~/components/ui/Modal'
import Project from '#models/project'
import Notification from '#models/notification'
import { route } from '@izzyjs/route/client'

interface NotificationsIndexProps {
  notifications: Notification[]
}

const NotificationsIndex: InertiaPage<NotificationsIndexProps> = ({ notifications }) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    notification: Notification | null
  }>({
    isOpen: false,
    notification: null,
  })

  const { delete: destroy, processing } = useForm()

  const openDeleteModal = (notification: Notification) => {
    setDeleteModal({ isOpen: true, notification })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, notification: null })
  }

  const handleDelete = () => {
    if (deleteModal.notification) {
      destroy(`/notifications/${deleteModal.notification.id}`, {
        onSuccess: () => {
          closeDeleteModal()
        },
      })
    }
  }

  return (
    <>
      <Head title="Notifications" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Notifications
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Manage notification elements for {currentProject?.name || 'the current project'}.
              </p>
            </div>
            <Link
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              href={route('notifications.create')}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Notification
            </Link>
          </div>
        </header>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 shadow-lg">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
                <Bell className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">No Notifications Found</h3>
              <p className="mb-8 max-w-md text-gray-600">
                You haven't created any notification elements yet. Start creating notifications to
                organize your notification types.
              </p>
              <Link
                href={route('notifications.create')}
                className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Notification
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Notification Elements</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Bell className="h-4 w-4" />
                  <span>
                    {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Notification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      External ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {notifications.map((notification, index) => (
                    <tr
                      key={notification.id}
                      className={`transition-colors hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                            <Bell className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500">ID: {notification.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {notification.externalId ? (
                          <div className="flex items-center space-x-2">
                            <Hash className="h-4 w-4 text-gray-400" />
                            <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700">
                              {notification.externalId}
                            </code>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(notification.createdAt as any).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <div className="mr-1.5 h-2 w-2 rounded-full bg-green-400"></div>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={route('notifications.show', {
                              params: { id: notification.id.toString() },
                            })}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                            title="View details"
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Link>
                          <Link
                            href={route('notifications.edit', {
                              params: { id: notification.id.toString() },
                            })}
                            className="inline-flex items-center rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:border-emerald-400 hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                            title="Edit notification"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Link>
                          <Link
                            href={`${route('templates.create')}?notification=${notification.id}`}
                            className="inline-flex items-center rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:border-indigo-400 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                            title="Create template for this notification"
                          >
                            <FileEdit className="mr-1 h-3 w-3" />
                            Template
                          </Link>
                          <button
                            onClick={() => openDeleteModal(notification)}
                            className="inline-flex items-center rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-all duration-200 hover:scale-105 hover:border-red-400 hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                            title="Delete notification"
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Ready for templates and delivery</span>
                  <span>•</span>
                  <span>Organized by type and purpose</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Create templates to start sending</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        title="Delete Notification"
        variant="danger"
        size="md"
        showFooter={true}
        icon={<Trash2 className="h-6 w-6" />}
        iconClassName="bg-red-50"
        bodyClassName="p-6"
        footer={
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={closeDeleteModal}
              disabled={processing}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={processing}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {processing ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Deleting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Notification</span>
                </div>
              )}
            </button>
          </div>
        }
      >
        <p className="leading-relaxed text-gray-600">
          Are you sure you want to delete the notification "{deleteModal.notification?.title}"? This
          action cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default NotificationsIndex

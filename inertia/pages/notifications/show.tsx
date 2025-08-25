import { useState } from 'react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import Modal from '~/components/ui/Modal'
import Project from '#models/project'
import { formatChannelName, getChannelGradient } from '~/utils/channels'
import ChannelIcon from '~/components/ui/ChannelIcon'
import Notification from '#models/notification'
import Template from '#models/template'
import {
  ArrowLeft,
  Bell,
  Calendar,
  Edit,
  Trash2,
  Hash,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileEdit,
} from 'lucide-react'

interface ApiUsage {
  totalDeliveries: number
  successfulDeliveries: number
  failedDeliveries: number
  pendingDeliveries: number
  lastDelivery: number | null
  deliveryChannels: number[]
  deliveryRate: string
}

interface NotificationsShowProps {
  notification: Notification
  templates: Template[]
  apiUsage: ApiUsage
}

const NotificationsShow: InertiaPage<NotificationsShowProps> = ({
  notification,
  templates,
  apiUsage,
}) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [deleteModal, setDeleteModal] = useState(false)
  const { delete: destroy, processing } = useForm()

  const openDeleteModal = () => setDeleteModal(true)
  const closeDeleteModal = () => setDeleteModal(false)

  const handleDelete = () => {
    destroy(`/notifications/${notification.id}`, {
      onSuccess: () => {
        closeDeleteModal()
      },
    })
  }

  return (
    <>
      <Head title={`${notification.title} - Notification Details`} />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/notifications"
              className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Notifications
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {notification.title}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Notification element details for {currentProject?.name || 'the current project'}.
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/notifications/${notification.id}/edit`}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
              <button
                onClick={openDeleteModal}
                className="inline-flex items-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-red-600 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                    <Bell className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{notification.title}</h2>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created{' '}
                        {new Date(notification.createdAt as any).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="group rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 transition-colors group-hover:bg-indigo-200">
                        <Hash className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-indigo-900">Internal ID</p>
                        <p className="text-2xl font-bold text-indigo-700">{notification.id}</p>
                      </div>
                    </div>
                  </div>

                  {notification.externalId && (
                    <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200">
                          <Hash className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-900">External ID</p>
                          <p className="text-lg font-semibold text-green-700">
                            {notification.externalId}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{templates.length}/3 templates</span>
                    <span>•</span>
                    <span>Email, SMS, Push</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {templates.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h4 className="mb-2 text-lg font-medium text-gray-900">No Templates Yet</h4>
                    <p className="mb-4 text-sm text-gray-600">
                      Create templates for different channels to start sending notifications.
                    </p>
                    <Link
                      href="/templates/create"
                      className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                    >
                      Create Template
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${getChannelGradient(template.channel, 500, 600)}`}
                          >
                            <ChannelIcon channel={template.channel} className="text-white" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">
                              {formatChannelName(template.channel)} Template
                            </h5>
                            <p className="text-sm text-gray-500">
                              {template.content.substring(0, 50)}...
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/templates/${template.id}`}
                            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                          >
                            View →
                          </Link>
                        </div>
                      </div>
                    ))}

                    {templates.length < 3 && (
                      <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                        <p className="mb-2 text-sm text-gray-500">
                          {3 - templates.length} more template
                          {3 - templates.length !== 1 ? 's' : ''} can be created
                        </p>
                        <Link
                          href={`/templates/create?notification=${notification.id}`}
                          className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
                        >
                          Add Template
                        </Link>
                      </div>
                    )}

                    {templates.length > 0 && (
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <Link
                          href={`/templates?notification=${notification.id}`}
                          className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                        >
                          <FileEdit className="mr-2 h-4 w-4" />
                          View All Templates
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">API Usage & Analytics</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <BarChart3 className="h-4 w-4" />
                    <span>Delivery Statistics</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                        <BarChart3 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-blue-900">Total</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {apiUsage.totalDeliveries}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-900">Successful</p>
                        <p className="text-2xl font-bold text-green-700">
                          {apiUsage.successfulDeliveries}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-red-50 p-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-900">Failed</p>
                        <p className="text-2xl font-bold text-red-700">
                          {apiUsage.failedDeliveries}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-yellow-50 p-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-900">Pending</p>
                        <p className="text-2xl font-bold text-yellow-700">
                          {apiUsage.pendingDeliveries}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Delivery Rate</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">
                        {apiUsage.deliveryRate}%
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Last Delivery</span>
                      </div>
                      <span className="text-sm text-gray-900">
                        {apiUsage.lastDelivery
                          ? new Date(apiUsage.lastDelivery).toLocaleDateString()
                          : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>

                {apiUsage.totalDeliveries === 0 && (
                  <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                    <p className="text-sm text-gray-600">
                      No deliveries yet. Start sending notifications to see analytics here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/notifications/${notification.id}/edit`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <Edit className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-900">Edit Notification</span>
                </Link>
                <Link
                  href="/templates/create"
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-green-300 hover:bg-green-50"
                >
                  <span className="text-lg font-semibold text-green-600">T</span>
                  <span className="text-sm font-medium text-gray-900">Create Template</span>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Notification Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(notification.createdAt as any).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(notification.updatedAt as any).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Templates</span>
                  <span className="text-sm font-medium text-gray-900">{templates.length}/3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={deleteModal}
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
          Are you sure you want to delete the notification "{notification.title}"? This action
          cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default NotificationsShow

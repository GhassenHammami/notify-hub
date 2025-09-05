import { useState } from 'react'
import { Head, Link, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import Project from '#models/project'
import { useForm } from '@inertiajs/react'
import Modal from '~/components/ui/Modal'
import Template from '#models/template'
import { route } from '@izzyjs/route/client'
import ChannelIcon from '~/components/ui/ChannelIcon'
import { Bell, Calendar, FileEdit, Filter, Plus, Search, Trash2, X } from 'lucide-react'
import Channel from '#enums/channel'
import Notification from '#models/notification'
import { getChannelBg, getChannelBadgeClasses } from '~/utils/channels'
import AttributeTag from '~/components/ui/AttributeTag'

interface TemplatesIndexProps {
  templates: Template[]
  notifications: Partial<Notification>[]
  filters: {
    channel?: string
    notification?: string
    time?: string
  }
}

const TemplatesIndex: InertiaPage<TemplatesIndexProps> = ({
  templates,
  notifications,
  filters,
}) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [showFilters, setShowFilters] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    template: Template | null
  }>({
    isOpen: false,
    template: null,
  })
  const [localFilters, setLocalFilters] = useState({
    channel: filters.channel || '',
    notification: filters.notification || '',
    time: filters.time || '',
  })

  const { delete: destroy, processing } = useForm()

  const openDeleteModal = (template: Template) => {
    setDeleteModal({ isOpen: true, template })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, template: null })
  }

  const handleDelete = () => {
    if (deleteModal.template) {
      destroy(`/templates/${deleteModal.template.id}`, {
        onSuccess: () => {
          closeDeleteModal()
        },
      })
    }
  }

  const channels = Object.values(Channel)

  const timeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ]

  const buildFilterUrl = (filters: typeof localFilters) => {
    const params = new URLSearchParams()
    if (filters.channel) params.append('channel', filters.channel)
    if (filters.notification) params.append('notification', filters.notification)
    if (filters.time) params.append('time', filters.time)
    return params.toString() ? `?${params.toString()}` : ''
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <>
      <Head title="Templates" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Templates
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Manage your notification templates for{' '}
                {currentProject?.name || 'the current project'}.
              </p>
            </div>
            <Link
              href={route('templates.create')}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              <Plus className="h-4 w-4 min-sm:mr-2" />
              <p className="max-sm:hidden">New Template</p>
            </Link>
          </div>
        </header>

        <div className="mb-6">
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              {activeFiltersCount > 0 && (
                <Link
                  href={route('templates.index')}
                  as="button"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Link>
              )}
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Channel Type
                  </label>
                  <select
                    value={localFilters.channel}
                    onChange={(e) => setLocalFilters({ ...localFilters, channel: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">All Channels</option>
                    {channels.map((channel) => (
                      <option key={channel} value={channel}>
                        {channel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Notification
                  </label>
                  <select
                    value={localFilters.notification}
                    onChange={(e) =>
                      setLocalFilters({ ...localFilters, notification: e.target.value })
                    }
                    className="block w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">All Notifications</option>
                    {notifications.map((notification) => (
                      <option key={notification.id} value={notification.id}>
                        {notification.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Time Period
                  </label>
                  <select
                    value={localFilters.time}
                    onChange={(e) => setLocalFilters({ ...localFilters, time: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {timeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowFilters(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  Cancel
                </button>
                <Link
                  href={`${route('templates.index')}${buildFilterUrl(localFilters)}`}
                  as="button"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  Apply Filters
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {templates.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 shadow-lg">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                  <FileEdit className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">No templates found</h3>
                <p className="mb-8 max-w-md text-gray-600">
                  {activeFiltersCount > 0
                    ? 'Try adjusting your filters or create a new template.'
                    : 'Create your first template to start sending notifications.'}
                </p>
                <Link
                  href={route('templates.create')}
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  <Plus className="mr-2 size-5" />
                  Create Template
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Template Elements</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FileEdit className="h-4 w-4" />
                    <span>
                      {templates.length} template{templates.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="block xl:hidden">
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg ${getChannelBg(template.channel, 500)}`}
                          >
                            <ChannelIcon
                              channel={template.channel}
                              className="h-5 w-5 text-white"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {(template as any).notificationTitle}
                            </div>
                            <div className="text-xs text-gray-500">ID: {template.id}</div>
                            <span
                              className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getChannelBadgeClasses(template.channel)}`}
                            >
                              {template.channel}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Link
                            href={route('templates.show', {
                              params: { id: template.id.toString() },
                            })}
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
                            title="View details"
                          >
                            <Search className="size-4 sm:size-5" />
                          </Link>
                          <Link
                            href={route('templates.edit', {
                              params: { id: template.id.toString() },
                            })}
                            className="inline-flex items-center rounded-lg border border-indigo-300 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 transition-colors hover:border-indigo-400 hover:bg-indigo-100"
                            title="Edit template"
                          >
                            <FileEdit className="size-4 sm:size-5" />
                          </Link>
                          <button
                            onClick={() => openDeleteModal(template)}
                            className="inline-flex items-center rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:border-red-400 hover:bg-red-100"
                            title="Delete template"
                          >
                            <Trash2 className="size-4 sm:size-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="mb-2 text-xs font-medium text-gray-600 sm:text-sm">
                          Attributes:
                        </div>
                        {template.attributes && template.attributes.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {template.attributes.slice(0, 3).map((attribute, idx) => (
                              <AttributeTag
                                key={idx}
                                attribute={attribute}
                                size="sm"
                                showIcon={true}
                                showRemoveButton={false}
                              />
                            ))}
                            {template.attributes.length > 3 && (
                              <div className="group relative">
                                <span className="inline-flex cursor-help items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                  +{template.attributes.length - 3}
                                </span>
                                <div className="pointer-events-none fixed z-50 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                                  <div className="w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                                    <div className="mb-2 text-xs font-medium text-gray-700">
                                      All Attributes:
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {template.attributes.map((attribute, idx) => (
                                        <AttributeTag
                                          key={idx}
                                          attribute={attribute}
                                          size="sm"
                                          showIcon={true}
                                          showRemoveButton={false}
                                        />
                                      ))}
                                    </div>
                                    <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-transparent border-t-gray-200"></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">No attributes</span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center text-xs text-gray-500 sm:text-sm">
                        <Calendar className="mr-2 h-3 w-3" />
                        Updated{' '}
                        {new Date(template.updatedAt as any).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden overflow-x-auto rounded-lg border border-gray-200 xl:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Template
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Notification
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Channel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Attributes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Updated
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {templates.map((template, index) => (
                      <tr
                        key={template.id}
                        className={`transition-colors hover:bg-gray-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg ${getChannelBg(template.channel, 500)}`}
                            >
                              <ChannelIcon
                                channel={template.channel}
                                className="h-5 w-5 text-white"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm text-gray-500">ID: {template.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {(template as any).notificationTitle}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getChannelBadgeClasses(template.channel)}`}
                          >
                            {template.channel}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {template.attributes && template.attributes.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {template.attributes.slice(0, 3).map((attribute, idx) => (
                                <AttributeTag
                                  key={idx}
                                  attribute={attribute}
                                  size="sm"
                                  showIcon={true}
                                  showRemoveButton={false}
                                />
                              ))}
                              {template.attributes.length > 3 && (
                                <div className="group relative">
                                  <span className="inline-flex cursor-help items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                    +{template.attributes.length - 3}
                                  </span>
                                  <div className="pointer-events-none fixed z-50 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                                    <div className="w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                                      <div className="mb-2 text-xs font-medium text-gray-700">
                                        All Attributes:
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {template.attributes.map((attribute, idx) => (
                                          <AttributeTag
                                            key={idx}
                                            attribute={attribute}
                                            size="sm"
                                            showIcon={true}
                                            showRemoveButton={false}
                                          />
                                        ))}
                                      </div>
                                      <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-transparent border-t-gray-200"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">No attributes</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(template.updatedAt as any).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={route('templates.show', {
                                params: { id: template.id.toString() },
                              })}
                              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                              title="View details"
                            >
                              <Search className="mr-1 h-3 w-3" />
                              View
                            </Link>
                            <Link
                              href={route('templates.edit', {
                                params: { id: template.id.toString() },
                              })}
                              className="inline-flex items-center rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:border-indigo-400 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                              title="Edit template"
                            >
                              <FileEdit className="mr-1 h-3 w-3" />
                              Edit
                            </Link>
                            <button
                              onClick={() => openDeleteModal(template)}
                              className="inline-flex items-center rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-all duration-200 hover:scale-105 hover:border-red-400 hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                              title="Delete template"
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

              <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 max-xl:hidden">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>Ready for notification delivery</span>
                    <span>•</span>
                    <span>Organized by channel and notification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Create templates to start sending</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteModal.isOpen && deleteModal.template && (
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          title="Delete Template"
          variant="danger"
          showFooter={true}
          footer={
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                disabled={processing}
              >
                {processing ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          }
        >
          <div className="p-6">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this template? This action cannot be undone.
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default TemplatesIndex

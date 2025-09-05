import { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import Modal from '~/components/ui/Modal'
import { getChannelBg, getChannelBadgeClasses } from '~/utils/channels'
import { ArrowLeft, FileText, Edit, Trash2, Bell, Calendar, Hash } from 'lucide-react'
import ChannelIcon from '~/components/ui/ChannelIcon'
import Template from '#models/template'
import { formatChannelName } from '#utils/formatChannelName'

interface TemplatesShowProps {
  template: Template
}

const TemplatesShow: InertiaPage<TemplatesShowProps> = ({ template }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const { delete: destroy, processing } = useForm()

  const openDeleteModal = () => setDeleteModal(true)
  const closeDeleteModal = () => setDeleteModal(false)

  const handleDelete = () => {
    destroy(`/templates/${template.id}`, {
      onSuccess: () => {
        closeDeleteModal()
      },
    })
  }

  return (
    <>
      <Head
        title={`${formatChannelName(template.channel)} Template - ${template.notification.title}`}
      />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/templates"
              className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Templates
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {formatChannelName(template.channel)} Template
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Template details for {template.notification.title}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/templates/${template.id}/edit`}
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
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl ${getChannelBg(template.channel, 500)} shadow-lg`}
                  >
                    <div className="text-white">
                      <ChannelIcon channel={template.channel} className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {formatChannelName(template.channel)} Template
                    </h2>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Updated{' '}
                        {new Date(template.updatedAt as any).toLocaleDateString('en-US', {
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
                        <p className="text-sm font-medium text-indigo-900">Template ID</p>
                        <p className="text-2xl font-bold text-indigo-700">{template.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200">
                        <Bell className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-900">Notification</p>
                        <p className="text-lg font-semibold text-green-700">
                          {template.notification.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Template Content</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FileText className="h-4 w-4" />
                      <span>{formatChannelName(template.channel)} Content</span>
                    </div>
                    <Link
                      href={route('templates.edit', { params: { id: template.id.toString() } })}
                      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                    >
                      <Edit className="mr-1.5 h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="rounded-lg bg-gray-50 p-4">
                  <pre className="font-mono text-sm whitespace-pre-wrap text-gray-700">
                    {template.content}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/templates/${template.id}/edit`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <Edit className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-900">Edit Template</span>
                </Link>
                <Link
                  href={`/notifications/${template.notification.id}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-green-300 hover:bg-green-50"
                >
                  <Bell className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">View Notification</span>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Template Info</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(template.createdAt as any).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(template.updatedAt as any).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Channel</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getChannelBadgeClasses(template.channel)}`}
                  >
                    {template.channel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        title="Delete Template"
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
                  <span>Delete Template</span>
                </div>
              )}
            </button>
          </div>
        }
      >
        <p className="leading-relaxed text-gray-600">
          Are you sure you want to delete this {template.channel.toLowerCase()} template? This
          action cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default TemplatesShow

import { Head, Link, Form, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { useState } from 'react'
import Modal from '~/components/ui/Modal'
import Toggle from '~/components/ui/Toggle'
import { route } from '@izzyjs/route/client'
import BaseProject from '#models/project'
import {
  ArrowLeft,
  Copy,
  Check,
  Trash2,
  Bell,
  Mail,
  Edit,
  Save,
  X,
  RefreshCw,
  AlertTriangle,
  FolderKanban,
  Calendar,
  CheckCircle,
  Star,
  StarOff,
} from 'lucide-react'

interface Project extends BaseProject {
  notificationsCount: number
}

interface ProjectShowProps {
  project: Project
}

const ProjectShow: InertiaPage<ProjectShowProps> = ({ project }) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [copiedKey, setCopiedKey] = useState(false)
  const [keyVisible, setKeyVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [regenerateModal, setRegenerateModal] = useState<{
    isOpen: boolean
    projectId: number | null
  }>({
    isOpen: false,
    projectId: null,
  })

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(project.apiKey)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
    } catch (err) {
      console.error('Failed to copy API key:', err)
    }
  }

  const openRegenerateModal = (projectId: number) => {
    setRegenerateModal({ isOpen: true, projectId })
  }

  const closeRegenerateModal = () => {
    setRegenerateModal({ isOpen: false, projectId: null })
  }

  return (
    <>
      <Head title={`${project.name} - Project Details`} />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href={route('projects.index')}
              className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Projects
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              {isEditing ? (
                <Form
                  action={route('projects.update', { params: { id: project.id.toString() } })}
                  method="patch"
                  onFinish={() => setIsEditing(false)}
                >
                  {({ processing, reset }) => (
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        name="name"
                        defaultValue={project.name}
                        className="border-b-2 border-indigo-500 bg-transparent text-3xl font-bold tracking-tight text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-4xl"
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          disabled={processing}
                          className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        >
                          <Save className="mr-1 h-4 w-4" />
                          {processing ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false)
                            reset()
                          }}
                          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                        >
                          <X className="mr-1 h-4 w-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              ) : (
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {project.name}
                  </h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    title="Edit project name"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              )}
              <p className="mt-2 text-lg text-gray-600">Project details and API key management.</p>
            </div>
            <div className="flex space-x-3">
              {currentProject?.id !== project.id ? (
                <Form
                  method="post"
                  action={route('projects.switch')}
                  transform={(data) => ({ ...data, projectId: project.id })}
                >
                  {({ processing }) => (
                    <button
                      type="submit"
                      disabled={processing}
                      className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {processing ? (
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          <span>Selecting...</span>
                        </div>
                      ) : (
                        'Select Project'
                      )}
                    </button>
                  )}
                </Form>
              ) : (
                <span className="inline-flex items-center rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-800">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Currently Selected
                </span>
              )}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-red-600 hover:bg-red-600 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:hover:scale-100 disabled:hover:border-red-300 disabled:hover:bg-white disabled:hover:text-red-700"
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
                    <FolderKanban className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
                      {project.isDefault && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                          <Star className="h-3 w-3" />
                          Default
                        </span>
                      )}
                      {currentProject?.id === project.id && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                          <CheckCircle className="h-3 w-3" />
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created{' '}
                        {new Date(project.createdAt as any).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <div
                          className={`h-2 w-2 rounded-full ${project.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                        ></div>
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 space-y-4">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Project Status</h3>
                        <p className="text-sm text-gray-600">
                          {project.isActive
                            ? 'This project is currently active and can send notifications.'
                            : 'This project is inactive and cannot send notifications.'}
                        </p>
                      </div>
                      <Form
                        action={route('projects.toggleActive', {
                          params: { id: project.id.toString() },
                        })}
                        method="patch"
                      >
                        {({ processing, submit }) => (
                          <Toggle
                            checked={project.isActive}
                            onChange={() => submit()}
                            disabled={processing}
                            label="Active"
                            size="lg"
                          />
                        )}
                      </Form>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Default Project</h3>
                        <p className="text-sm text-gray-600">
                          {project.isDefault
                            ? 'This project is set as your default and will be automatically selected when you log in.'
                            : 'Set this project as your default to have it automatically selected when you log in.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.isDefault ? (
                          <Form action={route('projects.unsetDefault')} method="patch">
                            {({ processing }) => (
                              <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-800 transition-colors hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                              >
                                {processing ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-300 border-t-yellow-600" />
                                ) : (
                                  <StarOff className="h-4 w-4" />
                                )}
                                <span className="ml-1">Remove Default</span>
                              </button>
                            )}
                          </Form>
                        ) : (
                          <Form
                            action={route('projects.setAsDefault', {
                              params: { id: project.id.toString() },
                            })}
                            method="patch"
                          >
                            {({ processing }) => (
                              <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                              >
                                {processing ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-300 border-t-yellow-600" />
                                ) : (
                                  <Star className="h-4 w-4" />
                                )}
                                <span className="ml-1">Set as Default</span>
                              </button>
                            )}
                          </Form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="group rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 transition-colors group-hover:bg-indigo-200">
                        <Bell className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-indigo-900">Total Notifications</p>
                        <p className="text-2xl font-bold text-indigo-700">
                          {project.notificationsCount || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 transition-colors group-hover:bg-pink-200">
                        <Mail className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-pink-900">Total Sent</p>
                        <p className="text-2xl font-bold text-pink-700">
                          {project.notificationsCount || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-900">Created</p>
                        <p className="text-sm font-semibold text-green-700">
                          {new Date(project.createdAt as any).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {project.notificationsCount === 0 && (
                  <div className="mt-6 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <span className="text-xl">🚀</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-amber-900">Ready to get started?</h4>
                        <p className="text-sm text-amber-800">
                          This project is all set up and ready for your first notification.
                        </p>
                      </div>
                      <Link
                        href={route('notifications.create')}
                        className="inline-flex items-center rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
                      >
                        Create First
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">API Key</h3>
                <p className="text-sm text-gray-600">
                  Use this key to authenticate your API requests
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Your API Key
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded-lg bg-gray-100 px-3 py-2 font-mono text-sm text-gray-800">
                        {keyVisible ? project.apiKey : '••••••••••••••••••••••••••••••••'}
                      </code>
                      <button
                        onClick={() => setKeyVisible(!keyVisible)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title={keyVisible ? 'Hide API key' : 'Show API key'}
                      >
                        {keyVisible ? (
                          <span className="text-xs">Hide</span>
                        ) : (
                          <span className="text-xs">Show</span>
                        )}
                      </button>
                      <button
                        onClick={copyApiKey}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title="Copy API key"
                      >
                        {copiedKey ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-start">
                      <div className="text-sm text-amber-800">
                        <h4 className="font-medium">Security Note</h4>
                        <p className="mt-1">
                          Keep your API key secure and never share it publicly. If you suspect it
                          has been compromised, regenerate it immediately.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openRegenerateModal(project.id)}
                      className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate API Key
                    </button>
                    <p className="text-sm text-gray-600">
                      This will invalidate the current key and generate a new one
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {project.notificationsCount !== 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link
                    href={route('notifications.create')}
                    className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                        <Bell className="h-5 w-5 text-indigo-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Create Notification</h3>
                      <p className="text-sm text-gray-500">Send a new notification</p>
                    </div>
                  </Link>
                  <Link
                    href={route('notifications.index')}
                    className="flex items-center rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">View Notifications</h3>
                      <p className="text-sm text-gray-500">See all sent notifications</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Project Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total Notifications</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {project.notificationsCount || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">API Usage</h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">To send notifications, use this endpoint:</p>
                  <code className="block rounded bg-gray-100 px-3 py-2 font-mono text-xs">
                    POST /api/notifications
                  </code>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Include your API key in the header:</p>
                  <code className="block rounded bg-gray-100 px-3 py-2 font-mono text-xs">
                    Authorization: Bearer {project.apiKey}
                  </code>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-600">Common tasks for this project</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link
                    href={route('templates.create')}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                      <span className="text-lg font-semibold text-indigo-600">T</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Create Template</h4>
                      <p className="text-sm text-gray-600">Add a new notification template</p>
                    </div>
                  </Link>

                  <Link
                    href={route('notifications.create')}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <Bell className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Create Notification</h4>
                      <p className="text-sm text-gray-600">Create a new notification</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
        variant="danger"
        size="md"
        showFooter={true}
        icon={<Trash2 className="h-6 w-6" />}
        iconClassName="bg-red-50"
        bodyClassName="p-6"
        footer={
          <Form
            action={route('projects.destroy', { params: { id: project.id.toString() } })}
            method="delete"
            onFinish={() => setShowDeleteModal(false)}
          >
            {({ processing }) => (
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={processing}
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={processing}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                  {processing ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Project</span>
                    </div>
                  )}
                </button>
              </div>
            )}
          </Form>
        }
      >
        <p className="leading-relaxed text-gray-600">
          Are you sure you want to delete this project? This action cannot be undone and will remove
          all associated notifications.
        </p>
      </Modal>

      <Modal
        isOpen={regenerateModal.isOpen}
        onClose={closeRegenerateModal}
        title="Regenerate API Key"
        variant="warning"
        size="md"
        showFooter={true}
        icon={<AlertTriangle className="h-6 w-6" />}
        iconClassName="bg-amber-50"
        bodyClassName="p-6"
        footer={
          <Form
            action={route('projects.regenerateApiKey', { params: { id: project.id.toString() } })}
            method="patch"
            onFinish={closeRegenerateModal}
          >
            {({ processing }) => (
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={closeRegenerateModal}
                  type="button"
                  disabled={processing}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                  {processing ? (
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Regenerating...</span>
                    </div>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate API Key
                    </>
                  )}
                </button>
              </div>
            )}
          </Form>
        }
      >
        <p className="leading-relaxed text-gray-600">
          Are you sure you want to regenerate the API key for this project? The current API key will
          become invalid immediately. Any applications using the old key will need to be updated.
        </p>
      </Modal>
    </>
  )
}

export default ProjectShow

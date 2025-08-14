import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import {
  ArrowLeft,
  Copy,
  Check,
  Trash2,
  Bell,
  Mail,
  Eye,
  EyeOff,
  Edit,
  Save,
  X,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import { useState } from 'react'
import Modal from '~/components/ui/Modal'
import FlashNotification, { FlashMessage } from '~/components/ui/FlashNotification'

interface Project {
  id: number
  name: string
  apiKey: string
  createdAt: string
  notificationsCount?: number
}

interface ProjectShowProps {
  project: Project
}

const ProjectShow: InertiaPage<ProjectShowProps> = ({ project }) => {
  const { flash } = usePage().props as { flash?: FlashMessage }
  const [copiedKey, setCopiedKey] = useState(false)
  const [keyVisible, setKeyVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { delete: destroy, processing } = useForm()
  const [regenerateModal, setRegenerateModal] = useState<{
    isOpen: boolean
    projectId: number | null
  }>({
    isOpen: false,
    projectId: null,
  })
  const {
    patch,
    data,
    setData,
    processing: updateProcessing,
    reset,
  } = useForm({
    name: project.name,
  })
  const { patch: regenerate, processing: regenerating } = useForm()

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(project.apiKey)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
    } catch (err) {
      console.error('Failed to copy API key:', err)
    }
  }

  const toggleKeyVisibility = () => {
    setKeyVisible(!keyVisible)
  }

  const startEditing = () => {
    setIsEditing(true)
    setData('name', project.name)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    reset()
  }

  const openRegenerateModal = (projectId: number) => {
    setRegenerateModal({ isOpen: true, projectId })
  }

  const closeRegenerateModal = () => {
    setRegenerateModal({ isOpen: false, projectId: null })
  }

  const saveEditing = () => {
    patch(`/projects/${project.id}`, {
      onSuccess: () => {
        setIsEditing(false)
      },
      onError: () => {
        setIsEditing(false)
      },
    })
  }

  const handleDelete = () => {
    setShowDeleteModal(false)
    destroy(`/projects/${project.id}`)
  }

  const handleRegenerate = () => {
    if (regenerateModal.projectId) {
      regenerate(`/projects/${regenerateModal.projectId}/regenerate-api-key`, {
        onSuccess: () => {
          closeRegenerateModal()
        },
      })
    }
  }

  return (
    <>
      <Head title={`${project.name} - Project Details`} />
      <FlashNotification flash={flash} />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Projects
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              {isEditing ? (
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="border-b-2 border-indigo-500 bg-transparent text-3xl font-bold tracking-tight text-gray-900 focus:border-indigo-600 focus:outline-none sm:text-4xl"
                    autoFocus
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={saveEditing}
                      disabled={updateProcessing}
                      className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                    >
                      <Save className="mr-1 h-4 w-4" />
                      {updateProcessing ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                    >
                      <X className="mr-1 h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {project.name}
                  </h1>
                  <button
                    onClick={startEditing}
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
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={processing}
                className="inline-flex items-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-colors hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </header>

        {project.notificationsCount === 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                  <span className="text-lg">🔔</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-base font-medium text-amber-800">No Notifications Yet</h3>
                <p className="mb-3 text-sm text-amber-700">
                  This project doesn't have any notifications yet. Start building your notification
                  system by creating your first notification.
                </p>
                <Link
                  href={`/projects/${project.id}/notifications/create`}
                  className="inline-flex items-center rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none"
                >
                  Create First Notification
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">API Key</h2>
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Your Project API Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 rounded-lg bg-gray-100 px-3 py-2 font-mono text-sm break-all text-gray-800">
                      {keyVisible ? project.apiKey : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openRegenerateModal(project.id)
                      }}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-orange-100 hover:text-orange-600"
                      title="Regenerate API key"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={toggleKeyVisibility}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      title={keyVisible ? 'Hide API key' : 'Show API key'}
                    >
                      {keyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  <p className="mt-2 text-xs text-gray-500">
                    Use this API key to authenticate your notification requests. Keep it secure and
                    never share it publicly.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Project Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Project Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Notifications</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {project.notificationsCount !== undefined ? (
                      project.notificationsCount > 0 ? (
                        <span className="flex items-center">
                          <span className="mr-2">🔔</span>
                          {project.notificationsCount} notification
                          {project.notificationsCount !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-gray-400">No notifications yet</span>
                      )
                    ) : (
                      <span className="text-gray-400">Loading...</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {project.notificationsCount !== 0 && (
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Link
                    href={`/projects/${project.id}/notifications/create`}
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
                    href={`/projects/${project.id}/notifications`}
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
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={() => setShowDeleteModal(false)}
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
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={closeRegenerateModal}
              disabled={regenerating}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {regenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Regenerate API Key</span>
                </div>
              )}
            </button>
          </div>
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

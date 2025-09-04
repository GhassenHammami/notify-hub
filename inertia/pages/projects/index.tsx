import { Head, Link, useForm, usePage, Form } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { useState } from 'react'
import Modal from '~/components/ui/Modal'
import { route } from '@izzyjs/route/client'
import Project from '#models/project'
import {
  Plus,
  Settings,
  Trash2,
  Copy,
  Check,
  Eye,
  EyeOff,
  CheckCircle,
  Calendar,
  Star,
} from 'lucide-react'

interface ProjectsIndexProps {
  projects: Project[]
}

const ProjectsIndex: InertiaPage<ProjectsIndexProps> = ({ projects }) => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [copiedKey, setCopiedKey] = useState<number | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set())
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; projectId: number | null }>({
    isOpen: false,
    projectId: null,
  })
  const { delete: destroy, processing } = useForm()

  const copyApiKey = async (apiKey: string, projectId: number) => {
    try {
      await navigator.clipboard.writeText(apiKey)
      setCopiedKey(projectId)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy API key:', err)
    }
  }

  const toggleKeyVisibility = (projectId: number) => {
    const newVisibleKeys = new Set(visibleKeys)
    if (newVisibleKeys.has(projectId)) {
      newVisibleKeys.delete(projectId)
    } else {
      newVisibleKeys.add(projectId)
    }
    setVisibleKeys(newVisibleKeys)
  }

  const openDeleteModal = (projectId: number) => {
    setDeleteModal({ isOpen: true, projectId })
  }

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, projectId: null })
  }

  const handleDelete = () => {
    if (deleteModal.projectId) {
      destroy(`/projects/${deleteModal.projectId}`)
      closeDeleteModal()
    }
  }

  return (
    <>
      <Head title="Projects" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Projects
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Manage your notification projects and API keys.
              </p>
            </div>
            <Link
              href={route('projects.create')}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              <Plus className="h-4 w-4 min-sm:mr-2" />
              <p className="max-sm:hidden">New Project</p>
            </Link>
          </div>
        </header>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 shadow-lg">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Settings className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">No Projects Yet</h3>
              <p className="mb-8 max-w-md text-gray-600">
                Create your first project to start sending notifications. Each project gets its own
                unique API key.
              </p>
              <Link
                href={route('projects.create')}
                className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Project
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 min-[74rem]:grid-cols-4 2xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`transform overflow-hidden rounded-2xl p-4 shadow-lg transition-transform duration-200 hover:scale-[1.05] hover:shadow-xl sm:p-6 min-[70rem]:col-span-2 2xl:col-span-1 ${
                  currentProject?.id === project.id
                    ? 'border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50'
                    : 'bg-white'
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
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
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span>
                        Created {new Date(project.createdAt as any).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div
                        className={`h-2 w-2 rounded-full ${project.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                      ></div>
                      <span
                        className={`text-xs font-medium ${project.isActive ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openDeleteModal(project.id)
                    }}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">API Key</label>
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                    <code className="min-w-0 flex-1 rounded-lg bg-gray-100 px-3 py-2 font-mono text-xs break-all text-gray-800 sm:text-sm">
                      {visibleKeys.has(project.id)
                        ? project.apiKey
                        : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleKeyVisibility(project.id)
                        }}
                        className="flex-shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title={visibleKeys.has(project.id) ? 'Hide API key' : 'Show API key'}
                      >
                        {visibleKeys.has(project.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          copyApiKey(project.apiKey, project.id)
                        }}
                        className="flex-shrink-0 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title="Copy API key"
                      >
                        {copiedKey === project.id ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={route('projects.show', { params: { id: project.id.toString() } })}
                    className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                  >
                    View Details →
                  </Link>

                  <div className="flex items-center gap-2">
                    {!project.isDefault && (
                      <Form
                        method="patch"
                        action={route('projects.setAsDefault', {
                          params: { id: project.id.toString() },
                        })}
                      >
                        {({ processing }) => (
                          <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700 transition-colors hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            title="Set as default project"
                          >
                            {processing ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-yellow-300 border-t-yellow-600" />
                            ) : (
                              <Star className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </Form>
                    )}

                    {currentProject?.id !== project.id && (
                      <Form
                        method="post"
                        action={route('projects.switch')}
                        transform={(data) => ({ ...data, projectId: project.id })}
                      >
                        {({ processing }) => (
                          <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-2 text-sm font-medium whitespace-nowrap text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md"
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
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
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
          Are you sure you want to delete this project? This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default ProjectsIndex

import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { ArrowLeft, Plus } from 'lucide-react'
import FlashNotification from '~/components/ui/FlashNotification'

const CreateProject: InertiaPage = () => {
  const { flash } = usePage().props as {
    flash?: { success?: string; error?: string; warning?: string; info?: string }
  }
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/projects')
  }

  return (
    <>
      <Head title="Create Project" />
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
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Create New Project
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Create a new project to start sending notifications. Each project gets its own unique
              API key.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter project name"
                  required
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                <p className="mt-2 text-sm text-gray-500">
                  Choose a descriptive name for your project (e.g., "Production App", "Staging
                  Environment")
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Plus className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">What happens next?</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>A unique 32-character API key will be generated automatically</li>
                        <li>You can start creating notification templates for this project</li>
                        <li>Use the API key to authenticate your notification requests</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6">
                <Link
                  href="/projects"
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={processing || !data.name.trim()}
                  className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
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

export default CreateProject

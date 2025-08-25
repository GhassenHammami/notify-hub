import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { FolderKanban, Save, ArrowLeft } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { route } from '@izzyjs/route/client'

const CreateProject: InertiaPage = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('projects.store').path)
  }

  return (
    <>
      <Head title="Create Project" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4">
                <Link
                  href={route('projects.index')}
                  className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create New Project
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Create a new project to start sending notifications
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                    placeholder="Enter project name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a descriptive name for your project (e.g., "Marketing Campaigns", "User
                    Notifications")
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start">
                    <FolderKanban className="mt-0.5 mr-3 h-5 w-5 text-gray-600" />
                    <div className="text-sm text-gray-700">
                      <h4 className="font-medium">What happens next?</h4>
                      <ul className="mt-2 space-y-1">
                        <li>• A unique API key will be generated for your project</li>
                        <li>• You'll be able to create notification templates</li>
                        <li>• Start sending notifications through multiple channels</li>
                        <li>• Track delivery status and analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end space-x-3 border-t border-gray-200 pt-6">
                <Link
                  href={route('projects.index')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={processing || !data.name.trim()}
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

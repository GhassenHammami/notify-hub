import { Head, useForm, Link } from '@inertiajs/react'
import { FileText, ArrowLeft, Save, Bell } from 'lucide-react'
import { InertiaPage } from '~/app/app'
import { channelConfig } from './create'
import ChannelIcon from '~/components/ui/ChannelIcon'
import Template from '#models/template'

interface TemplatesEditProps {
  template: Template
}

const TemplatesEdit: InertiaPage<TemplatesEditProps> = ({ template }) => {
  const { data, setData, patch, processing, errors } = useForm({
    content: template.content,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    patch(`/templates/${template.id}`)
  }

  return (
    <>
      <Head title={`Edit ${template.channel} Template`} />

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-col space-y-4">
            <Link
              href="/templates"
              className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Edit Template
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Update the content for your {template.channel.toLowerCase()} template
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                <Bell className="h-5 w-5 text-indigo-600" />
                Template Information
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-500 uppercase">
                        Notification
                      </label>
                      <div className="text-lg font-semibold text-gray-900">
                        {template.notification.title}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2">
                      <ChannelIcon channel={template.channel} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold tracking-wide text-gray-500 uppercase">
                        Channel Type
                      </label>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${channelConfig[template.channel].color}`}
                        >
                          {template.channel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                <FileText className="h-5 w-5 text-indigo-600" />
                Template Content
              </h2>

              <div className={`mb-4 rounded-lg p-4 ${channelConfig[template.channel].color}`}>
                <p className="text-sm">
                  💡 <strong>Tip:</strong> {channelConfig[template.channel].description}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Template Content
                </label>
                <textarea
                  value={data.content}
                  onChange={(e) => setData('content', e.target.value)}
                  rows={8}
                  className="block w-full rounded-lg border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder={channelConfig[template.channel].placeholder}
                  required
                />
                {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-6">
              <Link
                href="/templates"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={processing || !data.content.trim()}
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processing ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="mr-2 h-4 w-4" />
                    <span>Update Template</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default TemplatesEdit

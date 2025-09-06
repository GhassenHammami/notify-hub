import { Head, useForm, Link } from '@inertiajs/react'
import { FileText, ArrowLeft, Save, Bell } from 'lucide-react'
import { InertiaPage } from '~/app/app'
import ChannelIcon from '~/components/ui/ChannelIcon'
import Template from '#models/template'
import PhoneMockup from '~/components/templates/PhoneMockup'
import AttributeType from '#enums/attribute_type'
import TemplateEditor, { TemplateEditorAttribute } from '~/components/templates/TemplateEditor'
import { route } from '@izzyjs/route/client'
import { templateChannelConfig } from '~/utils/templateChannelConfig'
import Channel from '#enums/channel'
import { b64toBlob } from '~/utils/b64toBlob'

interface TemplatesEditProps {
  template: Template
}

const TemplatesEdit: InertiaPage<TemplatesEditProps> = ({ template }) => {
  const originalContent = template.content

  const extractAttributes = (content: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g
    const attributes = new Set<string>()
    let match

    while ((match = regex.exec(content)) !== null) {
      attributes.add(match[1])
    }

    return Array.from(attributes).sort()
  }

  const { data, setData, patch, processing, errors, transform } = useForm({
    content: template.content,
    attributes: (template.attributes || []).map((attr) => ({
      name: attr.name,
      type: attr.type,
      isRequired: attr.isRequired,
    })) as TemplateEditorAttribute[],
    images: undefined as File[] | undefined,
  })

  transform((payload) => {
    if (template.channel === Channel.EMAIL) {
      let template = payload.content
      const files: File[] = []
      const imageMap = new Map<string, string>()
      const regex = /<img[^>]+src="(data:image\/[^"]+)"/g

      let match
      let i = 0

      while ((match = regex.exec(payload.content)) !== null) {
        const base64 = match[1]

        let imgId = imageMap.get(base64)
        if (!imgId) {
          const mimeMatch = base64.match(/^data:(image\/\w+);base64,/)
          const mimeType = mimeMatch ? mimeMatch[1] : 'image/png'

          const blob = b64toBlob(base64.split(',')[1], mimeType)
          const file = new File([blob], `image_${i}.${mimeType.split('/')[1]}`, { type: mimeType })
          files.push(file)

          imgId = `__IMG_${i}__`
          imageMap.set(base64, imgId)

          i++
        }

        template = template.replace(base64, imgId)
      }

      return {
        ...payload,
        content: template,
        images: files.length > 0 ? files : undefined,
      }
    }

    return { ...payload }
  })

  const hasContentChanged = (): boolean => {
    const normalize = (str: string): string => str.replace(/\s+/g, ' ').trim()
    return normalize(data.content) !== normalize(originalContent)
  }

  const hasAttributesChanged = (): boolean => {
    const originalAttributes = (template.attributes || []).map((attr) => ({
      name: attr.name,
      type: attr.type,
      isRequired: attr.isRequired,
    }))

    if (originalAttributes.length !== data.attributes.length) {
      return true
    }

    return originalAttributes.some((originalAttr, index) => {
      const currentAttr = data.attributes[index]
      return (
        !currentAttr ||
        originalAttr.name !== currentAttr.name ||
        originalAttr.type !== currentAttr.type ||
        originalAttr.isRequired !== currentAttr.isRequired
      )
    })
  }

  const hasChanges = (): boolean => {
    return hasContentChanged() || hasAttributesChanged()
  }

  const handleContentChange = (content: string) => {
    const attributes = extractAttributes(content)

    const currentAttributeNames = data.attributes.map((attr) => attr.name)
    const missingAttributes = attributes.filter((v) => !currentAttributeNames.includes(v))

    const mergedAttributes = [
      ...data.attributes,
      ...missingAttributes.map((attributeName) => ({
        name: attributeName,
        type: AttributeType.TEXT,
        isRequired: true,
      })),
    ]

    const updatedAttributes = mergedAttributes.filter((attr) => attributes.includes(attr.name))

    setData('content', content)
    setData('attributes', updatedAttributes)
  }

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
              href={route('templates.index')}
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

        <div className="mx-auto lg:px-7 2xl:px-14">
          <div className="flex gap-8">
            <div className="flex-1">
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
                              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${templateChannelConfig[template.channel].color}`}
                            >
                              {template.channel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <TemplateEditor
                  content={data.content}
                  onContentChange={(content) => handleContentChange(content)}
                  selectedChannel={template.channel}
                  onAttributesChange={(attributes) => setData('attributes', attributes)}
                  errors={errors}
                  disabled={false}
                  attributes={data.attributes}
                />

                <div className="flex items-center justify-end space-x-3 pt-6">
                  <Link
                    href={route('templates.index')}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={processing || !data.content.trim() || !hasChanges()}
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
            {template.channel !== Channel.EMAIL && (
              <div className="sticky top-24 z-50 h-fit self-start max-xl:hidden">
                <PhoneMockup
                  channel={template.channel}
                  content={data.content}
                  notificationTitle={template.notification.title}
                  attributes={data.attributes}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TemplatesEdit

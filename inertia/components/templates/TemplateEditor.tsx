import React, { useState, useRef } from 'react'
import { AlertCircle, Plus, Info } from 'lucide-react'
import AttributeType from '#enums/attribute_type'
import Attribute from '#models/attribute'
import Channel from '#enums/channel'
import AttributeTag from '~/components/ui/AttributeTag'
import { templateChannelConfig } from '~/utils/templateChannelConfig'
import EmailTemplateEditor from './EmailTemplateEditor/EmailTemplateEditor'

export type TemplateEditorAttribute = Pick<Attribute, 'name' | 'type' | 'isRequired'>

interface TemplateEditorProps {
  content: string
  onContentChange: (content: string) => void
  attributes: TemplateEditorAttribute[]
  onAttributesChange: (attributes: TemplateEditorAttribute[]) => void
  selectedChannel?: Channel | null
  placeholder?: string
  rows?: number
  disabled?: boolean
  errors?: Record<string, string>
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({
  content,
  onContentChange,
  attributes,
  onAttributesChange,
  selectedChannel,
  placeholder,
  rows = 8,
  disabled = false,
  errors,
}) => {
  const [showAddAttribute, setShowAddAttribute] = useState(false)
  const [newAttributeName, setNewAttributeName] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAddAttribute = () => {
    if (!newAttributeName.trim() || !textareaRef.current) return

    const textarea = textareaRef.current
    const cursorPos = textarea.selectionStart
    const attributeText = `{{${newAttributeName.trim()}}}`

    const newContent = content.slice(0, cursorPos) + attributeText + content.slice(cursorPos)
    onContentChange(newContent)

    setNewAttributeName('')
    setShowAddAttribute(false)

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newCursorPos = cursorPos + attributeText.length
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  const handleRemoveAttribute = (attributeName: string) => {
    const regex = new RegExp(`\\{\\{${attributeName}\\}\\}`, 'g')
    const newContent = content.replace(regex, '')
    onContentChange(newContent)
  }

  const updateAttribute = (index: number, field: keyof TemplateEditorAttribute, value: any) => {
    const updatedAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: value } : attr
    )
    onAttributesChange(updatedAttributes)
  }

  const handleTypeChange = (index: number, type: AttributeType) => {
    updateAttribute(index, 'type', type)
  }

  const handleRequiredChange = (index: number, isRequired: boolean) => {
    updateAttribute(index, 'isRequired', isRequired)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && showAddAttribute) {
      e.preventDefault()
      handleAddAttribute()
    } else if (e.key === 'Escape') {
      setShowAddAttribute(false)
      setNewAttributeName('')
    }
  }

  const getPlaceholder = () => {
    if (placeholder) return placeholder
    if (selectedChannel && templateChannelConfig[selectedChannel]) {
      return templateChannelConfig[selectedChannel].placeholder
    }
    return 'Select a channel first...'
  }

  const isDisabled = disabled || !selectedChannel

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <svg
          className="h-5 w-5 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Template Content
      </h2>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Need help with attributes?</span>
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200"
            >
              <Info className="h-3 w-3" />
              Using Attributes
            </button>
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="w-80 rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-lg">
                <div className="text-sm text-blue-700">
                  <p className="mb-2 font-medium">💡 Using Attributes</p>
                  <p className="mb-3">
                    Add dynamic content using attributes like{' '}
                    <code className="rounded bg-blue-100 px-1 py-0.5 font-mono text-xs text-blue-800">
                      {'{{username}}'}
                    </code>{' '}
                    or{' '}
                    <code className="rounded bg-blue-100 px-1 py-0.5 font-mono text-xs text-blue-800">
                      {'{{order_id}}'}
                    </code>
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-xs">
                    <li>
                      Type{' '}
                      <code className="rounded bg-blue-100 px-1 py-0.5 font-mono text-blue-800">
                        {'{{attribute_name}}'}
                      </code>{' '}
                      manually
                    </li>
                    <li>Use the + button to insert attributes at your cursor position</li>
                    <li>Attributes are automatically highlighted and listed below</li>
                  </ul>
                </div>
                <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-transparent border-t-blue-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedChannel && (
        <div className={`mb-4 rounded-lg p-4 ${templateChannelConfig[selectedChannel].color}`}>
          <p className={`text-sm ${templateChannelConfig[selectedChannel].color}`}>
            💡 <strong>Tip:</strong> {templateChannelConfig[selectedChannel].description}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="flex h-10 items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Template Content</label>
              <div className="flex items-center gap-2">
                {!showAddAttribute ? (
                  <button
                    type="button"
                    onClick={() => setShowAddAttribute(true)}
                    className="flex size-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition-colors hover:bg-indigo-200"
                    title="Add attribute"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      value={newAttributeName}
                      onChange={(e) => setNewAttributeName(e.target.value)}
                      placeholder="Attribute name"
                      className="w-32 rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddAttribute()
                        } else if (e.key === 'Escape') {
                          setShowAddAttribute(false)
                          setNewAttributeName('')
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddAttribute}
                      disabled={!newAttributeName.trim()}
                      className="rounded-md bg-indigo-600 px-2 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddAttribute(false)
                        setNewAttributeName('')
                      }}
                      className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {selectedChannel === Channel.EMAIL ? (
              <EmailTemplateEditor
                content={content.trim() !== '' ? content : undefined}
                onContentChange={(newContent) => onContentChange(newContent)}
              />
            ) : (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={rows}
                className="block w-full rounded-lg border-gray-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={getPlaceholder()}
                required
                disabled={isDisabled}
              />
            )}

            {(errors?.content || errors?.images) && (
              <div className="mt-3 space-y-2">
                {errors.content && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <p className="mt-1 text-sm text-red-700">{errors.content}</p>
                  </div>
                )}

                {errors.images && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <p className="mt-1 text-sm text-red-700">{errors.images}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {attributes && attributes.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-3 text-sm font-medium text-gray-900">Attributes Used</h4>
              <div className="flex flex-wrap gap-2">
                {attributes.map((attribute) => (
                  <AttributeTag
                    key={attribute.name}
                    attribute={attribute}
                    onRemove={handleRemoveAttribute}
                    showIcon={true}
                    showRemoveButton={true}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-600">
                Attributes are automatically detected and highlighted. Use the + button to add new
                attributes at your cursor position.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Attribute Properties</h3>
              <p className="text-xs text-gray-500">
                Configure types and requirements for your template attributes
              </p>
            </div>
          </div>

          {attributes.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center">
              <div className="text-gray-400">
                <p className="text-sm">No attributes found</p>
                <p className="text-xs">
                  Add {'{{attributes}}'} to your template content to generate attributes
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {attributes.map((attribute, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium tracking-wide text-gray-600 uppercase">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={attribute.name}
                          readOnly
                          className="w-full cursor-not-allowed rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm text-gray-600"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <span className="text-xs text-gray-400">Auto</span>
                        </div>
                      </div>
                      {errors?.[`attributes.${index}.name`] && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors[`attributes.${index}.name`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium tracking-wide text-gray-600 uppercase">
                        Type
                      </label>
                      <select
                        value={attribute.type}
                        onChange={(e) => handleTypeChange(index, e.target.value as AttributeType)}
                        className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      >
                        <option value={AttributeType.TEXT}>Text</option>
                        <option value={AttributeType.NUMBER}>Number</option>
                        <option value={AttributeType.DATE}>Date</option>
                      </select>
                      {errors?.[`attributes.${index}.type`] && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors[`attributes.${index}.type`]}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start">
                      <label className="flex items-center sm:mt-6">
                        <input
                          type="checkbox"
                          checked={attribute.isRequired}
                          onChange={(e) => handleRequiredChange(index, e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Required</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {errors?.attributes && <p className="text-sm text-red-600">{errors.attributes}</p>}
        </div>
      </div>
    </div>
  )
}

export default TemplateEditor

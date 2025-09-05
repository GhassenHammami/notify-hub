import React from 'react'
import { Calendar, Hash, Type, X } from 'lucide-react'
import AttributeType from '#enums/attribute_type'

const attributeTypeIcons = {
  [AttributeType.DATE]: Calendar,
  [AttributeType.NUMBER]: Hash,
  [AttributeType.TEXT]: Type,
} as const

interface AttributeTagProps {
  attribute: {
    name: string
    type: AttributeType
    isRequired: boolean
  }
  size?: 'sm' | 'md'
  onRemove?: (attributeName: string) => void
  showIcon?: boolean
  showRemoveButton?: boolean
}

const AttributeTag: React.FC<AttributeTagProps> = ({
  attribute,
  size = 'md',
  onRemove,
  showIcon = true,
  showRemoveButton = false,
}) => {
  const Icon = attributeTypeIcons[attribute.type]

  const sizeClasses = {
    sm: {
      container: 'px-2 py-0.5 text-xs',
      icon: 'h-3 w-3',
      removeButton: 'p-0.5',
      removeIcon: 'h-2.5 w-2.5',
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'h-3 w-3',
      removeButton: 'p-0.5',
      removeIcon: 'h-3 w-3',
    },
  }

  const currentSize = sizeClasses[size]

  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 ${currentSize.container} text-blue-800`}
    >
      <span className="font-mono">{attribute.name}</span>
      <span className={`font-bold text-red-500 ${attribute.isRequired ? '' : 'invisible'}`}>*</span>

      {showIcon && (
        <div className="flex items-center">
          <Icon className={`${currentSize.icon} text-blue-600`} />
        </div>
      )}

      {showRemoveButton && onRemove && (
        <button
          type="button"
          onClick={() => onRemove(attribute.name)}
          className={`rounded-full bg-blue-200 ${currentSize.removeButton} text-blue-600 transition-colors hover:bg-blue-300`}
          title={`Remove all instances of {{${attribute.name}}}`}
        >
          <X className={currentSize.removeIcon} />
        </button>
      )}
    </div>
  )
}

export default AttributeTag

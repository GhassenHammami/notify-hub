import React from 'react'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  form?: string
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className = '',
  form,
}) => {
  const sizeClasses = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-7',
  }

  const dotSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const dotTranslateClasses = {
    sm: checked ? 'translate-x-4' : 'translate-x-0',
    md: checked ? 'translate-x-5' : 'translate-x-0',
    lg: checked ? 'translate-x-7' : 'translate-x-0',
  }

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <div className={`flex items-center ${className}`}>
      {label && <span className="mr-3 text-sm font-medium text-gray-700">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        form={form}
        className={`relative inline-flex items-center ${sizeClasses[size]} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none ${checked ? 'bg-indigo-600' : 'bg-gray-400'} ${disabled ? 'cursor-not-allowed opacity-50' : checked ? 'hover:bg-indigo-500' : 'hover:bg-gray-500'} `}
      >
        <span
          className={`pointer-events-none inline-block ${dotSizeClasses[size]} transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${dotTranslateClasses[size]} `}
        />
      </button>
    </div>
  )
}

export default Toggle

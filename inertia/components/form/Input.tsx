import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

type InputType = 'text' | 'email' | 'password'

interface InputProps {
  id?: string
  label?: string
  type?: InputType
  value: string
  setValue: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string | null
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  className?: string
  inputClassName?: string
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  setValue,
  placeholder,
  required,
  disabled,
  error,
  onBlur,
  className,
  inputClassName,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const isPassword = type === 'password'

  const baseInputClasses =
    'w-full rounded-lg border px-3 py-2 sm:py-2.5 bg-white text-sm sm:text-base focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-600 disabled:placeholder-gray-500 disabled:cursor-not-allowed'
  const borderClass = disabled ? 'border-gray-400' : error ? 'border-red-500' : 'border-gray-300'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
          {required ? ' *' : ''}
        </label>
      )}

      <div className={isPassword ? 'relative' : undefined}>
        <input
          id={id}
          name={id}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${baseInputClasses} ${borderClass} ${isPassword ? 'pr-10' : ''} ${
            inputClassName || ''
          }`}
        />

        {isPassword && (
          <button
            tabIndex={-1}
            type="button"
            disabled={disabled}
            className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              if (disabled) return
              setShowPassword((prev) => !prev)
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={20} strokeWidth={1.5} className="text-gray-500" />
            ) : (
              <Eye size={20} strokeWidth={1.5} className="text-gray-500" />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Input

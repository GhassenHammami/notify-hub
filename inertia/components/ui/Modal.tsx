import { Fragment, ReactNode, useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  showHeader?: boolean
  showFooter?: boolean
  footer?: ReactNode
  icon?: ReactNode
  iconClassName?: string
  variant?: 'default' | 'danger' | 'warning' | 'success' | 'info'
  centered?: boolean
  scrollable?: boolean
  backdrop?: boolean
  backdropClassName?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  showHeader = true,
  showFooter = false,
  footer,
  icon,
  iconClassName = '',
  variant = 'default',
  centered = true,
  scrollable = false,
  backdrop = true,
  backdropClassName = '',
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setIsVisible(false)
        document.body.style.overflow = 'unset'
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  }

  const variantClasses = {
    default: {
      header: 'border-gray-200 bg-white',
      icon: 'text-gray-600',
      title: 'text-gray-900',
    },
    danger: {
      header: 'border-red-200 bg-white',
      icon: 'text-red-500',
      title: 'text-gray-900',
    },
    warning: {
      header: 'border-amber-200 bg-white',
      icon: 'text-amber-500',
      title: 'text-gray-900',
    },
    success: {
      header: 'border-green-200 bg-white',
      icon: 'text-green-500',
      title: 'text-gray-900',
    },
    info: {
      header: 'border-blue-200 bg-white',
      icon: 'text-blue-500',
      title: 'text-gray-900',
    },
  }

  const styles = variantClasses[variant]

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <Fragment>
      {backdrop && (
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-200 ease-out ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          } ${backdropClassName}`}
          onClick={handleBackdropClick}
        />
      )}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${centered ? '' : 'items-start pt-20'}`}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div
          className={`relative w-full transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${
            isAnimating ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
          } ${sizeClasses[size]} ${className}`}
        >
          {showHeader && (
            <div
              className={`flex items-center justify-between border-b p-6 ${styles.header} ${headerClassName}`}
            >
              <div className="flex items-center space-x-3">
                {icon && <div className={`rounded-lg p-2 ${iconClassName}`}>{icon}</div>}
                {title && <h3 className={`text-lg font-semibold ${styles.title}`}>{title}</h3>}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          <div className={`${scrollable ? 'max-h-96 overflow-y-auto' : ''} ${bodyClassName}`}>
            {children}
          </div>

          {showFooter && footer && (
            <div
              className={`flex items-center justify-end space-x-3 border-t border-gray-200 bg-gray-50 p-6 ${footerClassName}`}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

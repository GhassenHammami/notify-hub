import React, { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

export interface FlashMessage {
  success?: string
  error?: string
  warning?: string
  info?: string
}

interface FlashNotificationProps {
  flash?: FlashMessage
}

const FlashNotification: React.FC<FlashNotificationProps> = ({ flash }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<{
    type: keyof FlashMessage
    message: string
  } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (flash) {
      const messageTypes: (keyof FlashMessage)[] = ['success', 'error', 'warning', 'info']
      for (const type of messageTypes) {
        if (flash[type]) {
          setCurrentMessage({ type, message: flash[type]! })
          setIsVisible(false)
          setIsAnimating(true)
          setTimeout(() => {
            setIsVisible(true)
          }, 50)
          break
        }
      }
    }
  }, [flash])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          setCurrentMessage(null)
          setIsAnimating(false)
        }, 500)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!currentMessage || !isAnimating) {
    return null
  }

  const getIcon = (type: keyof FlashMessage) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />
      default:
        return null
    }
  }

  const getStyles = (type: keyof FlashMessage) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  return (
    <div
      className={`fixed top-[calc(var(--navbar-height)+1rem)] right-4 z-50 max-w-sm transform rounded-lg border p-4 shadow-lg transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-95 opacity-0'
      } ${getStyles(currentMessage.type)}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{getIcon(currentMessage.type)}</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{currentMessage.message}</p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => {
                setCurrentMessage(null)
                setIsAnimating(false)
              }, 500)
            }}
            className="inline-flex rounded-md p-1 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlashNotification

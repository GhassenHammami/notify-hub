import React, { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X, LucideIcon } from 'lucide-react'

export interface FlashMessage {
  success?: string
  error?: string
  warning?: string
  info?: string
}

interface FlashNotificationProps {
  flash?: FlashMessage
}

type FlashType = keyof FlashMessage

interface FlashConfig {
  icon: LucideIcon
  color: string
}

const flashConfigMap: Record<FlashType, FlashConfig> = {
  success: {
    icon: CheckCircle,
    color: 'bg-green-50 text-green-800 border-l-green-300',
  },
  error: {
    icon: XCircle,
    color: 'bg-red-50 text-red-800 border-l-red-300',
  },
  warning: {
    icon: AlertTriangle,
    color: 'bg-yellow-50 text-yellow-800 border-l-yellow-300',
  },
  info: {
    icon: Info,
    color: 'bg-blue-50 text-blue-800 border-l-blue-300',
  },
}

const FlashNotification: React.FC<FlashNotificationProps> = ({ flash }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<{
    type: FlashType
    message: string
  } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!flash) return
    const messageTypes: FlashType[] = ['success', 'error', 'warning', 'info']
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

  if (!currentMessage || !isAnimating) return null

  const config = flashConfigMap[currentMessage.type]
  const Icon = config.icon

  return (
    <div
      className={`fixed top-[calc(var(--navbar-height)+1rem)] right-4 z-40 max-w-sm transform rounded-lg border-l-4 p-4 shadow-lg transition-all duration-500 ease-out ${
        isVisible ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-95 opacity-0'
      } ${config.color}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.color}`} />
        </div>
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

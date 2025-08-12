import React from 'react'
import { Mail, MessageSquare, Bell } from 'lucide-react'

const notifications = [
  {
    id: 1,
    type: 'email',
    title: 'Welcome Email',
    recipient: 'john@example.com',
    status: 'delivered',
    time: '2 minutes ago',
    icon: Mail,
  },
  {
    id: 2,
    type: 'sms',
    title: 'OTP Code',
    recipient: '+1234567890',
    status: 'delivered',
    time: '5 minutes ago',
    icon: MessageSquare,
  },
  {
    id: 3,
    type: 'push',
    title: 'New Update Available',
    recipient: 'All Users',
    status: 'sent',
    time: '10 minutes ago',
    icon: Bell,
  },
]

const RecentNotifications: React.FC = () => {
  return (
    <div className="divide-y divide-gray-100">
      {notifications.map((notification) => {
        const Icon = notification.icon
        const typeColors = {
          email: 'bg-blue-50 text-blue-600',
          sms: 'bg-purple-50 text-purple-600',
          push: 'bg-green-50 text-green-600',
        }

        return (
          <div
            key={notification.id}
            className="flex items-center gap-4 py-4 transition-colors duration-200 hover:bg-gray-50"
          >
            <div className={`rounded-xl p-2 ${typeColors[notification.type as keyof typeof typeColors]}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-medium text-gray-900">{notification.title}</h4>
              <p className="text-sm text-gray-500">{notification.recipient}</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                  notification.status === 'delivered'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-700'
                }`}
              >
                {notification.status}
              </span>
              <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecentNotifications

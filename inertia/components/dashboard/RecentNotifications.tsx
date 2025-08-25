import React from 'react'
import { Inbox } from 'lucide-react'
import ChannelIcon from '../ui/ChannelIcon'
import Channel from '#enums/channel'
import { getChannelBg } from '~/utils/channels'

interface NotificationItem {
  id: number
  type: Channel
  title: string
  recipient: string
  status: string
  time: string
}

interface RecentNotificationsProps {
  notifications: NotificationItem[]
}

const RecentNotifications: React.FC<RecentNotificationsProps> = ({ notifications }) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
          <Inbox className="h-8 w-8 text-gray-400" />
        </div>
        <h4 className="mb-2 text-lg font-medium text-gray-900">No Recent Notifications</h4>
        <p className="max-w-xs text-sm text-gray-500">
          When you send notifications, they'll appear here for quick access and monitoring.
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {notifications.map((notification) => {
        return (
          <div
            key={notification.id}
            className="flex items-center gap-4 py-4 transition-colors duration-200 hover:bg-gray-50"
          >
            <div className={`rounded-xl p-2 text-white ${getChannelBg(notification.type, 500)}`}>
              <ChannelIcon channel={notification.type} />
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

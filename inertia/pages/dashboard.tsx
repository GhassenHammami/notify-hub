import { Head, Link } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { BarChart3, Bell, FolderOpen, FileText, TrendingUp, LucideIcon } from 'lucide-react'
import NotificationsChart from '~/components/dashboard/NotificationsChart'
import RecentNotifications from '~/components/dashboard/RecentNotifications'
import type { DashboardData } from '#controllers/dashboard_controller'
import { formatChannelName, getChannelBg, getChannelText } from '~/utils/channels'
import ChannelIcon from '~/components/ui/ChannelIcon'
import { route } from '@izzyjs/route/client'

export interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
}

const Dashboard: InertiaPage<DashboardData> = ({ stats, chartData, recentNotifications }) => {
  const mainStatsCards: StatsCardProps[] = [
    {
      title: 'Total Projects',
      value: stats.totalProjects.toLocaleString(),
      icon: FolderOpen,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Total Notifications',
      value: stats.totalNotifications.toLocaleString(),
      icon: Bell,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Total Templates',
      value: stats.totalTemplates.toLocaleString(),
      icon: FileText,
      color: 'bg-teal-50 text-teal-600',
    },
  ]

  const hasNotifications = stats.totalNotifications > 0

  return (
    <>
      <Head title="Dashboard" />
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back! Here's an overview of your notifications.
          </p>
        </header>

        {hasNotifications ? (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mainStatsCards.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="transform overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-500">{stat.title}</h3>
                      <div className={`rounded-xl p-2 ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline">
                      <p className="text-3xl font-bold tracking-tight text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Delivery Statistics</h3>
                  <TrendingUp className="text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {stats.channelDeliveryCounts.map((deliveryCount, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-2 flex justify-center">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg ${getChannelBg(deliveryCount.channel, 100)}`}
                        >
                          <ChannelIcon
                            channel={deliveryCount.channel}
                            className={`h-6 w-6 ${getChannelText(deliveryCount.channel, 600)}`}
                          />
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{deliveryCount.total}</p>
                      <p className="text-sm text-gray-500">
                        {formatChannelName(deliveryCount.channel)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
                  <Bell className="text-gray-400" />
                </div>
                <div className="space-y-3">
                  <Link
                    href={route('notifications.create').path}
                    as="button"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <div className="flex items-center justify-between">
                      <Link href="/notifications/create" className="font-medium text-gray-900">
                        Create Notification
                      </Link>
                      <span className="text-sm text-gray-500">→</span>
                    </div>
                  </Link>
                  <Link
                    href={route('templates.create').path}
                    as="button"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:border-green-300 hover:bg-green-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Create Template</span>
                      <span className="text-sm text-gray-500">→</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="transform overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Notification Activity</h3>
                  <BarChart3 className="text-gray-400" />
                </div>
                <NotificationsChart data={chartData} />
              </div>

              <div className="transform overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Notifications</h3>
                  <Bell className="text-gray-400" />
                </div>
                <RecentNotifications notifications={recentNotifications} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 shadow-lg">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Bell className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">No Notifications Found</h3>
              <p className="mb-8 max-w-md text-gray-600">
                You haven't sent any notifications yet. Start creating notifications to see
                insights, charts, and delivery statistics on your dashboard.
              </p>
              <button className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
                <Bell className="mr-2 h-5 w-5" />
                Start Creating Notifications
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard

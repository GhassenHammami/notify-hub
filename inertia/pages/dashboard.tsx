import { Head } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { BarChart3, Bell, Mail, MessageSquare } from 'lucide-react'
import StatsCard, { StatsCardProps } from '~/components/dashboard/StatsCard'
import NotificationsChart from '~/components/dashboard/NotificationsChart'
import RecentNotifications from '~/components/dashboard/RecentNotifications'

interface DashboardProps {
  stats: {
    totalNotifications: number
    emailDeliveries: number
    smsSent: number
  }
  chartData: {
    labels: string[]
    data: number[]
  }
  recentNotifications: Array<{
    id: number
    type: string
    title: string
    recipient: string
    status: string
    time: string
  }>
}

const Dashboard: InertiaPage = ({ stats, chartData, recentNotifications }: DashboardProps) => {
  const safeStats = {
    totalNotifications: stats?.totalNotifications || 0,
    emailDeliveries: stats?.emailDeliveries || 0,
    smsSent: stats?.smsSent || 0,
  }

  const statsCards: StatsCardProps[] = [
    {
      title: 'Total Notifications',
      value: safeStats.totalNotifications.toLocaleString(),
      icon: Bell,
      color: 'blue',
    },
    {
      title: 'Email Deliveries',
      value: safeStats.emailDeliveries.toLocaleString(),
      icon: Mail,
      color: 'purple',
    },
    {
      title: 'SMS Sent',
      value: safeStats.smsSent.toLocaleString(),
      icon: MessageSquare,
      color: 'green',
    },
  ]

  const hasNotifications = safeStats.totalNotifications > 0

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
              {statsCards.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
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

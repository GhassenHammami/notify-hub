import { Head } from '@inertiajs/react'
import { InertiaPage } from '~/app/app'
import { BarChart3, Bell, Mail, MessageSquare, Users } from 'lucide-react'
import StatsCard, { StatsCardProps } from '~/components/dashboard/StatsCard'
import NotificationsChart from '~/components/dashboard/NotificationsChart'
import RecentNotifications from '~/components/dashboard/RecentNotifications'

const Dashboard: InertiaPage = () => {
  const stats: StatsCardProps[] = [
    {
      title: 'Total Notifications',
      value: '24.5K',
      change: '+12%',
      trend: 'up',
      icon: Bell,
      color: 'blue',
    },
    {
      title: 'Email Deliveries',
      value: '18.2K',
      change: '+8%',
      trend: 'up',
      icon: Mail,
      color: 'purple',
    },
    {
      title: 'SMS Sent',
      value: '4.3K',
      change: '+15%',
      trend: 'up',
      icon: MessageSquare,
      color: 'green',
    },
    {
      title: 'Active Users',
      value: '1.2K',
      change: '+4%',
      trend: 'up',
      icon: Users,
      color: 'indigo',
    },
  ]

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

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="transform overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Notification Activity</h3>
              <BarChart3 className="text-gray-400" />
            </div>
            <NotificationsChart />
          </div>

          <div className="transform overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Recent Notifications</h3>
              <Bell className="text-gray-400" />
            </div>
            <RecentNotifications />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

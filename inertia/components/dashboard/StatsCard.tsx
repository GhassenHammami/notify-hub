import React from 'react'
import { LucideIcon } from 'lucide-react'

export interface StatsCardProps {
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down'
  icon: LucideIcon
  color: 'blue' | 'purple' | 'green' | 'indigo'
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  }

  return (
    <div className="transform overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-500">{title}</h3>
        <div className={`rounded-xl p-2 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline">
        <p className="text-3xl font-bold tracking-tight text-gray-900">{value}</p>
        {change && trend && (
          <p
            className={`ml-2 text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatsCard

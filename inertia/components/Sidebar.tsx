import React from 'react'
import { Link } from '@inertiajs/react'
import { navigationItems } from '../utils/navigation'
import { route } from '@izzyjs/route/client'

const Sidebar: React.FC = () => {
  const isActivePath = (href: string) => {
    const currentRoute = route().current()
    return currentRoute.includes(href)
  }

  return (
    <aside className="sticky top-[var(--navbar-height)] box-border h-[calc(100vh-var(--navbar-height)-1px)] w-64 overflow-hidden border-r border-gray-100 bg-white shadow-sm max-md:hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>
      <div className="border-b border-gray-100 px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        <p className="mt-1 text-sm text-gray-500">Manage your workspace</p>
      </div>

      <nav className="px-4 py-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  isActivePath(item.href)
                    ? 'border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-blue-700 shadow-sm'
                    : 'border-transparent text-gray-700 hover:border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-sm'
                }`}
              >
                <div
                  className={`absolute top-1/2 left-0 h-8 w-1 origin-top -translate-y-1/2 transform rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-500 transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'scale-y-100 opacity-100'
                      : 'scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100'
                  }`}
                />

                <div className="relative">
                  <Icon
                    className={`mr-4 h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                      isActivePath(item.href)
                        ? 'scale-110 text-blue-600'
                        : 'text-gray-400 group-hover:text-blue-600'
                    }`}
                  />
                  <div className="absolute inset-0 scale-0 rounded-full bg-blue-100 opacity-0 transition-opacity duration-300 group-hover:scale-150 group-hover:opacity-20" />
                </div>

                <span className="transition-all duration-300 group-hover:font-semibold">
                  {item.label}
                </span>

                <div className="ml-auto translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <svg
                    className="h-4 w-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-3">
            <div className="flex items-center">
              <div className="mr-3 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-medium text-gray-600">System Online</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar

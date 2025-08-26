import React, { useState, useRef, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { navigationItems } from '../../utils/navigation'
import { route } from '@izzyjs/route/client'
import Project from '#models/project'
import { AlertTriangle, ChevronRight } from 'lucide-react'

const Sidebar: React.FC = () => {
  const { currentProject } = usePage().props as { currentProject?: Project }
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isActivePath = (href: string) => {
    const currentRoute = route().current()
    return currentRoute == href || currentRoute.includes(href + '/')
  }

  const isItemDisabled = (item: any) => {
    return item.requiresProject && !currentProject
  }

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({ x: rect.right + 12, y: rect.top + rect.height / 2 })

    hoverTimeout.current = setTimeout(() => {
      setShowTooltip(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
    setShowTooltip(false)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }
    }
  }, [])

  return (
    <>
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
              const disabled = isItemDisabled(item)

              return (
                <Link
                  key={item.label}
                  href={disabled ? '#' : item.href}
                  onClick={(e) => {
                    if (disabled) {
                      e.preventDefault()
                    }
                  }}
                  onMouseEnter={disabled ? handleMouseEnter : undefined}
                  onMouseLeave={disabled ? handleMouseLeave : undefined}
                  className={`group relative flex items-center rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    disabled
                      ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400 opacity-60'
                      : isActivePath(item.href)
                        ? 'border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 text-blue-700 shadow-sm hover:scale-[1.02]'
                        : 'border-transparent text-gray-700 hover:scale-[1.02] hover:border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-0 h-8 w-1 origin-top -translate-y-1/2 transform rounded-r-full bg-gradient-to-b from-blue-500 to-indigo-500 transition-all duration-300 ${
                      isActivePath(item.href) && !disabled
                        ? 'scale-y-100 opacity-100'
                        : 'scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100'
                    }`}
                  />

                  <div className="relative">
                    <Icon
                      className={`mr-4 h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                        disabled
                          ? 'text-gray-400'
                          : isActivePath(item.href)
                            ? 'scale-110 text-blue-600'
                            : 'text-gray-400 group-hover:scale-110 group-hover:text-blue-600'
                      }`}
                    />
                    {!disabled && (
                      <div className="absolute inset-0 scale-0 rounded-full bg-blue-100 opacity-0 transition-opacity duration-300 group-hover:scale-150 group-hover:opacity-20" />
                    )}
                  </div>

                  <span
                    className={`transition-all duration-300 ${
                      disabled ? '' : 'group-hover:font-semibold'
                    }`}
                  >
                    {item.label}
                  </span>

                  {!disabled && (
                    <div className="ml-auto translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <ChevronRight className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
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

      {showTooltip && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="rounded-lg border border-red-700 bg-red-600 px-3 py-2 text-sm text-white shadow-lg">
            <div className="relative">
              <div className="flex items-center justify-center gap-2 text-center font-medium whitespace-nowrap">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                Select a project to access this feature
              </div>
              <div className="absolute top-1/2 left-0 -ml-1 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-b border-l border-red-700 bg-red-600"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar

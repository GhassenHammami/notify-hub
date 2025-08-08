import React, { useState } from 'react'
import { usePage } from '@inertiajs/react'
import logo from '../public/assets/logo.svg'

interface NavbarProps {
  className?: string
}

interface User {
  id: number
  fullName: string
  email: string
}

interface PageProps {
  user?: User
  [key: string]: any
}

interface NavigationItem {
  label: string
  href: string
  showWhen: 'authenticated' | 'unauthenticated' | 'always'
}

const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: '#', showWhen: 'authenticated' },
  { label: 'My Projects', href: '#', showWhen: 'authenticated' },
  { label: 'Notifications', href: '#', showWhen: 'authenticated' },
  { label: 'API Keys', href: '#', showWhen: 'authenticated' },

  { label: 'Features', href: '#features', showWhen: 'unauthenticated' },
  { label: 'Pricing', href: '#pricing', showWhen: 'unauthenticated' },

  { label: 'Documentation', href: '#', showWhen: 'always' },
]

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = usePage<PageProps>().props

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isAuthenticated = !!user

  const getVisibleItems = (items: NavigationItem[], isAuth: boolean) => {
    return items.filter((item) => {
      if (item.showWhen === 'always') return true
      if (item.showWhen === 'authenticated' && isAuth) return true
      if (item.showWhen === 'unauthenticated' && !isAuth) return true
      return false
    })
  }

  const visibleNavItems = getVisibleItems(navigationItems, isAuthenticated)

  const renderNavLink = (item: NavigationItem, isMobile = false) => (
    <a
      key={item.label}
      href={item.href}
      className={`${
        isMobile
          ? 'text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors'
          : 'text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors'
      }`}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      {item.label}
    </a>
  )

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img className="h-20 w-auto" src={logo} alt="Notify Hub" />
                <div className="ml-3">
                  <h1 className="text-xl font-semibold text-gray-900">Notify Hub</h1>
                </div>
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {visibleNavItems.map((item) => renderNavLink(item))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5 5v-5z"
                      />
                    </svg>
                  </button>

                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user?.fullName?.charAt(0) || 'U'}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <a
                    href="/login"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {visibleNavItems.map((item) => renderNavLink(item, true))}

          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.fullName?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.fullName || 'User'}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user?.email || 'user@example.com'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-2 px-3">
                <a
                  href="/login"
                  className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-colors text-center border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

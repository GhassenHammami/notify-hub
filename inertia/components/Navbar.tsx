import React, { useEffect, useRef, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { AlignJustify, X, LogOut } from 'lucide-react'
import logo from '../public/assets/logo.svg'
import { route } from '@izzyjs/route/client'

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

const Navbar: React.FC<NavbarProps> = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = usePage<PageProps>().props
  const isAuthenticated = !!user

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
          ? 'block rounded-md px-3 py-2 text-base font-medium text-gray-500 transition-colors hover:text-gray-700'
          : 'rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700'
      }`}
      onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
    >
      {item.label}
    </a>
  )

  return (
    <nav className="sticky top-0 z-50 w-dvw border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href={route('home')} className="flex items-center" as="button">
                <img className="h-20 w-auto" src={logo} alt="Notify Hub" />
                <div className="ml-3">
                  <h1 className="text-xl font-semibold text-gray-900">Notify Hub</h1>
                </div>
              </Link>
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
                <div className="relative ml-3" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-sm text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  >
                    <span className="text-sm font-medium">{user?.fullName?.charAt(0) || 'U'}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="ring-opacity-5 absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black focus:outline-none">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.fullName || 'User'}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                      <div className="border-t border-gray-200"></div>
                      <Link
                        href={route('auth.logout')}
                        tabIndex={-1}
                        method="post"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex w-full items-center rounded-lg px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300"
                      >
                        <LogOut size={16} className="mr-2 text-gray-500" />
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href={route('auth.login.show')}
                    as="button"
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-500 shadow-sm transition-colors hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={route('auth.register.show')}
                    as="button"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 hover:text-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X /> : <AlignJustify />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="space-y-1 border-t border-gray-200 bg-white px-2 pt-2 pb-3 sm:px-3">
          {visibleNavItems.map((item) => renderNavLink(item, true))}

          {isAuthenticated ? (
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600">
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
              <Link
                href={route('auth.logout')}
                tabIndex={-1}
                method="post"
                onClick={() => setIsProfileOpen(false)}
                className="mx-1.5 flex items-center rounded-lg px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300"
              >
                <LogOut size={16} className="mr-2 text-gray-500" />
                Logout
              </Link>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex flex-col space-y-2 px-3">
                <Link
                  href={route('auth.login.show')}
                  as="button"
                  className="block rounded-md border border-gray-300 px-3 py-2 text-center text-base font-medium text-gray-500 shadow-sm transition-colors hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href={route('auth.register.show')}
                  as="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

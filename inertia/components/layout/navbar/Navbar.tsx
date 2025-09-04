import React, { useEffect, useRef, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { X, LogOut, Menu, Bell, User } from 'lucide-react'
import { route } from '@izzyjs/route/client'
import { navigationItems } from '~/utils/navigation'
import ProjectSelector from './ProjectSelector'
import Project from '#models/project'
import logo from '@/assets/logo.svg'

interface User {
  id: number
  fullName: string
  email: string
}

interface PageProps {
  user?: User
  currentProject?: Project
  [key: string]: any
}

const Navbar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, currentProject } = usePage<PageProps>().props
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
  const authenticatedNavItems = isAuthenticated
    ? navigationItems.filter((item) => !item.requiresProject || currentProject)
    : []

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-[#F9F7F7] backdrop-blur-lg backdrop-filter">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[var(--navbar-height)] items-center justify-between">
          <div className="flex items-center">
            <Link href={route('home')} className="flex items-center" as="button">
              <img className="h-20 w-auto" src={logo} alt="Notify Hub" />
              <div className="ml-3">
                <h1 className="text-xl font-semibold text-gray-900">Notify Hub</h1>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center gap-4 md:ml-6">
              {isAuthenticated ? (
                <>
                  <ProjectSelector />
                  <button className="flex items-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                    <Bell className="h-5 w-5" />
                  </button>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                    >
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{user?.fullName?.split(' ')[0] || 'User'}</span>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 z-50 mt-1 w-64 origin-top-right overflow-hidden rounded-xl border border-gray-300 bg-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all">
                        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-200 to-gray-300 px-4 py-3">
                          <p className="text-sm font-medium text-gray-800">
                            {user?.fullName || 'User'}
                          </p>
                          <p className="truncate text-sm text-gray-600">
                            {user?.email || 'user@example.com'}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <Link
                            href={route('auth.logout')}
                            method="post"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900"
                          >
                            <LogOut className="h-4 w-4 text-gray-500" />
                            Sign out
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </>
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
          <div className="flex items-center gap-2 md:hidden">
            <ProjectSelector />
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="space-y-1 border-t border-gray-200 bg-white px-2 pt-2 pb-3 sm:px-3">
          {isAuthenticated &&
            authenticatedNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-500 transition-colors hover:text-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 text-gray-400" />
                  {item.label}
                </Link>
              )
            })}

          {isAuthenticated ? (
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6 text-gray-500" />
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

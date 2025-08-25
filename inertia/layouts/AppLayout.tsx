import React from 'react'
import Navbar from '../components/layout/navbar/Navbar'
import Sidebar from '../components/layout/Sidebar'
import { usePage } from '@inertiajs/react'
import FlashNotification, { FlashMessage } from '~/components/ui/FlashNotification'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, flash } = usePage<{ flash?: FlashMessage }>().props
  const isAuthenticated = !!user
  return (
    <>
      <FlashNotification flash={flash} />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="flex flex-1">
          {isAuthenticated && <Sidebar />}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </>
  )
}

export default AppLayout

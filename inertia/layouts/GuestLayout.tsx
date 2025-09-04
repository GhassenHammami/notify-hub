import React from 'react'
import Navbar from '../components/layout/navbar/Navbar'

interface GuestLayoutProps {
  children: React.ReactNode
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="flex max-w-full flex-1 flex-col">{children}</main>
      </div>
    </>
  )
}

export default GuestLayout

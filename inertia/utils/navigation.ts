import { LayoutDashboard, FolderKanban, FileEdit, Bell, Settings } from 'lucide-react'
import { route } from '@izzyjs/route/client'

export interface NavigationItem {
  label: string
  href: string
  icon: any
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: route('dashboard.show').path, icon: LayoutDashboard },
  { label: 'Projects', href: '/projects', icon: FolderKanban },
  { label: 'Templates', href: '/templates', icon: FileEdit },
  { label: 'Notifications', href: '/notifications', icon: Bell },
  { label: 'Settings', href: '/settings', icon: Settings },
]

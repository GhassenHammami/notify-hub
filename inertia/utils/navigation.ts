import { route } from '@izzyjs/route/client'
import { LayoutDashboard, FolderKanban, FileEdit, Bell, LucideIcon } from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  icon: LucideIcon
  requiresProject?: boolean
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: route('dashboard.show').path,
    icon: LayoutDashboard,
    requiresProject: false,
  },
  {
    label: 'Projects',
    href: route('projects.index').path,
    icon: FolderKanban,
    requiresProject: false,
  },
  {
    label: 'Notifications',
    href: route('notifications.index').path,
    icon: Bell,
    requiresProject: true,
  },
  {
    label: 'Templates',
    href: route('templates.index').path,
    icon: FileEdit,
    requiresProject: true,
  },
]

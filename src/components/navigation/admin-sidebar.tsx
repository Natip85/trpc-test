'use client'
import {Home, Inbox} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import AdminSidebarMenuActiveButton from './admin-sidebar-menu-active-button'
import AdminSidebarUserMenu from './admin-sidebar-user-menu'
import {useUser} from '@/hooks/use-user'
import {TeamSwitcher} from './team-switcher'

const items = [
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Home,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Inbox,
  },
]

export function AdminSidebar() {
  const {user} = useUser()
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <AdminSidebarMenuActiveButton href={item.url} title={item.title} icon={<item.icon />} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AdminSidebarUserMenu user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

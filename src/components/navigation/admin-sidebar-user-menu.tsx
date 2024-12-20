import {Avatar, AvatarFallback, AvatarImage} from '@/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from '@/ui/sidebar'
import {ChevronsUpDown, HomeIcon, LogOutIcon, SettingsIcon, User2} from 'lucide-react'
import {type User} from 'next-auth'
import {signOut} from 'next-auth/react'
import {ThemeToggle} from '../theme-toggle'
type Props = {
  user: User
}
export default function AdminSidebarUserMenu({user}: Props) {
  const {isMobile} = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
                <AvatarFallback className='rounded-lg'>
                  <User2 />
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                <span className='truncate text-xs'>{user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className='flex items-center gap-2'>
                <ThemeToggle />
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center gap-2'>
                <SettingsIcon className='size-4' /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center gap-2'>
                <HomeIcon className='size-4' /> Home
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant='destructive'
              onClick={() => signOut({redirect: true, callbackUrl: '/auth/login'})}
              className='flex items-center gap-2'
            >
              <LogOutIcon className='size-4' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

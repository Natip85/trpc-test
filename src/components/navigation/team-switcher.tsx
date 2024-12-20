'use client'

import Link from 'next/link'
// import {ChevronsUpDown, Plus} from 'lucide-react'

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from '~/components/ui/dropdown-menu'
import SidebarLogo from '@/assets/logoMobile.svg'
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from '@/ui/sidebar'

export function TeamSwitcher() {
  // const {isMobile} = useSidebar()
  // const [activeTeam, setActiveTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div>
          <div>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              asChild
            >
              <Link href='/'>
                <div className='flex items-center justify-center rounded-lg text-sidebar-primary-foreground'>
                  <SidebarLogo />
                </div>
                <div className='flex h-full flex-col justify-end text-left text-sm leading-tight'>
                  <span className='truncate font-semibold' />
                  <span className='truncate text-xs'>Jew Hate Database</span>
                </div>
                {/* <ChevronsUpDown className='ml-auto' /> */}
              </Link>
            </SidebarMenuButton>
          </div>
        </div>
        {/* <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>Teams</DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className='gap-2 p-2'>
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <team.logo className='size-4 shrink-0' />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent> */}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

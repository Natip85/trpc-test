'use client'
import Link from 'next/link'
import {useState} from 'react'
import {usePathname} from 'next/navigation'
import {Triangle} from 'lucide-react'

import LogoSvg from '@/assets/logo.svg'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {NO_NAV_ITEMS, type NavItem} from './constants'
import {Button} from '@/ui/button'
import UserAccountNav from './user-account-nav'
import {hasPermission} from '@/lib/permissions'
import {useUser} from '@/hooks/use-user'

export default function Navbar() {
  const {user, session} = useUser()

  return (
    <div className='sticky inset-x-0 top-0 z-50 flex w-full items-center justify-between gap-3 border-b bg-background p-4 shadow-md transition-all'>
      <Link href='/'>
        <div className='relative flex h-6 md:h-8 lg:h-10'>
          <LogoSvg alt='jhdb logo' className='h-full w-auto' />
        </div>
      </Link>
      <div className='flex items-center justify-center gap-10'>
        <div className='flex items-center justify-around gap-2'>
          {NO_NAV_ITEMS.map((item) => (
            <MenuItem key={item.title} item={item} />
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <span className='hidden md:block'>{session && <UserAccountNav />}</span>
          {!session && (
            <Button asChild size='sm'>
              <Link href='/auth/login'>LOG IN</Link>
            </Button>
          )}
          {hasPermission(user, 'users', 'block', user) && (
            <Button asChild size='sm' className='hidden md:flex'>
              <Link href='/admin/users'>ADMIN</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const MenuItem = ({item}: {item: NavItem}) => {
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen)
  }

  return (
    <div className='relative hidden md:block'>
      {item.submenu ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='font-anton flex items-center gap-3 text-white'>
            {item.title}
            {item.icon?.({className: 'size-4'})}
            <Triangle className='size-2 rotate-180' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {item.submenuItems?.map((subItem, idx) => {
              return (
                <DropdownMenuItem key={idx}>
                  <Link
                    onClick={toggleSubMenu}
                    href={subItem.path}
                    className={`font-anton rounded-md p-1.5 hover:bg-secondary ${
                      subItem.path === pathname ? 'bg-secondary' : ''
                    } `}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={item.path}
          className={`font-anton flex flex-row items-center whitespace-nowrap p-2 text-lg tracking-wide ${
            item.path === pathname ? 'text-primary underline' : 'text-white'
          }`}
        >
          {item.icon?.({className: 'size-4'})}
          <span className=''>{item.title}</span>
        </Link>
      )}
    </div>
  )
}

'use client'
import {ChevronRight, PowerIcon} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {signOut} from 'next-auth/react'
import {cn} from '@/lib/utils'
import {Button} from '@/ui/button'
import {PROFILE_MENU_LINKS} from './constants'

export default function ProfileMenu() {
  const pathname = usePathname()
  return (
    <div className='flex w-full flex-col md:w-[280px] md:min-w-[280px]'>
      {PROFILE_MENU_LINKS.map((link) => {
        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
        return (
          <Link
            href={link.route}
            key={link.label}
            className={cn('flex items-center justify-between border-b p-3', isActive ? 'text-yellow-500' : '')}
          >
            <span className='flex items-center gap-3'>
              {isActive ? link.icon : link.iconActive} {link.label}
            </span>
            <span>
              <ChevronRight className='size-5' />
            </span>
          </Link>
        )
      })}
      <Button
        onClick={() => signOut({redirect: true, callbackUrl: '/auth/login'})}
        variant='link'
        className='flex w-fit justify-start p-2 text-destructive hover:text-destructive/80 hover:no-underline'
      >
        <PowerIcon className='mr-2' />
        Logout
      </Button>
    </div>
  )
}

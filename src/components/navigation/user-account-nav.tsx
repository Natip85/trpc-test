'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import {Avatar, AvatarFallback, AvatarImage} from '@/ui/avatar'
import {User2} from 'lucide-react'
import {signOut} from 'next-auth/react'
import Link from 'next/link'
import {useUser} from '@/hooks/use-user'

export default function UserAccountNav() {
  const {user} = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Avatar className='overflow-hidden hover:cursor-pointer'>
          <AvatarImage src={user.image ?? ''} alt='user-img' />
          <AvatarFallback className='bg-foreground'>
            <User2 className='text-background' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-background'>
        <DropdownMenuItem asChild className='hover:cursor-pointer'>
          <Link href='/profile/details'>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive' onClick={() => signOut({redirect: true, callbackUrl: '/auth/login'})}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

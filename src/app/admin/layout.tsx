import {AdminSidebar} from '@/components/navigation/admin-sidebar'
import {hasPermission} from '@/lib/permissions'
import {api} from '@/trpc/server'
import {Button} from '@/ui/button'
import {SidebarInset, SidebarProvider, SidebarTrigger} from '@/ui/sidebar'
import {cookies} from 'next/headers'
import Link from 'next/link'

export default async function AdminLayout({children}: {children: React.ReactNode}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'
  const user = await api.users.getMe()

  if (!hasPermission(user, 'users', 'block', user)) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='flex flex-col gap-5'>
          <p>You do not have the right permissions to view this page</p>
          <Button asChild>
            <Link href={'/'}>Go to home page</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <SidebarInset>
        <main className='p-2'>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

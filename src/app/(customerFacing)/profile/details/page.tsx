import ProfileMenu from '@/components/navigation/profile-menu'
import ProfileEditForm from '@/components/profile-edit-form'
import {api} from '@/trpc/server'
import {redirect} from 'next/navigation'

export default async function ProfileDetailsPage() {
  const user = await api.users.getMe()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className='flex-1 justify-between gap-4 p-2 md:flex md:p-10'>
      <ProfileMenu />
      <ProfileEditForm user={user} />
    </div>
  )
}

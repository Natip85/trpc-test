'use client'

import {useSession} from 'next-auth/react'

export function useUser() {
  const {data: session} = useSession()
  const user = {
    ...session?.user,
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    roles: session?.user?.roles ?? ['user'],
    // language: session?.user?.language ?? "en",
  }

  return {user, session}
}

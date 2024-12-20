'use client'

import {useTheme} from 'next-themes'
import {Button} from '@/ui/button'
import {useEffect, useState} from 'react'
import {MoonIcon, SunIcon} from 'lucide-react'
export function ThemeToggle() {
  const {setTheme, resolvedTheme} = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return (
    <Button
      variant={'ghost'}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='w-full justify-start p-2'
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='size-5 text-yellow-500' />
      ) : (
        <MoonIcon className='size-5 text-gray-800' />
      )}
      <span className='sr-only'>Toggle theme</span>
      <span>Toggle theme</span>
    </Button>
  )
}

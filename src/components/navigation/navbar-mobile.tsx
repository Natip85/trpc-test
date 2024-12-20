'use client'

import {ChevronDown} from 'lucide-react'
import {useEffect, useRef, useState, type ReactNode, type RefObject} from 'react'
import {motion, type SVGMotionProps, useCycle} from 'motion/react'
import {usePathname} from 'next/navigation'
import Link from 'next/link'

import {Button} from '@/ui/button'

import {NO_NAV_ITEMS, USER_NAV_ITEMS, type NavItem} from './constants'
import UserAccountNav from './user-account-nav'
import {hasPermission} from '@/lib/permissions'
import {useUser} from '@/hooks/use-user'

type MenuItemWithSubMenuProps = {
  item: NavItem
  toggleOpen: () => void
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const NavbarMobile = () => {
  const pathname = usePathname()
  const containerRef = useRef<HTMLElement>(null)
  const {height} = useDimensions(containerRef)
  const [isOpen, toggleOpen] = useCycle(false, true)
  const {user, session} = useUser()

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      ref={containerRef}
    >
      <motion.div className='absolute inset-0 right-0 w-full bg-[#1d1d1d]' variants={sidebar} />
      <motion.ul variants={variants} className='absolute grid max-h-screen w-full gap-3 overflow-y-auto px-10 py-16'>
        {session && (
          <>
            <MenuItem className='flex items-center gap-4 text-white'>
              {hasPermission(user, 'users', 'block', user) && (
                <Button asChild size='sm'>
                  <Link href='/admin/users'>ADMIN</Link>
                </Button>
              )}
              <UserAccountNav /> <div>{session.user.name ?? session.user.email}</div>
            </MenuItem>
            <MenuItem className='my-3 h-px w-full bg-secondary' />
          </>
        )}
        {USER_NAV_ITEMS.map((item, idx) => {
          const isLastItem = idx === NO_NAV_ITEMS.length - 1 // Check if it's the last item

          return (
            <div key={idx}>
              {item.submenu ? (
                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
              ) : (
                <MenuItem>
                  <Link
                    href={item.path}
                    onClick={() => toggleOpen()}
                    className={`flex w-full text-2xl ${item.path === pathname ? 'font-bold text-primary' : 'text-white'}`}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              )}

              {!isLastItem && <MenuItem className='my-3 h-px w-full bg-secondary' />}
            </div>
          )
        })}
      </motion.ul>
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  )
}

export default NavbarMobile

const MenuToggle = ({toggle}: {toggle: () => void}) => (
  <Button variant='link' size='icon' onClick={toggle} className='pointer-events-auto absolute right-2 top-2.5 z-30'>
    <svg width='23' height='23' viewBox='0 0 23 23'>
      <Path
        variants={{
          closed: {d: 'M 2 2.5 L 20 2.5'},
          open: {d: 'M 3 16.5 L 17 2.5'},
        }}
      />
      <Path
        d='M 2 9.423 L 20 9.423'
        variants={{
          closed: {opacity: 1},
          open: {opacity: 0},
        }}
        transition={{duration: 0.1}}
      />
      <Path
        variants={{
          closed: {d: 'M 2 16.346 L 20 16.346'},
          open: {d: 'M 3 2.5 L 17 16.346'},
        }}
      />
    </svg>
  </Button>
)

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill='transparent'
    strokeWidth='2'
    className='stroke-foreground dark:stroke-white'
    strokeLinecap='round'
    {...props}
  />
)

const MenuItem = ({className, children}: {className?: string; children?: ReactNode}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  )
}

const MenuItemWithSubMenu = ({item, toggleOpen}: MenuItemWithSubMenuProps) => {
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(false)

  return (
    <>
      <MenuItem>
        <button className='flex w-full text-2xl' onClick={() => setSubMenuOpen(!subMenuOpen)}>
          <div className='flex w-full flex-row items-center gap-5'>
            <span className='text-white'>{item.title}</span>
            <div className={`${subMenuOpen && 'rotate-180'}`}>
              <ChevronDown className='text-white' />
            </div>
          </div>
        </button>
      </MenuItem>
      <div className='ml-2 mt-2 flex flex-col space-y-2'>
        {subMenuOpen && (
          <>
            {item.submenuItems?.map((subItem, subIdx) => {
              return (
                <MenuItem key={subIdx}>
                  <Link
                    href={subItem.path}
                    onClick={() => toggleOpen()}
                    className={`text-white ${subItem.path === pathname ? 'font-bold text-primary' : ''}`}
                  >
                    {subItem.title}
                  </Link>
                </MenuItem>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
      duration: 0.02,
    },
  },
}

const variants = {
  open: {
    transition: {staggerChildren: 0.02, delayChildren: 0.15},
  },
  closed: {
    transition: {staggerChildren: 0.01, staggerDirection: -1},
  },
}

const useDimensions = (ref: RefObject<HTMLElement>) => {
  const dimensions = useRef({width: 0, height: 0})

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth
      dimensions.current.height = ref.current.offsetHeight
    }
  }, [ref])

  return dimensions.current
}

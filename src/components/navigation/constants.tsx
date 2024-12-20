import {BarChart, ListChecks, StoreIcon} from 'lucide-react'
import {BsArchive, BsFillShareFill, BsShare} from 'react-icons/bs'
import {FaArchive, FaUserCircle} from 'react-icons/fa'
import {FaRegCircleUser} from 'react-icons/fa6'
export type NavItem = {
  title: string
  path: string
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  submenu?: boolean
  submenuItems?: NavItem[]
}

export const NO_NAV_ITEMS: NavItem[] = []

export const USER_NAV_ITEMS: NavItem[] = [
  {
    title: 'JH DATABASE',
    path: '/jh-database',
  },
  {
    title: 'SUBMIT JEW HATER',
    path: '/submit-incident',
  },
  {
    title: 'DONATE',
    path: '/donate',
  },
  {
    title: 'MORE',
    path: '/more',
    submenu: true,
    submenuItems: [
      {title: 'MORE STUFF', path: '/fdfdfd'},
      {title: 'ANOTHER', path: '/gfgfhfgf'},
    ],
  },
]

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: (props) => <BarChart {...props} />,
  },
  {
    title: 'Incidents',
    path: '/admin/incidents',
    icon: (props) => <ListChecks {...props} />,
  },
  {
    title: 'Live site',
    path: '/',
    icon: (props) => <StoreIcon {...props} />,
  },
]

export const PROFILE_MENU_LINKS = [
  {
    icon: <FaUserCircle size={18} />,
    iconActive: <FaRegCircleUser size={18} />,
    route: '/profile/details',
    label: 'Account Details',
  },
  {
    icon: <FaArchive size={18} />,
    iconActive: <BsArchive size={18} />,
    route: '#',
    label: 'History',
  },
  {
    icon: <BsFillShareFill size={18} />,
    iconActive: <BsShare size={18} />,
    route: '#',
    label: 'Referrals',
  },
]

 
   
import { AccountCircle, Announcement, CreateRounded } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import type { ComponentType } from 'react';

export type UserRole = 
'admin' | 'doctor' | 'secretary';

export interface SidebarItem {
  path: string;
  label: string;
  icon: ComponentType; 
  roles: UserRole[];
}

export const sidebarItems: SidebarItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: HomeIcon, 
    roles: ['admin'],
  },
  {
    path: '/dashboard/accounts',
    label: 'Accounts',
    icon: PeopleIcon,
    roles: ['admin'],
  },
  {
path:'/dashboard/complains',
label:'Complains',
icon: Announcement,
roles:['admin']

  },
  {
    path: '/dashboard/createAccount',
    label: 'Create Account',
    icon: CreateRounded,
    roles: ['admin', 'doctor'],
  },
  {
    path: '/dashboard/profile',
    label: 'Profile',
    icon: AccountCircle,
    roles: ['admin', 'secretary','doctor'],
  },
];

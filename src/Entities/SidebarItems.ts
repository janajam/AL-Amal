

import {
  AccountCircle,
  AccountTree,
  Announcement,
  AppShortcut,
  CalendarMonth,
  CreateRounded,
  Person
} from '@mui/icons-material';
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
  subtitle: string
}

export const sidebarItems: SidebarItem[] = [
  {
    path: '/dashboard',
    label: ' Dashboard',
    icon: HomeIcon,
    roles: ['admin', 'secretary', 'doctor'],
    subtitle: 'Welcome To Your Dashboard'
  },
  {
    path: '/dashboard/accounts',
    label: 'Accounts',
    icon: PeopleIcon,
    roles: ['admin'],
    subtitle: 'Manage system accounts'
  },
  {
    path: '/dashboard/complaints',
    label: 'Complains',
    icon: Announcement,
    roles: ['admin'],
    subtitle: 'View and resolve complaints'
  },
  {
    path: '/dashboard/createAccount',
    label: 'Create Account',
    icon: CreateRounded,
    roles: ['admin'],
    subtitle: 'Add a new doctor or secretary'

  },
  {
    path:'/dashboard/departments',
    label:'Department',
    icon:AccountTree,
     roles:['admin'],
    subtitle:'View a brief overview '
  },
  {
    path:'/dashboard/offers',
    label:'Offers',
    icon:AppShortcut,
     roles:['admin'],
    subtitle:'Make the service exceptional '
  },
  
  {
    path: '/dashboard/patients',
    label: 'Patients',
    icon: PeopleIcon,
    roles: ['doctor'],
    subtitle: 'Patients information'

  },
  {
    path:'/appintmentsSchedule',
    label:'Appointments',
    icon:CalendarMonth,
    roles:['doctor'],
    subtitle:' '
  },
  {
    path:'/dashboard/doctors',
    label:'Doctors',
    icon:Person,
    roles:['secretary'],
    subtitle:'Manage Doctor Information'
  },
  
  {
    path: '/profile',
    label: 'Profile',
    icon: AccountCircle,
    roles: ['admin', 'secretary', 'doctor'],
    subtitle: 'Your personal information'

  },
];

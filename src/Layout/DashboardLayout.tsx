
import { Box, useTheme } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import AppBar from '../Component/AppBar';
import { sidebarItems, type SidebarItem } from '../Entities/SidebarItems';


export default function DashboardLayout() {

  // const userRole = useAuthStore((state) => state.role);
  const theme = useTheme()

  const userRole = 'secretary'

  if (!userRole) {
    return <Navigate to="/login" replace />;

  }

  const location = useLocation();
  const currentPage = sidebarItems.find
    (item => item.path === location.pathname);


  const title = currentPage?.label ?? 'Dashboard';
  const subtitle = currentPage?.subtitle ?? '';

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100%',
      bgcolor: theme.palette.background.default,
    }}>


      <Sidebar userRole={userRole} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          width: { sm: `calc(100% - 260px)` },
        }}
      >

        <Box sx={{
          backgroundColor: 'white',
          borderRadius: '16px',
          p: 3,
          minHeight: 'calc(100% - 64px)',
          [theme.breakpoints.only('sm')]: {
            ml: -10
          }
        }}>
          <AppBar title={title} subtitle={subtitle} />
          <Outlet />

        </Box>
      </Box>
    </Box>
  );
}

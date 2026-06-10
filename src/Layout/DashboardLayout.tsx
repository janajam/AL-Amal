

import { Box } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import Sidebar from '../Component/Sidebar';
import { useAuthStore } from '../Store/AuthStore';

export default function DashboardLayout() {

  const userRole = useAuthStore((state) => state.role);


  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
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
          minHeight: 'calc(100vh - 64px)',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.02)'
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

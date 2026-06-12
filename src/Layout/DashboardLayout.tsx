

import { Box } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import Sidebar from '../Component/Sidebar';

export default function DashboardLayout() {

  // const userRole = useAuthStore((state) => state.role);


  const userRole = 'admin'

  if (!userRole) {
    return <Navigate to="/login" replace />;

  }

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100%',
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
        }}>
          <Outlet />

        </Box>
      </Box>
    </Box>
  );
}

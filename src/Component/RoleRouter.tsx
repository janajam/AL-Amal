import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../Store/AuthStore';
import AdminDashboard from '../Admin/Dashboard/AdminDashboard';
import DoctorDashboard from '../Doctor/Dashboard/DoctorDashboard';
import SecretaryDashboard from '../Secretary/Dashboard/SecretaryDashboard';

const dashboardMap = {
  admin: <AdminDashboard />,
  doctor: <DoctorDashboard />,
  secretary: <SecretaryDashboard />,
} as const;

export default function RoleRouter() {

  // const userRole = useAuthStore((state) => state.role);
const userRole='secretary'
  if (!userRole || !(userRole in dashboardMap)) {
    return <Navigate to="/" replace />;
  }

  return dashboardMap[userRole];
}
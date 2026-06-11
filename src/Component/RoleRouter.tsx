import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../Store/AuthStore';
import AdminDashboard from '../Admin/AdminDashboard';
import DoctorDashboard from '../Doctor/DoctorDashboard';
import SecretaryDashboard from '../Secretary/SecretaryDashboard';

const dashboardMap = {
  admin: <AdminDashboard />,
  doctor: <DoctorDashboard />,
  secretary: <SecretaryDashboard />,
} as const;

export default function RoleRouter() {

  const userRole = useAuthStore((state) => state.role);

  if (!userRole || !(userRole in dashboardMap)) {
    return <Navigate to="/" replace />;
  }

  return dashboardMap[userRole];
}
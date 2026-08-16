import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/AuthStore';
import AdminDashboard from '../Admin/Dashboard/AdminDashboard';
import DoctorDashboard from '../Doctor/Dashboard/DoctorDashboard';
import SecretaryDashboard from '../Secretary/Dashboard/SecretaryDashboard';

// const dashboardMap = {
//   admin: <AdminDashboard />,
//   doctor: <DoctorDashboard />,
//   secretary: <SecretaryDashboard />,
// } as const;

// export default function RoleRouter() {

//   const userRole = useAuthStore((state) => state.role);
// // const userRole='secretary'
//   if (!userRole || !(userRole in dashboardMap)) {
//     return <Navigate to="/" replace />;
//   }

//   return dashboardMap[userRole];
// }


const dashboardMap = {
  admin: <AdminDashboard />,
  doctor: <DoctorDashboard />,
  secretary: <SecretaryDashboard />,
} as const;

export default function RoleRouter() {
  const userRole = useAuthStore((state) => state.role);
const navigate=useNavigate()
  console.log("RoleRouter role:", userRole);

  // if (!userRole) {
  //   return <Navigate to="/" replace />;
  // }
if (!userRole) {
  navigate("/"); // Redirect to home page if role is not recognized
  return null; // Return null to avoid rendering anything while redirecting
}
  return dashboardMap[userRole as keyof typeof dashboardMap] ?? (
    <Navigate to="/" replace />
  );
}
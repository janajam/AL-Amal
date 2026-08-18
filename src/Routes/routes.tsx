import { createBrowserRouter } from "react-router-dom";
import Accounts from "../Admin/Accounts/Accounts";
import CreateAccount from "../Admin/Accounts/CreateAccount";
import Complaints from "../Admin/Complaints/Complaints";
import DepartmentCard from "../Admin/Department/DepartmentCard";
import Offers from "../Admin/Offers/Offers";
import ForgotPassword from "../Component/ForgotPassword";
import Login from "../Component/Login";
import ResetPassword from "../Component/ResetPassword";
import RoleRouter from "../Component/RoleRouter";
import Appointment from "../Component/Schedule/Appointment/Appointment";
import PatientDetailes from "../Doctor/Patient/PatientDetailes";
import DashboardLayout from "../Layout/DashboardLayout";
import PatientList from "../Doctor/Patient/PatientList";
import DoctorsList from "../Secretary/DoctorsAppointments/DoctorList";
import SecretariesList from "../Admin/Department/SecretariesList";
import Profile from "../Component/Profile/Profile";
import ChangePassword from "../Component/ChangePassword";
import DoctorDetails from "../Secretary/DoctorsAppointments/DoctorDetailes";
import SecretaryDetails from "../Admin/Department/SecretaryDetails";

export const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {

    path: '/dashboard',
    element: <DashboardLayout />,
    children: [

      { index: true, element: <RoleRouter /> },
      { path: 'complaints', element: <Complaints /> },
      { path: 'accounts', element: <Accounts /> },
      { path: 'createAccount', element: <CreateAccount /> },
      { path: 'departments', element: <DepartmentCard /> },
      { path: 'offers', element: <Offers /> },
      { path: 'patients', element: <PatientList /> },
      { path: 'doctors', element: <DoctorsList /> },
      { path: 'secretaries', element: <SecretariesList /> },

    ],
  },
  {
    path: "doctors/:id",
    element: < DoctorDetails />
  },
  {
    path: 'secretaries/:id',
    element: <SecretaryDetails/>
  },
  {
    path: '/changePassword',
    element: <ChangePassword />
  },
  {
    path: "patients/:id",
    element: < PatientDetailes />
  },
  { path: '/appintmentsSchedule', element: <Appointment /> },
  { path: 'profile', element: <Profile /> },


]);




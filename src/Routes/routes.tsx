import { createBrowserRouter } from "react-router-dom";
import AccountDetails from "../Admin/Accounts/AccountDetails";
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
import PatientCard from "../Doctor/Patient/PatientCard";
import PatientDetailes from "../Doctor/Patient/PatientDetailes";
import DashboardLayout from "../Layout/DashboardLayout";
import PatientList from "../Doctor/Patient/PatientList";
import DoctorsList from "../Secretary/DoctorsAppointments/DoctorList";
import SecretariesList from "../Admin/Department/SecretariesList";

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
    path: "accounts/:id",
    element: < AccountDetails />
  },

  {
    path: "patients/:id",
    element: < PatientDetailes />
  },
  { path: '/appintmentsSchedule', element: <Appointment /> }

]);




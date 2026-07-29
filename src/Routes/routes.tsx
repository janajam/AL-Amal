import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../Component/ForgotPassword";
import Login from "../Component/Login";
import ResetPassword from "../Component/ResetPassword";
import RoleRouter from "../Component/RoleRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import Complaints from "../Admin/Complaints/Complaints";
import Accounts from "../Admin/Accounts/Accounts";
import AccountDetails from "../Admin/Accounts/AccountDetails";
import CreateAccount from "../Admin/Accounts/CreateAccount";
import DepartmentCard from "../Admin/Department/DepartmentCard";
import Offers from "../Admin/Offers/Offers";
import PatientCard from "../Doctor/Patient/PatientCard";
import PatientDetailes from "../Doctor/Patient/PatientDetailes";
import SchedulePage from "../Component/AppointmentSchedule/SchedulePage";

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
      {path:'patients',element:<PatientCard/>},
      {path:'appintmentsSchedule',element:<SchedulePage/>}
    
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

]);




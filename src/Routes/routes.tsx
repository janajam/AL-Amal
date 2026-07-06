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
      {path:'createAccount',element:<CreateAccount/>},
      {path:'department',element:<DepartmentCard/>}



    ],
  },
  {
    path: "accounts/:id",
    element: < AccountDetails />
  },
  
]);




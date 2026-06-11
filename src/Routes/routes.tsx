import { createBrowserRouter } from "react-router-dom";
import Login from "../Component/Login";
import ForgotPassword from "../Component/ForgotPassword";
import ResetPassword from "../Component/ResetPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import RoleRouter from "../Component/RoleRouter";



export const router = createBrowserRouter([

  {
   path: "/",
     element: (
       <>
       <Login/>
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

    ],
  },]);




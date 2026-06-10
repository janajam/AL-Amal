import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Component/Login";
import ForgotPassword from "../Component/ForgotPassword";
import ResetPassword from "../Component/ResetPassword";
import DashboardLayout from "../Layout/DashboardLayout";


export const router = createBrowserRouter([
  //Start Pages
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
  

{    path: '/dashboard', 
    element: <DashboardLayout />, 
    children: [
      
      { index: true, element: <Navigate to="overview" replace /> }, 
      
    ],
  },
]);




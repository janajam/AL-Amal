import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../Component/ForgotPassword";
import Login from "../Component/Login";
import ResetPassword from "../Component/ResetPassword";
import RoleRouter from "../Component/RoleRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import Complaints from "../Admin/Complaints";


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
      {path:'complaints',element:<Complaints/>}

    ],
  },
]);




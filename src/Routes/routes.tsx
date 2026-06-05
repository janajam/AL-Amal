import { createBrowserRouter } from "react-router-dom";
import Login from "../Component/Login";


export const router = createBrowserRouter([
  //Start Pages
  {
   path: "/",
     element: (
       <>
       <Login/>
{/* //         <WelcomePage /> */}
      </>
     ),
   },
//   {
//     path: "/aboutus",
//     element: (
//       <>
//         <NavBar />
//         <AboutUs />
//       </>
//     ),
//   },

//   {
//     path: "/signin",
//     element: <LogIn />,
//   },
//   {
//     path: "/signup",
//     element: <RegisterPage />,
//   },
//   {
//     path: "/forgotPassword",
//     element: <ForgotPassword />,
//   },
//   {
//     path: "/resetPassword",
//     element: <ResetPassword />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//   },
//   {
//     path: "/accounts",
//     element: <Accounts />,
//   },
//   {
//     path: "/provider/:id",
//     element: < ProviderDetailes />
//   },
//   {
//     path: "/complaints",
//     element: < Complaints />
//   },
//     {
//     path: "/profile",
//     element: < Profile />
//   },
//     {
//     path: "/changePassword",
//     element: < ChangePassword />
//   },
// {
//     path: "/dash",
//     element: <Dash />,
  // },
 ]);

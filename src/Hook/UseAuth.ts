// // import { useMutation } from "@tanstack/react-query";
// // import { useNavigate } from "react-router-dom";
// // import ApiClient from "../apiServices/api_client";
// // import type { LoginPayload, LoginResponse } from "../Entities/LoginIData";
// // import type { UserRole } from "../Entities/SidebarItems";
// // import { useAuthStore } from "../Store/AuthStore";

// // const apiClient = new ApiClient<LoginResponse, LoginPayload>("/auth/signin");

// // export const useAuth = () => {
// //   const navigate = useNavigate();
// //   const setAuth = useAuthStore((state) => state.setAuth);

// //   return useMutation({
// //     mutationKey: ["login"],
// //     mutationFn: async (data: LoginPayload) => {
// //       return await apiClient.post(data);
// //     },
    
// //     onSuccess: (data) => {
    
// //     const serverRole = data.data.user.role as UserRole; 
    
    
// //       setAuth({
// //         fullName:data.data.user.fullName, 
// //         token: data.data.token, 
// //         role: serverRole });
// //          if (data.status === 200 || data.data.token) {
// //         console.log(data.status,'success');
    
// //         navigate(`/dashboard/${serverRole}`);
// //       }
// //     },

// //     //   const role = useAuthStore.getState().role;
// //     //   const token = getToken();
// //     //   if (token && role) {
// //     //     navigate(`/dashboard/${role}`);
// //     //   }
// //     //   // // Redirect based on role
// //     //   // switch (data.role) {
// //     //   //   case "superAdmin":
// //     //   //     navigate("/admin-dashboard");
// //     //   //     break;
// //     //   //   case "provider":
// //     //   //     navigate("/provider-dashboard");
// //     //   //     break;
// //     //   //   case "reception":
// //     //   //     navigate("/reception-dashboard");
// //     //   //     break;
// //     //   //   default:
// //     //   //     navigate("/");
// //     //   // }
// //     // }
// //     // },
// //     onError: (error: any) => {
// //       console.error("Login failed", error);
// //     },
// //   });
// // };


// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import ApiClient from "../apiServices/api_client";
// import type { LoginPayload, LoginResponse } from "../Entities/LoginIData";
// import type { UserRole } from "../Entities/SidebarItems";
// import { useAuthStore } from "../Store/AuthStore";

// const apiClient = new ApiClient<LoginResponse, LoginPayload>("/auth/login");

// export const useAuth = () => {
//   const navigate = useNavigate();
//   const setAuth = useAuthStore((state) => state.setAuth);

//   return useMutation({
//     mutationKey: ["login"],

//     mutationFn: async (data: LoginPayload) => {
//       return await apiClient.post(data);
//     },

//     onSuccess: (response) => {
//   console.log("Login response:", response);
// console.log("Login response:", response);
//   console.log("USER:", response.data.user);
//   console.log("ROLE:", response.data.user.role);

//   const user = response.data.user;
//   const token = response.data.access_token;

//   const serverRole = user.role as UserRole;

//   setAuth({
//     fullName: user.full_name,
//     token: token,
//     role: serverRole,
//   });

//   navigate(`/dashboard/${serverRole}`);
// },
//     onError: (error) => {
//       console.error("Login failed:", error);
//     },
//   });
// };



import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiClient from "../apiServices/api_client";
import type { LoginPayload, LoginResponse } from "../Entities/LoginIData";
import type { UserRole } from "../Entities/SidebarItems";
import { useAuthStore } from "../Store/AuthStore";

const apiClient = new ApiClient<LoginResponse, LoginPayload>("/auth/login");

const roleMap: Record<string, UserRole> = {
  "Super Admin": "admin",
  // "Admin": "admin",
  "Doctor": "doctor",
  "Secretary": "secretary",
};

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationKey: ["login"],

    mutationFn: async (data: LoginPayload) => {
      return await apiClient.post(data);
    },

    onSuccess: (response) => {
      console.log("Login response:", response);

      // IMPORTANT:
      // Your backend response has:
      // response.data.user
      const user = response.data.user;

      console.log("USER:", user);
      console.log("ROLE:", user.role);

      const serverRole = user.role;

      const frontendRole = roleMap[serverRole];

      if (!frontendRole) {
        console.error("Unknown role:", serverRole);
        return;
      }

      console.log("Frontend role:", frontendRole);

      setAuth({
        fullName: user.full_name,
        token: response.data.access_token,
        role: frontendRole,
      });

      navigate(`/dashboard`);
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
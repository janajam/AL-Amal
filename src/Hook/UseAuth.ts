import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiClient from "../apiServices/api_client";
import type { LoginPayload, LoginResponse } from "../Entities/LoginIData";
import type { UserRole } from "../Entities/SidebarItems";
import { useAuthStore } from "../Store/AuthStore";

const apiClient = new ApiClient<LoginResponse, LoginPayload>("/auth/signin");

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginPayload) => {
      return await apiClient.post(data);
    },
    
    onSuccess: (data) => {
    
    const serverRole = data.data.user.role as UserRole; 
    
    
      setAuth({
        fullName:data.data.user.fullName, 
        token: data.data.token, 
        role: serverRole });
         if (data.status === 200 || data.data.token) {
        console.log(data.status,'success');
    
        navigate(`/dashboard/${serverRole}`);
      }
    },

    //   const role = useAuthStore.getState().role;
    //   const token = getToken();
    //   if (token && role) {
    //     navigate(`/dashboard/${role}`);
    //   }
    //   // // Redirect based on role
    //   // switch (data.role) {
    //   //   case "superAdmin":
    //   //     navigate("/admin-dashboard");
    //   //     break;
    //   //   case "provider":
    //   //     navigate("/provider-dashboard");
    //   //     break;
    //   //   case "reception":
    //   //     navigate("/reception-dashboard");
    //   //     break;
    //   //   default:
    //   //     navigate("/");
    //   // }
    // }
    // },
    onError: (error: any) => {
      console.error("Login failed", error);
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiClient from "../apiServices/api_client";
import { useAuthStore } from "../Store/AuthStore";
import type { LoginPayload, LoginResponse } from "../Entities/LoginIData";
import { getToken } from "../apiServices/cookie";

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
      if (data.status===200) {
    console.log(data.status,'success');
    
    }
      setAuth({fullName:data.data.user.fullName, token: data.data.token, role: data.data.user.role});

      const role = useAuthStore.getState().role;
      const token = getToken();
      if (token && role) {
        navigate(`/dashboard/${role}`);
      }
      // // Redirect based on role
      // switch (data.role) {
      //   case "superAdmin":
      //     navigate("/admin-dashboard");
      //     break;
      //   case "provider":
      //     navigate("/provider-dashboard");
      //     break;
      //   case "reception":
      //     navigate("/reception-dashboard");
      //     break;
      //   default:
      //     navigate("/");
      // }
    },
    onError: (error: any) => {
      console.error("Login failed", error);
    },
  });
};

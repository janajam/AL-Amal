
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiClient from "../apiServices/api_client";
import type { LoginPayload, LoginResponse } from "../Entities/LoginIData";
import type { UserRole } from "../Entities/SidebarItems";
import { useAuthStore } from "../Store/AuthStore";

const apiClient = new ApiClient<LoginResponse, LoginPayload>("/auth/login");

const roleMap: Record<string, UserRole> = {
  "Super Admin": "admin",
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
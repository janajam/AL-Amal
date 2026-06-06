import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import { setToken } from "../apiServices/cookie";
import type { ChangePasswordResponse } from "../Entities/ChangePasswordData";
import type { ChangePasswordInput } from "../Schema/ChangePasswordSchema";


const apiClient = new ApiClient<ChangePasswordResponse, ChangePasswordInput>(
  "/auths/changeMyPassword"
);

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: Partial<ChangePasswordInput>) => {
      return await apiClient.post(data as ChangePasswordInput);
    },
    onSuccess: (data) => {
      console.log("Password change successful:", data);
      setToken(data.data.token);
      console.log(data.data.token);
    },
    onError: (error: any) => {
      console.error(
        "  error,in reset password :",
        error?.response?.data || error.message
      );
    },
  });
};

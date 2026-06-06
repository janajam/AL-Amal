import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import { useOtpStore } from "../Store/UseOtpStore";
import type { ResetPasswordInput } from "../Schema/ResetPasswordSchema";
import type { ResetPasswordResponse } from "../Entities/ResetPasswordResponse";


const apiClient = new ApiClient<ResetPasswordResponse, ResetPasswordInput>(
  "/auth/resetPassword"
);

export const useRestPassword = () => {

  const resetToken=useOtpStore((state)=>state.resetToken)
  return useMutation({
    mutationFn: async (data: Partial<ResetPasswordInput>) => {
      return await apiClient.post(data as ResetPasswordInput);
    },
    onSuccess: (data) => {
         console.log("Password reset successful:", data);
    resetToken(data.token)
      console.log(data.token);
      
    },
    onError: (error: any) => {
      console.error(
        "  error,in reset password :",
        error?.response?.data || error.message
      );
    },
  });
};

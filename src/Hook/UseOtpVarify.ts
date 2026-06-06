import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { OtpRasponse } from "../Entities/OtpRsponse";
import { useOtpStore } from "../Store/UseOtpStore";
import type { OtpInput } from "../Schema/OTPSchema";

const apiClient = new ApiClient<OtpRasponse, OtpInput>(
  "/users/verifyResetCode"
);

export const useOtpVerify = () => {
  const reset = useOtpStore((state) => state.reset);
  const resetToken=useOtpStore((state)=>state.resetToken)
  return useMutation({
    mutationFn: async (data: Partial<OtpInput>) => {
      return await apiClient.post(data as OtpInput);
    },
    onSuccess: (data) => {
      console.log(data.message);
    resetToken(data.token)
      console.log(data.token);
      reset();
    },
    onError: (error: any) => {
      console.error(
        "  error,in Varification Code :",
        error?.response?.data || error.message
      );
    },
  });
};

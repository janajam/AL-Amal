import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { SendEmailResponse } from "../Entities/SendEmailResponse";
import type { ForgotInfo } from "../Schema/ForgotSchema";
import { useForgotStore } from "../Store/UseForgotStore";


// export interface resetpassword {
//   status: number
//   token: string
// }

const apiClient = new ApiClient<SendEmailResponse, ForgotInfo>(
  "/users/forgotPassword"
);

export const useSendEmail = () => {
  const reset = useForgotStore((state) => state.reset);
  return useMutation({
    mutationFn: async (data: Partial<ForgotInfo>) => {
      return await apiClient.post(data as ForgotInfo);
    },
    onSuccess: (data) => {
      console.log(data.message);
      reset();
    },
    onError: (error: any) => {
      console.error(
        "  error,in sending Email:",
        error?.response?.data || error.message
      );
    },
  });
};

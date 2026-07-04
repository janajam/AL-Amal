import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client.ts";
import type { ResponseComplaintsRespons } from "../Entities/Complaints";
import type { ComplaintResponseInput } from "../Schema/ComplaintResponseSchema.ts";


const apiClient = new ApiClient< ComplaintResponseInput ,ResponseComplaintsRespons>("/admin/responseComplaints");

export const UsePostComplaintRespnse=()=>{
  return useMutation({
    mutationFn: async (data: Partial<ComplaintResponseInput>) => {
      return await apiClient.post(data as ResponseComplaintsRespons);
    },
    
        onSuccess: (data) => {
          console.log("Response Sent successful:", data);
        },
        onError: (error: any) => {
          console.error(
            "  error, in Send The Response :",
            error?.response?.data || error.message
          );
        },
})
}
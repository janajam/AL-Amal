import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { Complaints, ComplaintsResponse } from "../Entities/Complaints";


const apiClient = new ApiClient<Complaints, ComplaintsResponse>(
    "/admin/getComplaints"
)

export const useGetComplaints = () => {
    return useMutation({
        mutationKey: ['complaints'],
        mutationFn: async () => {
            return await apiClient.getAll()
        },
        onSuccess: (data: ComplaintsResponse) => {
            console.log(data.status,data.message)
        },
        
    onError: (error: any) => {
      console.error(
        "  error,there are no complaints , some thing wrong :",
        error?.response?.data || error.message
      );
    },
    })
}
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { ComplaintsResponse } from "../Entities/Complaints";

const apiClient = new ApiClient<unknown, ComplaintsResponse>("/admin/getComplaints");

export const useGetComplaints = () => {
    return useQuery({
        queryKey: ['complaints'],
        queryFn: async () => {
            return await apiClient.getAll()
        },

    })
}
// Hook/UseGetAccount.ts
import { useQuery } from "@tanstack/react-query";
import type { DoctorResponse } from "../Entities/DoctorData";
import ApiClient from "../apiServices/api_client";

const apiClient = new ApiClient<DoctorResponse>("/doctors");

export const useGetAccount = (id: number) => {
    return useQuery({
        queryKey: ["doctor", id],
        queryFn: async () => await apiClient.get(id),
        enabled: !!id,
    });
};
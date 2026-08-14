
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { PatientDetailResponse } from "../Entities/Patient";

const apiClient = new ApiClient<PatientDetailResponse>('/patients');

export const useGetPatient = (id: number) => {
    return useQuery({
        queryKey: ['patient', id],
        queryFn: async () => await apiClient.get(id),
        enabled: !!id, 
        staleTime: 30 * 1000,
    });
};
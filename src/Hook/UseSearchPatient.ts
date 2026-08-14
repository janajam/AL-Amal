
import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { SearchPatientResponse } from "../Entities/Patient";

const apiClient = new ApiClient<SearchPatientResponse>('/patients/search');

export const useSearchPatient = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            return await apiClient.getAll({ params: { email } });
        },
    });
};
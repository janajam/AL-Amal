// Hook/UseGetSecretaries.ts
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { SecretariesResponse } from "../Entities/SecreraryData";

const apiClient = new ApiClient<SecretariesResponse>("/secretaries");

export const useGetSecretaries = () => {
    return useQuery<SecretariesResponse>({
        queryKey: ["secretaries"],
        queryFn: async () => {
            return await apiClient.getAll();
        },
    });
};
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { AccountResponse } from "../Entities/AccountsData";


const apiClient =new ApiClient<unknown, AccountResponse>("/admin/accounts");

    export const useGetAccount = (id: number) => {
    return useQuery({
        queryKey: ["account", id],
        queryFn: () => apiClient.get(id),
        enabled: !!id,
    });
};
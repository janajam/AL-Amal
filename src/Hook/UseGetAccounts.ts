import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { AccountsResponse } from "../Entities/AccountsData";

const apiClient = new ApiClient<unknown, AccountsResponse>("/admin/getAccounts");

export const useGetAccounts = () => {
    return useQuery({
        queryKey: ['Accounts'],
        queryFn: async () => {
            return await apiClient.getAll()
        },

    })
}
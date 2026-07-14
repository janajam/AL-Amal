import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { AccountsResponse } from "../Entities/AccountsData";

interface GetAccountsParams {
    role?: "Doctor" | "Secretary";
    department?: number;
}

const apiClient = new ApiClient<unknown,AccountsResponse>("/admin/accounts");

export const useGetAccountByRole=(params: GetAccountsParams)=>{
return useQuery({

        queryKey: ["accounts", params],

        queryFn: () =>
            apiClient.getAll({
                params,
            }),

    });

}
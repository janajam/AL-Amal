import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { CreateAccountInfo } from "../Schema/CreateAccountSchema"
import type { CreateAccountsResponse } from "../Entities/AccountsData"

const apiClient = new ApiClient<CreateAccountsResponse , CreateAccountInfo >('/admin/createAccount')
export const useCreateAccount = () => {
    return useMutation({
        mutationKey: ['createAccount'],
        mutationFn: async (data: CreateAccountInfo) => {
            return await apiClient.post(data)
        },
    })
}
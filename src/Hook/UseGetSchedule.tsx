
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { WorkingScheduleResponse } from "../Entities/AccountsData"

export const useGetSchedule = (accountId: number) => {
    
const apiClient =new ApiClient<unknown, WorkingScheduleResponse>(`/accounts/${accountId}/schedule`)

    return useQuery({
        queryKey: ['Schedule', accountId],
        queryFn: async () => {
            return await apiClient.get(accountId)
        },

    })
}
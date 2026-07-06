
// import { useQuery } from "@tanstack/react-query";
// import ApiClient from "../apiServices/api_client";
// import type { WorkingScheduleResponse } from "../Entities/AccountsData"

import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { WorkingScheduleResponse } from "../Entities/WorkingSchedualeData";


// export const useGetSchedule = (accountId: number) => {

// const apiClient =new ApiClient<unknown, WorkingScheduleResponse>(`/accounts/${accountId}/schedule`)

//     return useQuery({
//         queryKey: ['Schedule', accountId],
//         queryFn: async () => {
//             return await apiClient.get(accountId)
//         },

//     })
// }



export const useGetSchedule = (
    accountId: number,
    month: number,
    year: number
) => {

    const apiClient = new ApiClient<unknown, WorkingScheduleResponse>(`/admin/accounts/${accountId}/schedule`);

    return useQuery({

        queryKey: [
            "schedule",
            accountId,
            month,
            year
        ],

        queryFn: () =>
            apiClient.getAll({
                params: {
                    month,
                    year
                }
            }),

        enabled: !!accountId

    });

};
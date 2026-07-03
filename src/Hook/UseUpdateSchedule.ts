import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { UpdateScheduleRequest, WorkingScheduleResponse } from "../Entities/AccountsData";

export const useUpdateSchedule = (accountId: number) => {
    const queryClient = useQueryClient();

    const apiClient = new ApiClient<
        WorkingScheduleResponse,
        UpdateScheduleRequest
    >(`/admin/accounts/${accountId}/schedule`);

    return useMutation({
        mutationFn: ({
            scheduleId,
            data,
        }: {
            scheduleId: number;
            data: UpdateScheduleRequest;
        }) => apiClient.patch(scheduleId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["schedule", accountId],
            });
        },
    });
};

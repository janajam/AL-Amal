
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import ApiClient from "../apiServices/api_client";

import type {
  CreateScheduleRequest,
  CreateScheduleResponse,
} from "../Entities/WorkingSchedualeData";

const apiClient = new ApiClient<
  CreateScheduleResponse,
  CreateScheduleRequest
>("/doctor/schedules");

export const useCreateSchedule = (
  accountId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateScheduleRequest
    ) => {
      return await apiClient.post(data);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "schedule",
          accountId,
          variables.year,
          variables.month,
        ],
      });
    },
  });
};
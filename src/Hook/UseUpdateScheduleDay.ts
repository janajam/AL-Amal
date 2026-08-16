
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import ApiClient from "../apiServices/api_client";

import type {
  UpdateScheduleDayResponse,
  UpdateScheduleRequest,
} from "../Entities/WorkingSchedualeData";

const apiClient = new ApiClient<
  UpdateScheduleDayResponse,
  UpdateScheduleRequest
>("/doctor/schedules/days");

export const useUpdateScheduleDay = (
  accountId: number,
  year: number,
  month: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dayId,
      data,
    }: {
      dayId: number;
      data: UpdateScheduleRequest;
    }) => {
      return await apiClient.update(dayId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "schedule",
          accountId,
          year,
          month,
        ],
      });
    },
  });
};
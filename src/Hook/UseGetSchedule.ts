import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { ScheduleResponse } from "../Entities/WorkingSchedualeData";

const apiClient = new ApiClient<ScheduleResponse>(
  "/doctor/schedules"
);

export const useGetSchedule = (
  accountId: number,
  year: number,
  month: number
) => {
  return useQuery({
    queryKey: ["schedule", accountId, year, month],

    queryFn: () =>
      apiClient.getAll({
        params: {
          year,
          month,
        },
      }),

    enabled: !!accountId && !!year && !!month,
  });
};
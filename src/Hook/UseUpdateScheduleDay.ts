import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { UpdateScheduleDayResponse } from "../Entities/WorkingSchedualeData";

const apiClient = new ApiClient<
  UpdateScheduleDayResponse,
  UpdateScheduleDayResponse
>("/doctor/schedules/days");

export const useUpdateScheduleDay = () => {
  return useMutation({
    mutationFn: ({
      dayId,
      data,
    }: {
      dayId: number;
      data: UpdateScheduleDayResponse;
    }) =>
      apiClient.update(dayId, data),
  });
};
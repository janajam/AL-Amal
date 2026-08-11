// import { useMutation } from "@tanstack/react-query";
// import ApiClient from "../apiServices/api_client";
// import type { CreateScheduleRequest, CreateScheduleResponse } from "../Entities/WorkingSchedualeData";

// const apiClient = new ApiClient<
//   CreateScheduleResponse,
//   CreateScheduleRequest
// >("/doctor/schedules");

// export const useCreateSchedule = () => {
//   return useMutation({
//     mutationFn: (data: CreateScheduleRequest) =>
//       apiClient.post(data),
//   });
// };



import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { ScheduleResponse } from "../Entities/WorkingSchedualeData";

const apiClient = new ApiClient<unknown, ScheduleResponse>(
  "/doctor/schedules"
);

export const useGetSchedule = (
  accountId: number,
  year: number,
  month: number
) => {
  return useQuery({
    queryKey: ["schedule", accountId, year, month],

    queryFn: async () => {
      console.log("GET SCHEDULE PARAMS:", {
        accountId,
        year,
        month,
      });

      const response = await apiClient.getAll({
        params: {
          year,
          month,
        },
      });

      console.log("GET SCHEDULE RESPONSE:", response);

      return response;
    },

    enabled: Boolean(accountId && year && month),
  });
};


// Hook/UseGetAppointmentSlots.ts

import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";

import type {
  AppointmentSlotsResponse,
} from "../Entities/Appointment";

const apiClient =
  new ApiClient<AppointmentSlotsResponse>(
    "/appointment-slots/my-month"
  );

export const useGetAppointmentSlots = (
  year: number,
  month: number
) => {

  return useQuery({

    queryKey: [
      "appointment-slots",
      year,
      month,
    ],

    queryFn: () =>
      apiClient.getAll({
        params: {
          year,
          month,
        },
      }),

    staleTime: 1000 * 60 * 5,

  });

};
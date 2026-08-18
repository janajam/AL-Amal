// Hook/UseGetAppointmentSlots.ts
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { AppointmentSlotsResponse } from "../Entities/Appointment";

const apiClient = new ApiClient<AppointmentSlotsResponse>("/appointment-slots/my-month");

export const useGetAppointmentSlots = (year: number, month: number, doctor_id: number) => {
    return useQuery({
        queryKey: ["appointment-slots", "my-month", year, month, doctor_id],
        queryFn: () =>
            apiClient.getAll({
                params: { 
                    year, 
                    month, 
                    doctor_id
                },
            }),
        staleTime: 1000 * 60 * 5,
        enabled: Boolean(doctor_id && !isNaN(doctor_id)), 
    });
};
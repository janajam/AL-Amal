import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { BookAppointmentResponse } from "../Entities/Appointment";

interface BookAppointmentPayload {
    medical_number: string;
    appointment_slot_id: number;
}

const apiClient = new ApiClient<BookAppointmentResponse, BookAppointmentPayload>(
    "/appointments/secretary/book"
);

export const useBookAppointment = (doctorId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: BookAppointmentPayload) => {
            return await apiClient.post(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointment-slots", doctorId] });
        },
    });
};
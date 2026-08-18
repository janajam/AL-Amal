// Hooks/useCancelAppointment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";

export const useCancelAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (appointmentId: number) => {
            const apiClient = new ApiClient<unknown>(`/patient/appointments/${appointmentId}/cancel`);
            return apiClient.post({}); // أو apiClient.patch({}) بحسب ما يتطلبه السيرفر
        },
        onSuccess: () => {
            // إعادة جلب المواعيد لتحديث الواجهة فوراً
            queryClient.invalidateQueries({ queryKey: ["appointment-slots"] });
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
};
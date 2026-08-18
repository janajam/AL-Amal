// Hook/UseCreateMedicalRecord.ts (نسخة مصححة)
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { CreateMedicalRecordInput } from "../Schema/CreateMedicalRecordSchema"
import type { UpdateRecordResponse } from "../Entities/Patient"

interface CreateMedicalRecordPayload extends CreateMedicalRecordInput {
    user_id: number;
}

const apiClient = new ApiClient<UpdateRecordResponse, CreateMedicalRecordPayload>('/patients')

export const useCreateMedicalRecord = (userId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createRecored', userId],
        mutationFn: async (data: CreateMedicalRecordInput) => {
            const payload: CreateMedicalRecordPayload = {
                user_id: userId,
                sickness: data.sickness,
                allergies: data.allergies,
                long_term_medication: data.long_term_medication,
                operations: data.operations,
            };
            return await apiClient.post(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        },
    })
}
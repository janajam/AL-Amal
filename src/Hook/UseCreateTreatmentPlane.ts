
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { CreateTreatmentPlanInput } from "../Schema/CreateTreatmentPlaneSchema";
import type { CreateTreatmentPlanResponse } from "../Entities/Patient";

interface CreateTreatmentPlanStepPayload {
    step_number: number;
    instruction: string;
}

interface CreateTreatmentPlanPayload {
    medical_record_id: number;
    medical_diagnosis: string;
    steps: CreateTreatmentPlanStepPayload[];
}

const apiClient = new ApiClient<CreateTreatmentPlanResponse, CreateTreatmentPlanPayload>('/treatment-plans');

export const useCreateTreatmentPlan = (medicalRecordId: number, patientId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createTreatmentPlan', medicalRecordId],
        mutationFn: async (data: CreateTreatmentPlanInput) => {
            const filteredSteps = data.steps.filter((step) => step.trim() !== '');

            const payload: CreateTreatmentPlanPayload = {
                medical_record_id: medicalRecordId,
                medical_diagnosis: data.medical_diagnosis,
                steps: filteredSteps.map((instruction, index) => ({
                    step_number: index + 1,
                    instruction,
                })),
            };
            return await apiClient.post(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
        },
    });
};
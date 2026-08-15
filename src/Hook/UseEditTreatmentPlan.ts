
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import ApiClient from "../apiServices/api_client";
// import type { EditTreatmentPlanInput } from "../Schema/EditTreatmentPlane";
// import type { UpdateTreatmentPlanResponse } from "../Entities/Patient";



// const apiClient = new ApiClient<UpdateTreatmentPlanResponse, EditTreatmentPlanInput>('/treatment-plans');

// export const useEditTreatmentPlan = (planId: number, patientId: number) => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationKey: ['editTreatmentPlan', planId],
//         mutationFn: async (data: EditTreatmentPlanInput) => {
//             return await apiClient.update(planId, data);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
//         },
//     });
// };



// Hook/UseEditTreatmentPlan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { EditTreatmentPlanInput } from "../Schema/EditTreatmentPlane";
import type { UpdateTreatmentPlanResponse } from "../Entities/Patient";

interface EditTreatmentPlanStepPayload {
    step_number: number;
    instruction: string;
}

interface EditTreatmentPlanPayload {
    medical_record_id: number;
    medical_diagnosis: string;
    status: 'ongoing' | 'finished';
    steps: EditTreatmentPlanStepPayload[];
}

const apiClient = new ApiClient<UpdateTreatmentPlanResponse, EditTreatmentPlanPayload>('/treatment-plans');

export const useEditTreatmentPlan = (planId: number, medicalRecordId: number, patientId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['editTreatmentPlan', planId],
        mutationFn: async (data: EditTreatmentPlanInput) => {
            const filteredSteps = data.steps.filter((step) => step.trim() !== '');

            const payload: EditTreatmentPlanPayload = {
                medical_record_id: medicalRecordId,
                medical_diagnosis: data.medical_diagnosis,
                status: data.status,
                steps: filteredSteps.map((instruction, index) => ({
                    step_number: index + 1,
                    instruction,
                })),
            };
            return await apiClient.update(planId, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
        },
    });
};
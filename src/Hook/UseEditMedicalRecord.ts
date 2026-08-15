// import { useMutation } from "@tanstack/react-query"
// import ApiClient from "../apiServices/api_client"
// import type { EditMedicalRecordInput } from "../Schema/EditMedicalRecordSchema"
// import type { UpdateRecordResponse } from "../Entities/Patient"

// const apiClient = new ApiClient<UpdateRecordResponse , EditMedicalRecordInput >('/doctors')
// export const useEditMedicalRecord = (patientId:number) => {
//     return useMutation({
//         mutationKey: ['editRecord'],
//         mutationFn: async (data: EditMedicalRecordInput) => {
//             return await apiClient.update(patientId,data)
//         },
//     })
// }


// Hook/UseEditMedicalRecord.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { EditMedicalRecordInput } from "../Schema/EditMedicalRecordSchema";
import type { UpdateRecordResponse } from "../Entities/Patient";

interface UpdateMedicalRecordPayload {
    sickness: string[];
    allergies: string[];
    long_term_medication: string[];
    operations: string[];
}

const apiClient = new ApiClient<UpdateRecordResponse, EditMedicalRecordInput>('/patients');

export const useEditMedicalRecord = (patientId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['editRecord', patientId],
        mutationFn: async (data: EditMedicalRecordInput) => {
            // const payload: UpdateMedicalRecordPayload = {
            //     sickness: data.sickness.filter((s) => s.trim() !== ''),
            //     allergies: data.allergies.filter((a) => a.trim() !== ''),
            //     long_term_medication: data.long_term_medication.filter((m) => m.trim() !== ''),
            //     operations: data.operations.filter((o) => o.trim() !== ''),
            // };
            return await apiClient.update(`${patientId}/medical-record`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
        },
    });
};
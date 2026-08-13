import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { EditMedicalRecordInput } from "../Schema/EditMedicalRecordSchema"
import type { UpdateRecordResponse } from "../Entities/Patient"

const apiClient = new ApiClient<UpdateRecordResponse , EditMedicalRecordInput >('/doctors')
export const useEditMedicalRecord = (patientId:number) => {
    return useMutation({
        mutationKey: ['editRecord'],
        mutationFn: async (data: EditMedicalRecordInput) => {
            return await apiClient.update(patientId,data)
        },
    })
}
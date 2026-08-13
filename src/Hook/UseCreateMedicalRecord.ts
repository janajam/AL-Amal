import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { CreateMedicalRecordInput } from "../Schema/CreateMedicalRecordSchema"
import type { UpdateRecordResponse } from "../Entities/Patient"

const apiClient = new ApiClient<UpdateRecordResponse , CreateMedicalRecordInput >('/doctors')
export const useCreateMedicalRecord = () => {
    return useMutation({
        mutationKey: ['createRecored'],
        mutationFn: async (data: CreateMedicalRecordInput) => {
            return await apiClient.post(data)
        },
    })
}
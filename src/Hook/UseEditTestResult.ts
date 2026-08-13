import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { UpdateTestResponse } from "../Entities/Patient"
import type { EditTestResultInput } from "../Schema/EditTestResultSchema"

const apiClient = new ApiClient<UpdateTestResponse, EditTestResultInput>('/doctors')
export const useEditTstResult = (patientId: number) => {
    return useMutation({
        mutationKey: ['editRecord'],
        mutationFn: async (data: EditTestResultInput) => {
            return await apiClient.update(patientId, data)
        },
    })
}
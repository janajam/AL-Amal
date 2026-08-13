import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { EditContactInfoInput } from "../Schema/EditContactInfoSchema"
import type { UpdateContactInfoResponse } from "../Entities/Patient"

const apiClient = new ApiClient<UpdateContactInfoResponse , EditContactInfoInput >('/doctors')
export const useEditContentInfo = (patientId:number) => {
    return useMutation({
        mutationKey: ['editInfo'],
        mutationFn: async (data: EditContactInfoInput) => {
            return await apiClient.update(patientId,data)
        },
    })
}
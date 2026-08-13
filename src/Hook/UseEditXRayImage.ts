import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { UpdateImageResponse } from "../Entities/Patient"
import type { EditXRayImageInput } from "../Schema/EditXRayImageSchema"

const apiClient = new ApiClient<UpdateImageResponse , EditXRayImageInput >('/doctors')
export const useEditXRayImag= (patientId:number) => {
    return useMutation({
        mutationKey: ['editRecord'],
        mutationFn: async (data: EditXRayImageInput) => {
            return await apiClient.update(patientId,data)
        },
    })
}
import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { CreateOfferInput } from "../Schema/CreateOfferSchema"
import type { CreateOfferResponse } from "../Entities/OfferData"

const apiClient = new ApiClient<CreateOfferResponse , CreateOfferInput >('/admin/createOffer')
export const useCreateOffer = () => {
    return useMutation({
        mutationKey: ['createOffer'],
        mutationFn: async (data: CreateOfferInput) => {
            return await apiClient.post(data)
        },
    })
}
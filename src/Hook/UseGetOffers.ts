import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { OfferResponse } from "../Entities/OfferData";



const apiClient = new ApiClient<unknown, OfferResponse>("/admin/getOffers");

export const useGetOffers = () => {
    return useQuery({
        queryKey: ['offers'],
        queryFn: async () => {
            return await apiClient.getAll()
        }
    })
}
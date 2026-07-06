import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { OfferResponse, UpdateOffer } from "../Entities/OfferData";


export const useEditOffer=(offerId:number)=>{
    const apiClient = new ApiClient<OfferResponse, UpdateOffer>(`/admin/offers/${offerId}`);
    return useMutation({
        mutationKey:['updateOffer',offerId],
        mutationFn:async (data:UpdateOffer)=>apiClient.patch(offerId,data)
    })
}
 
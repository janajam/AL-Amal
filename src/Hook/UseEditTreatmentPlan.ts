import { useMutation } from "@tanstack/react-query"
import ApiClient from "../apiServices/api_client"
import type { UpdatePlanResponse } from "../Entities/Patient"
import type { EditTreatmentPlanInput } from "../Schema/EditTreatmentPlane"

const apiClient = new ApiClient<UpdatePlanResponse , EditTreatmentPlanInput >('/doctors')
export const useEditTreatmentPlan = (patientId:number) => {
    return useMutation({
        mutationKey: ['editPlan'],
        mutationFn: async (data: EditTreatmentPlanInput) => {
            return await apiClient.update(patientId,data)
        },
    })
}
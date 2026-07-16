import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { PatientsResponse } from "../Entities/Patient";

const apiClient= new ApiClient<unknown,PatientsResponse>('/doctor/patients')

export const useGetPatients=()=>{
    return useQuery({
        queryKey:['patients'],
        queryFn: async () => {
            return await apiClient.getAll()
        }
    })
}
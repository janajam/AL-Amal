// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import ApiClient from "../apiServices/api_client";
// import type { PatientsResponse } from "../Entities/Patient";

// const apiClient = new ApiClient<PatientsResponse>('/patients');

// interface UseGetPatientsParams {
//     search?: string;
// }

// export const useGetPatients=({search}:UseGetPatientsParams)=>{
//     return useQuery({
//         queryKey:['patients',search],
//         queryFn: async () => {
//             return await apiClient.getAll({
//                 params: { search }
//             });
//         },
//          placeholderData: keepPreviousData,
//         staleTime: 30 * 1000,
//     })
// }


 import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { PatientsResponse } from "../Entities/Patient";

const apiClient = new ApiClient<PatientsResponse>('/patients');

interface UseGetPatientsParams {
    search?: string;
}

export const useGetPatients = ({ search }: UseGetPatientsParams) => {
    const trimmedSearch = search?.trim();

    return useQuery({
        queryKey: ['patients', trimmedSearch],
        queryFn: async () => {
            return await apiClient.getAll({
                params: trimmedSearch ? { search: trimmedSearch } : {},
            });
        },
        placeholderData: keepPreviousData,
        staleTime: 30 * 1000,
    });
};
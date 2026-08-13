// import { useMutation } from "@tanstack/react-query"
// import ApiClient from "../apiServices/api_client"
// import type { CreateAccountInfo } from "../Schema/CreateAccountSchema"
// import type { CreateAccountsResponse } from "../Entities/AccountsData"

// const apiClient = new ApiClient<CreateAccountsResponse , CreateAccountInfo >('/doctors')
// export const useCreateDoctorAccount = () => {
//     return useMutation({
//         mutationKey: ['createAccount'],
//         mutationFn: async (data: CreateAccountInfo) => {
//             return await apiClient.post(data)
//         },
//     })
// }


// Hook/UseCreateAccount.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { CreateAccountInfo } from "../Schema/CreateAccountSchema";
import type { CreateAccountPayload, CreateDoctorResponse } from "../Entities/DoctorData";


const doctorsApi = new ApiClient<CreateDoctorResponse, CreateAccountPayload>('/doctors');
const secretariesApi = new ApiClient<CreateDoctorResponse, CreateAccountPayload>('/secretaries');

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createAccount'],
        mutationFn: async (data: CreateAccountInfo) => {
            const payload: CreateAccountPayload = {
                full_name: data.full_name,
                email: data.email,
                // password: data.password,
                phone: data.phone,
                gender: data.gender,
                birth_date: data.birth_date,
                address: data.address,
                department_id: data.department_id,
                ...(data.role === 'Doctor' && {
                    specialization: data.specialization,
                    biography: data.biography,
                }),
            };

            const client = data.role === 'Doctor' ? doctorsApi : secretariesApi;
            return await client.post(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
    });
};
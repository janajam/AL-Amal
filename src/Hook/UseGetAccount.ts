// import { useQuery } from "@tanstack/react-query";
// import ApiClient from "../apiServices/api_client";
// import type { AccountResponse } from "../Entities/AccountsData";


// const apiClient =new ApiClient<unknown, AccountResponse>("/admin/accounts");

//     export const useGetAccount = (id: number) => {
//     return useQuery({
//         queryKey: ["account", id],
//         queryFn: () => apiClient.get(id),
//         enabled: !!id,
//     });
// };


// Hook/UseGetAccount.ts
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { DoctorAccountResponse, SecretaryAccountResponse } from "../Entities/AccountsData";

const doctorsApi = new ApiClient<DoctorAccountResponse>("/doctors");
const secretariesApi = new ApiClient<SecretaryAccountResponse>("/secretaries");

export const useGetAccount = (id: number, role: "Doctor" | "Secretary") => {
    return useQuery({
        queryKey: ["account", role, id],
        queryFn: async () => {
            const client = role === "Doctor" ? doctorsApi : secretariesApi;
            return await client.get(id);
        },
        enabled: !!id,
    });
};
import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { DepartmentResponse } from "../Entities/DepartmentData";



const apiClient = new ApiClient<unknown, DepartmentResponse>("/admin/getDepartments");

export const useGetDepartments = () => {
    return useQuery({
        queryKey: ['departments'],
        queryFn: async () => {
            return await apiClient.getAll()
        }
    })
}
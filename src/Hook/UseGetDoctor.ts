import { useQuery } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { DoctorResponse } from "../Entities/DoctorData";

const apiClient = new ApiClient<DoctorResponse>("/doctors");

export const useGetDoctor = (id: number) => {
  return useQuery<DoctorResponse>({
    queryKey: ["doctor", id],

    queryFn: async () =>{
        return await apiClient.get(id)
    },
    
    enabled: !!id,
  });
};
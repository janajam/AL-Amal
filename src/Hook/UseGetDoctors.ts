import { useQuery } from "@tanstack/react-query";
import type { DoctorsResponse } from "../Entities/DoctorData";
import ApiClient from "../apiServices/api_client";

const apiClient = new ApiClient<DoctorsResponse>(
"/doctors"
);

export const useGetDoctors = () => {
return useQuery<DoctorsResponse>({
    queryKey: ["doctors"],
    queryFn: async () => {
        return await apiClient.getAll()
    }
});
};
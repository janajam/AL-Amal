import { useQuery } from "@tanstack/react-query";
import type { SecretaryListItem } from "../Entities/SecrtaryData";
import ApiClient from "../apiServices/api_client";

interface SingleSecretaryResponse {
  success: boolean;
  status: number;
  message: string;
  data: SecretaryListItem;
  errors: any;
}

const apiClient = new ApiClient<SingleSecretaryResponse>("/secretaries");

export const useGetSecretary = (id: number) => {
  return useQuery({
    queryKey: ["secretary", id],
    queryFn: () => apiClient.get(id),
    enabled: !!id && !isNaN(id),
  });
};
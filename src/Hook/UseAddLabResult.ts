import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { CreateLabResultResponse } from "../Entities/Patient";

const apiClient=new ApiClient<CreateLabResultResponse, FormData>(
    "/lab-results"
  );
const useCreateLabResult = (patientId: number) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      apiClient.post(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient", patientId],
      });
    },
  });
};

export default useCreateLabResult;
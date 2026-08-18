import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { UpdateImageResponse } from "../Entities/Patient";
import type { EditXRayImageInput } from "../Schema/EditXRayImageSchema";

export const useEditXRayImage = (
  resultId: number,
  patientId?: number
) => {
  const queryClient = useQueryClient();

  const apiClient = new ApiClient<UpdateImageResponse, FormData>(
    `/radiology-results/${resultId}`
  );

  return useMutation({
    mutationKey: ["editRadiologyResult", resultId],

    mutationFn: async (data: EditXRayImageInput) => {
  const formData = new FormData();

  formData.append(
    "doctor_name",
    data.doctor_name
  );

  formData.append(
    "type",
    data.type
  );

  formData.append(
    "description",
    data.description
  );

  if (data.image) {
    formData.append(
      "image",
      data.image
    );
  }

  return await apiClient.post(formData);
    },

    onSuccess: () => {
      if (patientId) {
        queryClient.invalidateQueries({
          queryKey: ["patient", patientId],
        });
      }
    },
  });
};
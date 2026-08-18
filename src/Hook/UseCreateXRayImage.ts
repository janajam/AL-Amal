import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { CreateXRayImageResponse } from "../Entities/Patient";
import type { AddXRayImageInput } from "../Schema/AddXRayImageSchema";

export const useAddXRayImage = (
  medicalRecordId: number,
  patientId?: number
) => {
  const queryClient = useQueryClient();

  const apiClient = new ApiClient<
    CreateXRayImageResponse,
    FormData
  >("/radiology-results");

  return useMutation({
    mutationKey: ["addRadiologyResult"],

    mutationFn: async (
      data: AddXRayImageInput
    ) => {
      const formData = new FormData();

      formData.append(
        "medical_record_id",
        String(medicalRecordId)
      );

      formData.append("type", data.type);

      formData.append(
        "description",
        data.description
      );

      formData.append(
        "doctor_name",
        data.doctor_name
      );

      formData.append(
        "image",
        data.image
      );

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
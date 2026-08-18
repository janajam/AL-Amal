// // Hook/UseEditTestResult.ts
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import ApiClient from "../apiServices/api_client";
// import type { UpdateLabResultResponse } from "../Entities/Patient";

// export const useEditTestResult = (resultId: number, patientId: number) => {
//     const queryClient = useQueryClient();
//     const apiClient = new ApiClient<UpdateLabResultResponse, FormData>(`/lab-results/${resultId}`);

//     return useMutation({
//         mutationFn: async (formData: FormData) => {
//             formData.append("_method", "PUT");
//             return await apiClient.post(formData);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["patient", patientId] });
//         },
//     });
// };

// Hook/UseEditTestResult.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";
import type { UpdateImageResponse } from "../Entities/Patient";

type EditTestPayload = FormData | { remove_attachment: boolean };

export const useEditTestResult = (resultId: number, patientId: number) => {
    const queryClient = useQueryClient();
    
    // إنشاء apiClient
    const apiClient = new ApiClient<UpdateImageResponse, EditTestPayload>(`/lab-results/${resultId}`);

    return useMutation({
        mutationFn: async (payload: EditTestPayload) => {
           console.log("Payload being sent to the server:", payload);
            // السيرفر يتوقع POST دائماً لهذا الـ Route
            return await apiClient.post(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patient", patientId] });
        },
    });
};
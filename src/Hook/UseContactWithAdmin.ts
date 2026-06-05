import { useMutation } from "@tanstack/react-query";
import ApiClient from "../apiServices/api_client";

interface ContactData {
    contactEmail: string;
    contactAsk: string;
}

const apiClient = new ApiClient<{ status: number }, ContactData>("/contact/admin");

export const useContactWithAdmin = () => {
    return useMutation({
        mutationKey: ["contactAdmin"],
        mutationFn: async (data: ContactData) => {
            return await apiClient.post(data);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                console.log("Message sent successfully");
            }
        }
    })

}
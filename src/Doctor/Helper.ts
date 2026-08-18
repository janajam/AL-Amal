// export const getLabAttachmentUrl = (
//   attachment: string
// ) => {

import { axiosInstance } from "../apiServices/api_client";

//   if (attachment.startsWith("http")) {
//     return attachment;
//   }

//   return `http://localhost:8000/storage/${attachment}`;
// };

export const getLabAttachmentUrl = (
    attachment?: string | null
): string => {

    if (!attachment) {
        return "";
    }

    if (
        attachment.startsWith("http://") ||
        attachment.startsWith("https://")
    ) {
        return attachment;
    }

    return `http://localhost:8000/storage/${attachment}`;
};

export const openLabAttachment = async (
    attachment?: string | null
) => {

    if (!attachment) {
        return;
    }

    const url = getLabAttachmentUrl(attachment);

    try {

        const response = await axiosInstance.get(url, {
            responseType: "blob",
        });

        const blobUrl = URL.createObjectURL(response.data);

        window.open(
            blobUrl,
            "_blank",
            "noopener,noreferrer"
        );

    } catch (error) {

        console.error(
            "Failed to open lab attachment:",
            error
        );

    }
};



export const downloadLabAttachment = async (
    attachment?: string | null
) => {

    if (!attachment) {
        return;
    }

    const url = getLabAttachmentUrl(attachment);

    try {

        const response = await axiosInstance.get(url, {
            responseType: "blob",
        });

        const blobUrl = URL.createObjectURL(response.data);

        const link = document.createElement("a");

        link.href = blobUrl;
        link.download = "lab-result.pdf";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(blobUrl);

    } catch (error) {

        console.error(
            "Failed to download lab attachment:",
            error
        );

    }
};
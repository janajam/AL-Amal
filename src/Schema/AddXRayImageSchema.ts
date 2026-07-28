import { z } from "zod";

export const createXRayImageSchema = z.object({

    requestedBy: z.string().min(2),

    uploaded_by: z.string().min(2),

    type: z.string().min(2),

    description: z.string().min(3),

    image: z.instanceof(File, {
        message: "Image is required"
    }),

});

export type AddXRayImageInput =
    z.infer<typeof createXRayImageSchema>;
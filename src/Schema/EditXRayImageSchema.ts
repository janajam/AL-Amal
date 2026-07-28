import { z } from "zod";

export const editXRayImageSchema = z.object({

    requestedBy: z
        .string()
        .min(2),

    uploaded_by: z
        .string()
        .min(2),

    type: z
        .string()
        .min(2),

    description: z
        .string()
        .min(3),

    uploaded_at: z.date(),

    image: z.instanceof(File).optional()
});

export type EditXRayImageInput =
    z.infer<typeof editXRayImageSchema>;
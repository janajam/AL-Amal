import { z } from "zod";

export const editXRaySchema = z.object({

    doctorName: z
        .string()
        .min(2),

    type: z
        .string()
        .min(2),

    description: z
        .string()
        .min(3),

    date: z.date(),

    image: z
        .instanceof(File)
        .optional()

});

export type EditXRayInput =
    z.infer<typeof editXRaySchema>;
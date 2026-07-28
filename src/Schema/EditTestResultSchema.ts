import { z } from "zod";

export const editTestResultSchema = z.object({

    requestedBy: z
        .string()
        .min(2),

    uploaded_by: z
        .string()
        .min(2),

    title: z
        .string()
        .min(2),

    attachment: z
        .instanceof(File)
        .optional(),

    result: z.string().min(2)


});

export type EditTestResultInput =
    z.infer<typeof editTestResultSchema>;
import { z } from "zod";

export const editTestResultSchema = z.object({

    doctor_name: z
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
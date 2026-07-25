import { z } from "zod";

export const editTestResultSchema = z.object({

    doctorName: z
        .string()
        .min(2),

    labWorkingName: z
        .string()
        .min(2),

    date: z.date(),

    reportName: z
        .string()
        .min(2),

    reportFile: z
        .instanceof(File)
        .optional()

});

export type EditTestResultInput =
    z.infer<typeof editTestResultSchema>;
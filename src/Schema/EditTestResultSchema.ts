import { z } from "zod";

export const editTestResultSchema = z.object({

    attachment: z
        .instanceof(File)
        .optional(),

    result: z.string().min(2)


});

export type EditTestResultInput =
    z.infer<typeof editTestResultSchema>;
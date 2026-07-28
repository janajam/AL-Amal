import z from "zod";

export const createTestResultSchema = z.object({
    requestedBy: z.string().min(2),

    uploaded_by: z.string().min(2),

    title: z.string().min(2),

    result: z.string().min(2),

    attachment: z.instanceof(File).optional()
});


export type AddTestResultInput = z.infer<typeof createTestResultSchema>;

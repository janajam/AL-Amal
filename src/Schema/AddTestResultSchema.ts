// import z from "zod";

import z from "zod";

// export const createTestResultSchema = z.object({
//     requestedBy: z.string().min(2),

//     uploaded_by: z.string().min(2),

//     title: z.string().min(2),

//     result: z.string().min(2),

//     attachment: z.instanceof(File).optional()
// });


// export type AddTestResultInput = z.infer<typeof createTestResultSchema>;


// Schema/AddTestResultSchema.tsimport z from "zod";

export const createTestResultSchema = z.object({
  medical_diagnosis: z
    .string()
    .min(2, "Medical diagnosis is required"),

  medical_record_id: z
    .number()
    .positive(),
doctor_name:z.string().min(3),
  title: z
    .string()
    .min(2, "Test title is required"),

  result: z
    .string()
    .min(2, "Result description is required"),

  attachment: z
    .instanceof(File)
    .optional(),
});

export type AddTestResultInput =
  z.infer<typeof createTestResultSchema>;
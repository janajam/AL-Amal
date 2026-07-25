import { z } from "zod";
export const editMedicalRecordSchema = z.object({
  sickness: z.array(z.string()),
  allergies: z.array(z.string()),
  longTermMedication: z.array(z.string()),
  operations: z.array(z.string()),
});
export type EditMedicalRecordInput =
    z.infer<typeof editMedicalRecordSchema>;
import { z } from "zod";

export const editTreatmentPlanSchema = z.object({
    medical_diagnosis: z
        .string()
        .min(3, "Diagnosis is required"),

    steps: z
        .array(z.string().min(1))
        .min(1, "Add at least one step"),

    status: z.enum([
        "ongoing",
        "finished"
    ])
});

export type EditTreatmentPlanInput =
    z.infer<typeof editTreatmentPlanSchema>;
import { z } from "zod";

export const editTreatmentPlanSchema = z.object({
    medicalDiagnosis: z
        .string()
        .min(3, "Diagnosis is required"),

    treatmentSteps: z
        .array(z.string().min(1))
        .min(1, "Add at least one step"),

    status: z.enum([
        "Ongoing",
        "Finished"
    ])
});

export type EditTreatmentPlanInput =
    z.infer<typeof editTreatmentPlanSchema>;
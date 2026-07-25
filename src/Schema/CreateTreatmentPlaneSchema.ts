import { z } from "zod";

export const createTreatmentPlanSchema = z.object({

    medicalDiagnosis: z
        .string()
        .min(3),

    doctorName: z
        .string()
        .min(2),

    treatmentSteps: z
        .array(z.string().min(1))
        .min(1),

    date: z.date(),

    status: z.enum([
        "Ongoing",
        "Finished"
    ])

});

export type CreateTreatmentPlanInput =
    z.infer<typeof createTreatmentPlanSchema>;
import { z } from "zod";

export const createTreatmentPlanSchema = z.object({

    medical_diagnosis: z
        .string()
        .min(3),

    steps:
        z.array(z.string().min(1))
            .min(1),

    
});

export type CreateTreatmentPlanInput =
    z.infer<typeof createTreatmentPlanSchema>;
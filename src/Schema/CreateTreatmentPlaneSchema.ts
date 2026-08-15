import { z } from "zod";

export const createTreatmentPlanSchema = z.object({

    medical_diagnosis: z
        .string()
        .min(3),

    // doctorName: z
    //     .string()
    //     .min(2),

    steps: 
z.array(z.string().min(1))
        .min(1),

    // date: z.date(),
    // updatedDate: z.date().optional(),
    // status: z.enum([
    //     "Ongoing",
    //     "Finished"
    // ])

});

export type CreateTreatmentPlanInput =
    z.infer<typeof createTreatmentPlanSchema>;
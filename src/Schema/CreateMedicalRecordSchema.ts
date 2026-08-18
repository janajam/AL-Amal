import { z } from "zod";

export const CreateMedecalRecordSchema = z.object({

    
        sickness: z.array(z.string()).default([]).optional(),

        allergies: z.array(z.string()).default([]).optional(),

        long_term_medication: z.array(z.string()).default([]).optional(),

        operations: z.array(z.string()).default([]).optional(),

});

export type CreateMedicalRecordInput =
    z.infer<typeof CreateMedecalRecordSchema>;
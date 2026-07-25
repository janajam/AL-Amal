import { z } from "zod";

export const CreateMedecalRecordSchema = z.object({

    name: z.string().min(2),

    age: z.number().min(1),

    gander: z.enum(["Male", "Female"]),

    phoneNumber: z.string().min(10),

    email: z.email(),

    address: z.string().min(3),

    medicalRecord: z.object({

        sickness: z.array(z.string()).default([]),

        allergies: z.array(z.string()).default([]),

        longTermMedication: z.array(z.string()).default([]),

        operations: z.array(z.string()).default([]),

    }),

});

export type CreateMedicalRecordInput =
    z.infer<typeof CreateMedecalRecordSchema>;
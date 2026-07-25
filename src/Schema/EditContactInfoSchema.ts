import z from "zod";


export const editContactInfoSchema =
    z.object({
        name: z.string().min(2),

        phoneNumber: z.string().min(10),

        email: z.email(),

        address: z.string().min(3),

    })


export type EditContactInfoInput =
    z.infer<typeof editContactInfoSchema>;
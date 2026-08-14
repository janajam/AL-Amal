import z from "zod";


export const editContactInfoSchema =
    z.object({
        full_name: z.string().min(2),

        phone: z.string().min(10),

        email: z.email(),

        address: z.string().min(3),

    })


export type EditContactInfoInput =
    z.infer<typeof editContactInfoSchema>;
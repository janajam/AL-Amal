import z from "zod";


export const createOfferSchema = z.object({
    title: z.string().min(1, { message: 'required please enter the name' }),
    description: z.string().min(1, { message: 'required please enter the description' }),
    startTime: z.string().min(1, { message: 'required please enter the start time' }),
    endTime: z.string().min(1, { message: 'required please enter the end time' }),
    status:z.string()
})

export type CreateOfferInput = z.infer<typeof createOfferSchema>;
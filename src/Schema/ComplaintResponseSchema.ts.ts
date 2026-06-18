import z from "zod";



export const ComplaintResponseSchema = z.object({
 email:z.string().email({message:'please enter the email it is required'}),
 response:z.string().min(2,{message:'please enter response it is require'})
})


export type ComplaintResponseInput = z.infer<typeof ComplaintResponseSchema>;

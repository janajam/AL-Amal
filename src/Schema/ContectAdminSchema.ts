import z from "zod";


export const ContactAdminSchema= z.object({
    contectEmail:z.string().email({message:'please enter the email it is require'}),
    contectAsk:z.string().min(3,{message:'please enter your ask '})
    
})



export type ContectAdminInput = z.infer<typeof ContactAdminSchema>;

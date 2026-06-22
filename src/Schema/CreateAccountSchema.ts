import z from "zod";

export const CreateAccountSchema=z.object({
    name :z.string().min(1,{message:'required please enter the name'}),
    email:z.string().email({message:'please enter correct email '}),
    phoneNumber:z.string()
    .min(10,{message:'the phone number must be 10 degite'})
    .max(10,{message:'the phone number must be 10 degite'}),
    address:z.string().min(3),
    specialty:z.string().min(2),
    department:z.string().min(2),
    role:z.string().min(2,{message:'Role should be Doctor Or Secretary'}),
    birthday:z.string().min(1,{message:'required please enter the birthday'}),

})

 export type CreateAccountInfo = z.infer<typeof CreateAccountSchema>;

import z from "zod";

export const CreateAccountSchema=z.object({
    name :z.string().min(1,{message:'required please enter the name'}),
    email:z.string().email({message:'please enter correct email '}),
    phoneNumber:z.string()
    .min(10,{message:'the phone number must be 10 degite'})
    .max(10,{message:'the phone number must be 10 degite'}),
    address:z.string().min(3),
    specialty:z.string().optional(),
    department:z.string().min(2), 
    role:z.string().min(2,{message:'Role should be Doctor Or Secretary'}),
    birthday:z.string().min(1,{message:'required please enter the birthday'}),

}).refine(
    (data) => {
        if (data.role === "Doctor") {
            return !!data.specialty;
        }
        return true;
    },
    {
        path:["specialty"],
        message:"Specialty is required for doctors",
    }
);

 export type CreateAccountInfo = z.infer<typeof CreateAccountSchema>;

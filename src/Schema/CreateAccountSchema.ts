import z from "zod";

export const CreateAccountSchema = z.object({
    full_name: z.string().min(1, { message: 'required please enter the name' }),
    email: z.string().email({ message: 'please enter correct email ' }),
    phone: z.string()
        .min(10, { message: 'the phone number must be 10 degite' })
        .max(10, { message: 'the phone number must be 10 degite' }),
    address: z.string().min(3),
    specialization: z.string().optional(),
    gender: z.enum(['male', 'female'],{message:'required please enter the gender'}),
        biography:z.string().optional(),
    department_id: z.number({message:'the department is required'}),
    role: z.enum(['Doctor', 'Secretary'], { message:'Role should be Doctor Or Secretary' }),
    birth_date: z.string().min(1, { message: 'required please enter the birthday' }),

}).refine(
    (data) => {
        if (data.role === "Doctor") {
            return !!data.specialization;
        }
        return true;
    },
    {
        path: ["specialty",'biography'],
        message: "are required for doctors",
    },
);

export type CreateAccountInfo = z.infer<typeof CreateAccountSchema>;

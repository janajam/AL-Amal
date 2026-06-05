import { z } from "zod";

export const loginSchema = z.object({

  userName: z.string().min(3, { message: "User Name must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});




export type LoginInput = z.infer<typeof loginSchema>;

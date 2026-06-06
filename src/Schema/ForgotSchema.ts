import z from "zod";

export const forgotSchema = z.object({
   email: z.string().email({ message: "Invalid email" }),
  
  })

 export type ForgotInfo = z.infer<typeof forgotSchema>;

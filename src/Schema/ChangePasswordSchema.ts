// resetPasswordSchema.ts
import { z } from "zod";

export const changePasswordSchema = z
  .object({
    passwordCurrent: z
      .string()
      .min(6, "Password must be at least 6 characters"),
      password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

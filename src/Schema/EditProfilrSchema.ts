import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phoneNumber: z
    .string()
    .min(7, "Phone number is invalid"),

  birthDay: z
    .string({
      error: "Birth date is required",
    }),

  address: z
    .string()
    .min(2, "Address is required"),

  // Doctor only
  specialty: z
    .string()
    .optional(),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
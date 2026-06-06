import z from "zod";

// Zod Schema for OTP (6-digit numeric code)
export const otpSchema = z.object({
  code: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be a number"),
});

export type OtpInput = z.infer<typeof otpSchema>;

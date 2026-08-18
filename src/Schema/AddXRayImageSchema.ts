import { z } from "zod";

export const createXRayImageSchema = z.object({
  type: z.string().min(2, "Image type is required"),

  description: z.string().min(3, "Description is required"),

  doctor_name: z.string().min(2, "Doctor name is required"),

  image: z.instanceof(File, {
    message: "Image is required",
  }),
});

export type AddXRayImageInput = z.infer<
  typeof createXRayImageSchema
>;
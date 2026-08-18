// import { z } from "zod";

// export const editXRayImageSchema = z.object({

//     requestedBy: z
//         .string()
//         .min(2),

//     uploaded_by: z
//         .string()
//         .min(2),

//     type: z
//         .string()
//         .min(2),

//     description: z
//         .string()
//         .min(3),

//     uploaded_at: z.date(),

//     image: z.instanceof(File).optional()
// });

// export type EditXRayImageInput =
//     z.infer<typeof editXRayImageSchema>;



import { z } from "zod";

export const editXRayImageSchema = z.object({
  doctor_name: z.string().min(2, "Doctor name is required"),
  description: z.string().min(3, "Description is required"),
  type: z.string().min(2, "Image type is required"),
  image: z.instanceof(File).optional(),
});

export type EditXRayImageInput = z.infer<typeof editXRayImageSchema>;
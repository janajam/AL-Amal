import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";

const dayjsSchema = z
    .custom<Dayjs>((value) => dayjs.isDayjs(value) && value.isValid(), {
        message: "Invalid time.",
    });

export const appointmentDetailsSchema = z
    .object({
        patientName: z.string().trim().min(1, "Patient name is required."),
     appointmentType: z.string().trim().min(1, "Appointment type is required."),
        status: z.enum(["Booked", "Completed"]),
        startTime: dayjsSchema,
        endTime: dayjsSchema,
    })
    .refine(
        (data) => data.endTime.isAfter(data.startTime),
        { message: "End time must be after start time.", path: ["endTime"] }
    );

export type AppointmentDetailsInput = z.infer<typeof appointmentDetailsSchema>;
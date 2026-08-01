import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";


const dayjsSchema = z
    .custom<Dayjs>((value) => dayjs.isDayjs(value) && value.isValid(), {
        message: "Invalid time.",
    });

export const bookingSchema = z
    .object({
        patientName: z
            .string()
            .trim()
            .min(1, "Patient name is required."),

        appointmentType: z
            .string()
            .trim()
            .min(1, "Appointment type is required."),

        startTime: dayjsSchema,
        endTime: dayjsSchema,
    })
    .refine(
        (data) => data.endTime.isAfter(data.startTime),
        {
            message: "End time must be after start time.",
            path: ["endTime"], // الخطأ يظهر تحديداً تحت حقل endTime
        }
    );

export type BookingFormInput = z.infer<typeof bookingSchema>;
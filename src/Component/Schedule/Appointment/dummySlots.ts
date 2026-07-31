
import type { TimeSlot } from "../../../Entities/Appointment";
import { dummyAppointments } from "./dummyAppointments";

export const dummySlots: TimeSlot[] = [

    {
        id: 1,
        date: "2026-08-06",
        startTime: "07:00",
        endTime: "07:30",
        status: "Cancelled",
        appointment: dummyAppointments[0],
    },
    {
        id: 2,
        date: "2026-08-06",
        startTime: "07:30",
        endTime: "08:00",
        status: "Available",
    },
    {
        id: 3,
        date: "2026-08-06",
        startTime: "10:00",
        endTime: "10:30",
        status: "Booked",
        appointment: dummyAppointments[1],
    },
    {
        id: 4,
        date: "2026-08-08",
        startTime: "11:00",
        endTime: "11:30",
        status: "Finished",
        appointment: dummyAppointments[2],
    },
    {
        id: 5,
        date: "2026-08-07",
        startTime: "11:30",
        endTime: "12:00",
        status: "Available",
    },
{
        id: 6,
        date: "2026-08-01",
        startTime: "11:30",
        endTime: "12:00",
        status: "Available",
    },

];
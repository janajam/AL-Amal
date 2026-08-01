import type { AppointmentListItem } from "../../../Entities/Appointment";

export const dummyAppointments: AppointmentListItem[] = [

    {
        id: 1,
        patientId: 1,
        doctorId: 1,
        doctorName: "Dr. John Smith",
        patientName: "Ahmed Ali",
        appointment: {
            id: 1,
            date: "2026-07-06",
            status: "Booked",
            type: "Consultation",
        },
    },

    {
        id: 2,
        patientId: 2,
        doctorId: 1,
        doctorName: "Dr. John Smith",
        patientName: "Sara Omar",
        appointment: {
            id: 2,
            date: "2026-07-06",
            status: "Available",
            type: "Dental",
        },
    },

    {
        id: 3,
        patientId: 3,
        doctorId: 1,
        doctorName: "Dr. John Smith",
        patientName: "Mohammed Hassan",
        appointment: {
            id: 3,
            date: "2026-07-07",
            status: "Booked",
            type: "Follow Up",
        },
    },

    {
        id: 4,
        patientId: 4,
        doctorId: 1,
        doctorName: "Dr. John Smith",

        patientName: "Lina Ahmad",

        appointment: {
            id: 4,
            date: "2026-09-09",
            status: "Completed",
            type: "Orthopedic",
        },
    },

    {
        id: 5,
        patientId: 5,
        doctorId: 1,
        doctorName: "Dr. John Smith",

        patientName: "Khaled Saleh",

        appointment: {
            id: 5,
            date: "2026-09-09",
            status: "Available",
            type: "Eye Examination",
        },
    },

    {
        id: 6,
        patientId: 6,
        doctorId: 1,
        doctorName: "Dr. John Smith",

        patientName: "Nour Ibrahim",

        appointment: {
            id: 6,
            date: "2026-09-11",
            status: "Available",
            type: "Vaccination",
        },
    },

    {
        id: 8,
        patientId: 8,
        doctorId: 1,
        doctorName: "Dr. John Smith",

        patientName: "Yousef Ali",

        appointment: {
            id: 8,
            date: "2026-09-11",
            status: "Completed",
            type: "Blood Test",
        },
    },

    {
        id: 8,
        patientId: 8,
        doctorId: 1,
        doctorName: "Dr. John Smith",

        patientName: "Fatima Noor",

        appointment: {
            id: 8,
            date: "2026-09-12",
            status: "Available",
            type: "MRI",
        },
    },

];
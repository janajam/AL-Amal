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
            patientName: "Ahmed Ali",
            doctorId: 1,
            date: "2026-07-06",
            startTime: "07:00",
            endTime: "07:30",
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
            patientName: "Sara Omar",
            doctorId: 1,
            date: "2026-07-06",
            startTime: "10:00",
            endTime: "10:30",
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
            patientName: "Mohammed Hassan",
            doctorId: 1,
            date: "2026-07-07",
            startTime: "11:00",
            endTime: "11:30",
            status: "Finished",
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
            patientName: "Lina Ahmad",
            doctorId: 1,
            date: "2026-09-09",
            startTime: "09:30",
            endTime: "10:00",
            status: "Cancelled",
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
            patientName: "Khaled Saleh",
            doctorId: 1,
            date: "2026-09-09",
            startTime: "11:00",
            endTime: "11:30",
            status: "Booked",
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
            patientName: "Nour Ibrahim",
            doctorId: 1,
            date: "2026-09-11",
            startTime: "13:00",
            endTime: "13:30",
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
            patientName: "Yousef Ali",
            doctorId: 1,
            date: "2026-09-11",
            startTime: "09:30",
            endTime: "09:00",
            status: "Booked",
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
            patientName: "Fatima Noor",
            doctorId: 1,
            date: "2026-09-12",
            startTime: "14:00",
            endTime: "14:30",
            status: "Finished",
            type: "MRI",
        },
    },

];
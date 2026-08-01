export interface Appointment {
    id: number;
 date: string;
    status:
        | "Available"
        | "Booked"
        | "Completed";
    type: string;
}

export interface AppointmentListItem {
    id: number;
    patientName: string;
    doctorName: string;
    appointment: Appointment;
    patientId: number;
    doctorId: number;
}

export interface AppointmentResponse {
    data: AppointmentListItem;
    message: string;
    status: number;
}



export type SlotStatus =
    | "Available"
    | "Booked"
    | "Completed"
export interface TimeSlot {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    status: SlotStatus;
    // موجود فقط لما status !== "Available"
    appointment?: AppointmentListItem;
}

export interface TimeSlotsResponse {
    status: number;
    message: string;
    data: TimeSlot[];
}
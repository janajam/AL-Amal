

export type BackendSlotStatus =
  | "available"
  | "booked";

export type SlotStatus =
  | "Available"
  | "Booked";

export interface BackendAppointmentPatient {
  id: number;
  name: string;
}

export interface BackendAppointment {
  id: number;
  doctor_id: number;
  status: "scheduled" | "cancelled";
  created_at: string;
  patient: BackendAppointmentPatient;
}

export interface BackendAppointmentSlot {
  id: number;
  start_time: string;
  end_time: string;
  status: BackendSlotStatus;
  created_at: string;
  appointments: BackendAppointment[];
}

export interface BackendAppointmentDay {
  date: string;
  day_name: string;
  slots: BackendAppointmentSlot[];
}

export interface BackendAppointmentWeek {
  week: number;
  days: BackendAppointmentDay[];
}

export interface BackendAppointmentMonth {
  year: number;
  month: number;
  weeks: BackendAppointmentWeek[];
}

export interface AppointmentSlotsResponse {
  success: boolean;
  status: number;
  message: string;
  data: BackendAppointmentMonth;
  errors: null;
}


// Frontend model

export interface Appointment {
  id: number;
  date: string;
  status: SlotStatus;
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

export interface TimeSlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  appointment?: AppointmentListItem;
}

export interface BookAppointmentDoctor {
    id: number;
    name: string;
    specialization: string;
    image: string | null;
}

export interface BookedAppointment {
    id: number;
    doctor: BookAppointmentDoctor;
    date: string;
    start_time: string;
    end_time: string;
    status: string;
    reason: string | null;
    notes: string | null;
    cancelled_at: string | null;
}

export interface BookAppointmentResponse {
    success: boolean;
    status: number;
    message: string;
    data: BookedAppointment;
    errors: any;
}

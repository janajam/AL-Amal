
import type {
  BackendAppointmentMonth,
  AppointmentListItem,
  TimeSlot,
} from "../../../Entities/Appointment";


export const getMonthWeeks = (
  monthData: BackendAppointmentMonth
): string[][] => {

  return monthData.weeks.map((week) =>
    week.days.map((day) => day.date)
  );

};

export const mapBackendSlotToTimeSlot = (
  slot: BackendAppointmentMonth["weeks"][number]["days"][number]["slots"][number],
  date: string
): TimeSlot => {
  const backendAppointment = slot.appointments.find(
    (appointment) =>
      appointment.status === "scheduled"
  );

  return {

    id: slot.id,

    date,

    startTime: slot.start_time.slice(0, 5),

    endTime: slot.end_time.slice(0, 5),

    status:
      slot.status === "available"
        ? "Available"
        : "Booked",

    appointment: backendAppointment
      ? ({
          id: backendAppointment.id,

          patientName:
            backendAppointment.patient.name,

          doctorName: "",

          patientId:
            backendAppointment.patient.id,

          doctorId:
            backendAppointment.doctor_id,

          appointment: {
            id: backendAppointment.id,

            date,

            status: "Booked",

            type: "Appointment",
          },
        } satisfies AppointmentListItem)
      : undefined,
  };
};



export const transformSlots = (
  monthData: BackendAppointmentMonth
): TimeSlot[] => {

  const slots: TimeSlot[] = [];

  monthData.weeks.forEach((week) => {

    week.days.forEach((day) => {

      day.slots.forEach((slot) => {

        slots.push(
          mapBackendSlotToTimeSlot(
            slot,
            day.date
          )
        );

      });

    });

  });

  return slots;
};
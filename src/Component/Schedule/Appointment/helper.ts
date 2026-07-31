
import dayjs from "dayjs";
import type { TimeSlot } from "../../../Entities/Appointment";

export const groupSlotsByDay = (
    slots: TimeSlot[],
    weekDates: string[]
): Map<string, TimeSlot[]> => {

    const grouped = new Map<string, TimeSlot[]>();

    weekDates.forEach((date) => grouped.set(date, []));

    slots.forEach((slot) => {

        const date = dayjs(slot.date).format("YYYY-MM-DD");

        if (grouped.has(date)) {
            grouped.get(date)!.push(slot);
        }

    });

    grouped.forEach((daySlots) => {
        daySlots.sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
        );
    });

    return grouped;

};
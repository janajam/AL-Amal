
import dayjs, { Dayjs } from "dayjs";

export const getMonthWeeks = (selectedMonth: Dayjs): string[][] => {

    const startOfMonth = selectedMonth.startOf("month");
    const endOfMonth = selectedMonth.endOf("month");

    const weeks: string[][] = [];
    let currentWeek: string[] = [];

    let day = startOfMonth;

    while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {

        currentWeek.push(day.format("YYYY-MM-DD"));

        const isSaturday = day.day() === 6;        
        const isLastDayOfMonth = day.isSame(endOfMonth, "day");

        if (isSaturday || isLastDayOfMonth) {
            weeks.push(currentWeek);
            currentWeek = [];
        }

        day = day.add(1, "day");
    }

    return weeks;
};
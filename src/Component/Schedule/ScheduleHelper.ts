// import dayjs from "dayjs";
// import type { WorkingSchedule } from "../../Entities/WorkingSchedualeData";

// export const splitScheduleIntoWeeks = (
//   schedule: WorkingSchedule[]
// ): WorkingSchedule[][] => {

//   if (!schedule.length) return [];

//   // Sort by date first
//   const sortedSchedule = [...schedule].sort(
//     (a, b) =>
//       dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
//   );

//   const weeks: WorkingSchedule[][] = [];

//   let currentWeek: WorkingSchedule[] = [];

//   sortedSchedule.forEach((day) => {

//     currentWeek.push(day);

//     if (currentWeek.length === 7) {
//       weeks.push(currentWeek);
//       currentWeek = [];
//     }

//   });

//   if (currentWeek.length > 0) {
//     weeks.push(currentWeek);
//   }

//   return weeks;
// };



import dayjs from "dayjs";
import type { WeekDay, WorkingSchedule } from "../../Entities/WorkingSchedualeData";

export interface ScheduleDayView extends Omit<WorkingSchedule, "id"> {
  id: number | null;
  isPlaceholder: boolean;
}

const dayNames: WeekDay[] = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export const groupScheduleByDay = (
  schedule: WorkingSchedule[],
  weekDates: string[]
): ScheduleDayView[] => {

  const scheduleMap = new Map<string, WorkingSchedule>();

  schedule.forEach((item) => {
    scheduleMap.set(dayjs(item.date).format("YYYY-MM-DD"), item);
  });

  return weekDates.map((date) => {

    const existing = scheduleMap.get(date);

    if (existing) {
      return {
        ...existing,
        isPlaceholder: false,
      };
    }

    return {
      id: null,
      date,
      day: dayNames[dayjs(date).day()],
      startTime: "",
      endTime: "",
      isAvailable: false,
      isPlaceholder: true,
    };

  });

};
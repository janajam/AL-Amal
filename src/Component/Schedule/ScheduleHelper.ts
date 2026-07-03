import dayjs from "dayjs";
import type { WorkingSchedule } from "../../Entities/AccountsData";
/**
 * Groups a month's schedule into calendar weeks.
 * Each inner array contains up to 7 days.
 */
export const splitScheduleIntoWeeks = (
  schedule: WorkingSchedule[]
): WorkingSchedule[][] => {

  if (!schedule.length) return [];

  // Sort by date first
  const sortedSchedule = [...schedule].sort(
    (a, b) =>
      dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );

  const weeks: WorkingSchedule[][] = [];

  let currentWeek: WorkingSchedule[] = [];

  sortedSchedule.forEach((day) => {

    currentWeek.push(day);

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};
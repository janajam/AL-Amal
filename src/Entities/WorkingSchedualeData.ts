export interface WorkingSchedule {
    id: number;
    date: string;
    day: WeekDay;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface WorkingScheduleResponse {
  status: number;
  message: string;
  data: WorkingSchedule[];
}
export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface UpdateScheduleRequest {
    startTime?: string;
    endTime?: string;
    isAvailable?: boolean;
}

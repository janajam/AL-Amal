// export interface WorkingSchedule {
//     id: number;
//     date: string;
//     day: WeekDay;
//     startTime: string;
//     endTime: string;
//     isAvailable: boolean;
// }

// export interface WorkingScheduleResponse {
//   status: number;
//   message: string;
//   data: WorkingSchedule[];
// }
// export type WeekDay =
//   | "Monday"
//   | "Tuesday"
//   | "Wednesday"
//   | "Thursday"
//   | "Friday"
//   | "Saturday"
//   | "Sunday";

// export interface UpdateScheduleRequest {
//     startTime?: string;
//     endTime?: string;
//     isAvailable?: boolean;
// }

//for get schedule

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ScheduleStatus = "work_day" | "off_day";

export interface ScheduleDay {
  id: number;
  doctor_monthly_schedule_id: number;
  date: string;
  day_name: WeekDay;
  week_number: number;
  status: ScheduleStatus;
  start_time: string | null;
  end_time: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ScheduleWeek {
  week_number: number;
  days: ScheduleDay[];
}

export interface MonthlySchedule {
  id: number;
  doctor_id: number;
  year: number;
  month: number;
  weeks: ScheduleWeek[];
}

export interface ScheduleResponse {
  success: boolean;
  status: number;
  message: string;
  data: MonthlySchedule;
  errors: null;
}

//for create schedule 

export interface CreateScheduleRequest {
  year: number;
  month: number;
}

// export interface CreateScheduleResponse {
//   success: boolean;
//   status: number;
//   message: string;
//   data: {
//     id: number;
//     doctor_id: number;
//     year: number;
//     month: number;
//     created_at: string;
//     updated_at: string;
//     days: ScheduleDay[];
//   };
//   errors: null;
// }
export interface CreatedScheduleDay {
  id: number;
  doctor_monthly_schedule_id: number;
  date: string;
  day_name: WeekDay;
  week_number: number;
  status: ScheduleStatus;
  start_time: string | null;
  end_time: string | null;
  created_at: string;
  updated_at: string;
}


export interface CreatedMonthlySchedule {
  id: number;
  doctor_id: number;
  year: number;
  month: number;
  created_at: string;
  updated_at: string;
  days: CreatedScheduleDay[];
}

export interface CreateScheduleResponse {
  success: boolean;
  status: number;
  message: string;
  data: CreatedMonthlySchedule;
  errors: null;
}


//for update schedule

export interface UpdateScheduleRequest {
  status: ScheduleStatus;
  start_time: string | null;
  end_time: string | null;
}
export interface UpdateScheduleDayResponse {
  success: boolean;
  status: number;
  message: string;
  data: ScheduleDay;
  errors: null;
}
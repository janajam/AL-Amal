
export type AccountRole = "Doctor" | "Secretary";
export type AccountStatus="ACTIVE" | "REVOKED";
  
export interface Account {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  birthDay: Date;
  image: string;
  role: AccountRole;
  status: AccountStatus;
  createdAt: Date;
  address:string;
  department: Department;
  workingDays: WorkingSchedule[]
  
}

export interface Doctor extends Account {
  role: "Doctor";
  specialty: Specialty;
  licenses: License[];
}

export interface Secretary extends Account {
  role: "Secretary";
}

export interface Department {
  id: number;
  name: string;
}

export interface Specialty {
  id: number;
  name: string;
}

export interface License {
    id: number;
    name: string;
    fileUrl: string;
    uploadedAt: string;
}
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
export interface AccountResponse {
    status: number;
    message: string;
    data: Doctor | Secretary;
}
export interface AccountsResponse {
    status: number;
    message: string;
    data: (Doctor | Secretary)[];
}

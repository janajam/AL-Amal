import type { WorkingSchedule } from "./WorkingSchedualeData";

export type AccountRole = "Doctor" | "Secretary";
export type AccountStatus = "ACTIVE" | "REVOKED";

export interface Account {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  birthDay: string;
  image: string;
  role: AccountRole;
  status: AccountStatus;
  createdAt: string;
  address: string;
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
  id: number,
  name: string
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

export interface CreateAccountsResponse {
  status: number;
  message: string;
}
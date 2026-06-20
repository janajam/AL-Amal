
export type AccountRole = "Doctor" | "Secretary";

export interface Account {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  birthDay: Date;
  image: string;
  role: AccountRole;
  status: "ACTIVE" | "REVOKED";
  createdAt: Date;
}

export interface Doctor extends Account {
  role: "Doctor";
  specialty: Specialty;
  department: Department;
  licenses: string[];
  workingDays: string[];
}

export interface Secretary extends Account {
  role: "Secretary";
  department: Department;
}

export interface Department {
  id: number;
  name: string;
  specialty?: Specialty;
}

export interface Specialty {
  id: number;
  name: string;
}

export interface DoctorAccountResponse {
    status: number;
    message: string;
    data: Doctor[];

}


export interface SecretaryAccountResponse {
    status: number;
    message: string;
    data: Secretary[];

}

export interface AccountsResponse {
  status: number;
  message: string;
  data: (Doctor | Secretary)[];
}
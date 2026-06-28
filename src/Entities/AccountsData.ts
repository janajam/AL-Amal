
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
  
}

export interface Doctor extends Account {
  role: "Doctor";
  specialty: Specialty;
  licenses: License[];
  workingDays: string[];
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

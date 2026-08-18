// import type { Department } from "./DepartmentData";

// export type AccountRole = "Doctor" | "Secretary";
// export type AccountStatus = "ACTIVE" | "REVOKED";

// export interface Account {
//   id: number;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   role: AccountRole;
//   status: AccountStatus;

//   image?: string;
//   birthDay?: string;
//   address?: string;
//   createdAt?: string;

//   department?: Department;
// }


// export interface Doctor extends Account {
//   role: "Doctor";
//   specialty: Specialty;
//   licenses: License[];
// }

// export interface Secretary extends Account {
//   role: "Secretary";
// }

// // export interface Department {
// //   id: number;
// //   name: string;
// //   description: string;
// // }

// export interface Specialty {
//   id: number;
//   name: string;
// }

// export interface License {
//   id: number;
//   name: string;
//   fileUrl: string;
//   uploadedAt: string;
// }
// export interface AccountResponse {
//   status: number;
//   message: string;
//   data: Doctor | Secretary;
// }
// export interface AccountsResponse {
//   status: number;
//   message: string;
//   data: (Doctor | Secretary)[];
// }

// export interface CreateAccountsResponse {
//   status: number;
//   message: string;
// }


import type { Department } from "./DepartmentData";
import type { DoctorData } from "./DoctorData";

export type AccountRole = "Doctor" | "Secretary";

export type AccountStatus = "ACTIVE" | "REVOKED";

export interface Account {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  role: AccountRole;
  status: AccountStatus;

  image?: string;
  birthDay?: string;
  address?: string;
  createdAt?: string;

  department?: Department;
}

// export interface Doctor extends Account {
//   role: "Doctor";
//   specialty:string;
//   licenses: License[];
//   biography:string
// }

export interface Doctor {
  id: number;
  
  status: AccountStatus;

  full_name: string;
  image: string | null;
  role: "Doctor";
  email: string;
  phone: string;
  birth_date: string;
  address: string;
  department: string;
  specialization: string;
  license: string[] | null;
  biography:string
}


export interface DoctorResponse {
  success: boolean;
  status: number;
  message: string;
  data: Doctor;
  errors: unknown;
}
export interface Secretary extends Account {
  role: "Secretary";
}



export interface License {
  id: number;
  name: string;
  fileUrl: string;
  uploadedAt: string;
}

// export interface AccountResponse {
//   status: number;
//   message: string;
//   data: Doctor | Secretary;
// }

export interface AccountsResponse {
  status: number;
  message: string;
  data: (Doctor | Secretary)[];
}

export interface CreateAccountsResponse {
  status: number;
  message: string;
}



export interface SecretaryUser {
  id: number;
  full_name: string;
  email: string;
  phone: string;
}

export interface SecretaryData {
  id: number;
  user: SecretaryUser;
  department: Department;
}

export interface DoctorAccountResponse {
  success: boolean;
  status: number;
  message: string;
  data: DoctorData;
  errors: any;
}

export interface SecretaryAccountResponse {
  success: boolean;
  status: number;
  message: string;
  data: SecretaryData;
  errors: any;
}

export type AccountResponse = DoctorAccountResponse | SecretaryAccountResponse;
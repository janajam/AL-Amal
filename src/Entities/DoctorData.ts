// export interface DoctorsResponse {
//   success: boolean
//   status: number
//   message: string
//   data: DoctorData[]
//   errors: any
// }


// export interface DoctorListItem {
//   id: number;
//   full_name: string;
//   image: string | null;
//   // is_active: boolean;
//   role: "Doctor";
//   phone: string;
//   email: string;
// }


export interface DoctorListItem {
  id: number;
  name: string; 
  image: string | null;
  is_active: boolean; 
  role: "Doctor";
  phone: string;
  email: string;
  license: string | null;
}
export interface DoctorsResponse {
  success: boolean;
  status: number;
  message: string;
  data: DoctorListItem[];
  errors: any;
}
export interface DoctorResponse {
  success: boolean;
  status: number;
  message: string;
  data: DoctorData;
  errors: any;
}
export interface DoctorData {
  id: number;
  name: string;
  image: string | null;
  role: "Doctor";
  email: string;
  phone: string;
  birth_date: string;
  address: string;
  department: string;
  specialization: string;
  license: string[] | null;
}


// export interface DoctorData {
//   id: number;
//   user: {
//     id: number;
//     full_name: string;
//     email: string;
//     phone: string;
//   };

//   department: {
//     id: number;
//     name: string;
//     description: string;
//   };

//   specialization: string;
//   biography: string;

//   schedule: Schedule[];
// }
export interface User {
  id: number
  full_name: string
  email: string
  phone: string
  image:string | null
}

export interface Department {
  id: number
  name: string
  description: string
}

export interface Schedule {
  id: number
  doctor_id: number
  year: string
  month: number
  created_at: string
  updated_at: string
}


export interface CreateDoctorResponse {
    success: boolean;
    status: number;
    message: string;
    data: DoctorData;  
    errors: any;
}

export interface CreateAccountPayload {
    full_name: string;
    email: string;
    // password: string;
    phone: string;
    gender: string;
    birth_date: string;
    address: string;
    department_id: number;
    specialization?: string;
    biography?: string;
}

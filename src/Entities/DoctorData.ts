export interface DoctorsResponse {
  success: boolean
  status: number
  message: string
  data: DoctorData[]
  errors: any
}

export interface DoctorResponse {
  success: boolean;
  status: number;
  message: string;
  data: DoctorData;
  errors: any;
}
export interface DoctorData {
  id: number
  user: User
  department: Department
  specialization: string
  biography: string
  schedule: Schedule[]
}

export interface User {
  id: number
  full_name: string
  email: string
  phone: string
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

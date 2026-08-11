export interface DoctorsResponse {
  success: boolean
  status: number
  message: string
  data: DoctorData[]
  errors: any
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

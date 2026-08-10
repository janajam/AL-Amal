export interface Department {
  id: number;
  name: string;
  description: string;
  services: DepartmentService[];
}

export interface DepartmentService {
  id: number;
  name: string;
  description: string;
  price: string;
}

export interface DepartmentsResponse {
  success: boolean;
  status: number;
  message: string;
  data: Department[];
  errors: null;
}
export interface SecretariesResponse {
  success: boolean;
  status: number;
  message: string;
  data: SecretaryData[];
  errors: any;
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
  department: {
    id: number;
    name: string;
    description: string;
  };
}
export interface SecretaryListItem {
  id: number;
  name: string;
  image: string | null;
  role: "Secretary";
  is_active: boolean;
  email: string;
  phone: string;
  birth_date: string;
  address: string;
  department: {
    id: number;
    name: string;
  };
}

export interface SecretariesResponse {
  success: boolean;
  status: number;
  message: string;
  data: SecretaryListItem[];
  errors: any;
}
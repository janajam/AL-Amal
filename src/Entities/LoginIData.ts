export interface LoginPayload {
  email: string;
  password: string;
}
  // export interface LoginResponse {
  //   success: boolean;
  //   message: string;
  //   access_token: string;
  //   token_type: "Bearer";
  //   user: User;
  // }
export interface LoginResponse {
  success: boolean;
  status: number;
  message: string;
  data: LoginData;
  errors: Record<string, string[]> | null;
}

export interface LoginData {
  access_token: string;
  token_type: "Bearer";
  user: User;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  image: string | null;
  role: string;
}
// export interface User {
//   id: number;
//   full_name: string;
//   email: string;
//   phone: string;
//    gender: string;
  // image: string | null;
  // role: string;
// }
// export interface LoginResponse {
//   status: number
//   data: LoginData
// }

// export interface LoginData {
//   token: string
//   user: User
// }

// export interface User {
//   _id: string
//   fullName: string
//   email: string
//   photo: string
//   role: string
//   __v: number
// }

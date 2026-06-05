export interface LoginPayload {
  userName: string;
  password: string;
}

export interface LoginResponse {
  status: number
  data: LoginData
}

export interface LoginData {
  token: string
  user: User
}

export interface User {
  _id: string
  fullName: string
  email: string
  photo: string
  role: string
  __v: number
}

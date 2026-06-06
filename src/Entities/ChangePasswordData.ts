

export interface ChangePasswordResponse {
  status: number
  data: passwordData
}

export interface passwordData {
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
  passwordChangedAt: string
}

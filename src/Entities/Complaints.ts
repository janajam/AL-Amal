
export  interface Complaints{
    name:string,
    email:string,
    subject:string,
    status:string,
    descreption:string
} 

export interface ComplaintsResponse  {
  status: number
  message: string
}

export interface SendComplaintsResponse{
    email:string,
    response:string
}
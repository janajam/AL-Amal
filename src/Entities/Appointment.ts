


export interface Appointment{
    id:number,
    date:Date,
    time:string,
    status:string
}


export interface AppointmentListItem{
id:number,
patientName:string,
doctorName:string,
appointment:Appointment,
patientId:number,
doctorId:number
}


export interface AppointmentResponse{
    data:AppointmentListItem,
    message:string,
    status:number
}
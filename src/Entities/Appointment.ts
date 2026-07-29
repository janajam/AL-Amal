

export interface Appointment {
    id:number;
    patientName:string;
    doctorId:number;
    date:string;
    startTime:string;
    endTime:string;
    status:
        |"Available"
        |"Booked"
        |"Finished"
        |"Cancelled";
    type:string;
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
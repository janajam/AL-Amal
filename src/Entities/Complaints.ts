export interface Complaint {
    clientName: string;
    email: string;
    subject: string;
    status: string;
    description: string;
}

export interface ComplaintsResponse {
    status: number;
    message: string;
    data: Complaint[];
}
export interface SendComplaintsResponse{
    email:string,
    response:string
}
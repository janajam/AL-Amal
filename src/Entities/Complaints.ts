export interface Complaint {
    id:number
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
export interface SendComplaintsResponse {
    email: string,
    response: string
}

export interface ResponseComplaintsRespons {
    status: number;
    message: string;

}
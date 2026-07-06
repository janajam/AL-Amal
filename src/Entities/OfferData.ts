
type Status='Expired'|'Ongoing'

export interface OfferData {
    id: number,
    title: string,
    description: string,
    startTime: string,
    endTime: string,
    status:Status

}

export interface OfferResponse{
    status: number,
    message:string,
    data:OfferData[]
}

export interface UpdateOffer {
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;   
    status?:string
}

export interface CreateOfferResponse {
  status: number;
  message: string;
}
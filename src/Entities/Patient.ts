

export interface Patient {
    id: number,
    name: string,
    age: number,
    gander: string,
    address: string,
    email: string,
    medicalRecord: MedicalRecord|null ,
    phoneNumber: string
}

export interface MedicalRecord {
    id: number,
    sickness?: string[],
    allergies?: string[],
    longTermMedication?: string[],
    operations?: string[],
    treatmentPlan?: TreatmentPlan[]|null,
    testResult?: TestResult[]|null,
    xRayImage?: XRayImage[]|null
}



type Status='Finished'|'Ongoing'

export interface TreatmentPlan {
    id: number,
    medicalDiagnosis: string,
    doctorName: string,
    treatmentSteps: string[],
    date: Date
    status:Status,
    updatedDate?:Date
}

export interface TestResult {
    id: number;
    uploaded_at: Date;
    requestedBy: string;
    result: string;
    uploaded_by: string;
    title: string;
    attachment: string;
}

export interface XRayImage {
    id: number,
    uploaded_at: Date;
    requestedBy: string;
    uploaded_by: string;
    description: string
    type: string,
    image: string,
}

export interface PatientListItem {
    id: number;
    medical_number: string;
    full_name: string;
    phone: string;
    gender: string;
    birth_day: string | null;
    status: string | null;
}
export interface PatientsResponse {
    success: boolean;
    status: number;
    message: string;
    data: PatientListItem[];
    errors: any;
}

export interface UserInfo {
  id: number
  full_name: string
  email: string
  phone: string
  gander:string
  address:string,
  birthDay:string
}

export interface UpdateMedicalRrecord{
    id: number,
    sickness?: string[],
    allergies?: string[],
    longTermMedication?: string[],
    operations?: string[],
    }
export interface UpdateContactInfoResponse{
    status:number,
    message:string,
    data:UserInfo
}

export interface UpdateRecordResponse{
    status:number,
    message:string,
    data:UpdateMedicalRrecord
}

export interface UpdatePlanResponse{
    status:number,
    message:string
    data:TreatmentPlan
}
export interface UpdateTestResponse{
    status:number,
    message:string,
    data:TestResult
}

export interface UpdateImageResponse{
    status:number,
    message:string,
    data:XRayImage
}
    

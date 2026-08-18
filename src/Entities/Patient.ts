

export interface PatientUser {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    gender: string;
    birth_day: string | null;
    address: string;
}
export interface Patient {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  image: string | null;
  role: string;
}

export interface SearchPatientResponse {
  success: boolean;
  status: number;
  message: string;
  data: Patient | null;
  errors: unknown;
}
export interface PatientDetail {
    id: number;
    medical_number: string;
    user: PatientUser;
    medical_record: MedicalRecord | null;
}

export interface PatientDetailResponse {
    success: boolean;
    status: number;
    message: string;
    data: PatientDetail;
    errors: any;
}

export interface MedicalRecord {
status:string|null
    id: number,
    sickness?: string[],
    allergies?: string[],
    long_term_medication?: string[],
    operations?: string[],
    treatment_plans?: TreatmentPlanPayload[]|null,
    lab_results?: LabResult[] | null;
    radiology_results?: XRayImage[]|null

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


export interface LabResult {
  id: number;
  medical_record_id?: number | string;
  doctor_name: string;
  title: string;
  result: string;
  attachment: string|null
  created_at: string;
  updated_at?: string;
}

export interface CreateLabResultInput {
  medical_diagnosis: string;
  medical_record_id: number;
  title: string;
  result: string;
  attachment?: File;
}

export interface UpdateLabResultResponse {
  success: boolean;
  status: number;
  message: string;
  data: LabResult;
  errors: any;
}
export interface CreateLabResultResponse {
  success: boolean;
  status: number;
  message: string;
  data: LabResult;
  errors: any;
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


// export interface SearchPatientResponse {
//     success: boolean;
//     status: number;
//     message: string;
//     data: PatientListItem;
//     errors: any;
// }
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
    status: string | null;
    sickness?: string[],
    allergies?: string[],
    long_term_medication?: string[],
    operations?: string[],
    }
export interface UpdateContactInfoResponse{
    status:number,
    message:string,
    data:UserInfo
}

export interface UpdateRecordResponse {
    success: boolean;
    status: number;
    message: string;
    data: UpdateMedicalRrecord;
    errors: any;
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
    


export interface ContactDataResponse {
  success: boolean
  status: number
  message: string
  data: ContactData
  errors: any
}

export interface ContactData {
  id: number
  user_id: number
  medical_number: string
  created_at: string
  updated_at: string
  user: User
}

export interface User {
  id: number
  full_name: string
  email: string
  email_verified_at: any
  phone: string
  gender: string
  image: any
  birth_date: string
  address: string
  role_id: number
  is_active: boolean
  created_at: string
  updated_at: string
}



export interface TreatmentPlanStep {
    step_number: number;
    instruction: string;
}

export interface TreatmentPlanDoctor {
    id: number;
    name: string;
}

export interface TreatmentPlanPayload {
    id: number;
    medical_diagnosis: string
    status: 'ongoing' | 'finished';
    created_at: string;
    doctor: TreatmentPlanDoctor;
    steps: TreatmentPlanStep[];
}

export interface UpdateTreatmentPlanResponse {
    success: boolean;
    status: number;
    message: string;
    data: TreatmentPlanPayload;
    errors: any;
}
export interface CreateTreatmentPlanResponse {
    success: boolean;
    status: number;
    message: string;
    data: TreatmentPlan;
    errors: any;
}


export interface CreatePatientUser {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    gender: string;
    birth_date: string;
    address: string;
}

export interface CreatePatientMedicalRecord {
    id: number;
    status: string | null;
    sickness: string;
    allergies: string;
    long_term_medication: string;
    operations: string;
}

export interface CreatePatientData {
    id: number;
    medical_number: string;
    user: CreatePatientUser;
    medical_record: CreatePatientMedicalRecord;
}

export interface CreatePatientResponse {
    success: boolean;
    status: number;
    message: string;
    data: CreatePatientData;
    errors: any;
}
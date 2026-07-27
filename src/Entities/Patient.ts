

export interface Patient {
    id: number,
    name: string,
    age: number,
    gander: string,
    address: string,
    email: string,
    medicalRecord: MedicalRecord,
    phoneNumber: string
}

export interface MedicalRecord {
    id: number,
    sickness?: string[],
    allergies?: string[],
    longTermMedication?: string[],
    operations?: string[],
    treatmentPlan?: TreatmentPlan[],
    testResult?: TestResult[],
    xRayImage?: XRayImage[]
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
    date: Date;
    doctorName: string;
    labWorkingName: string;
    reportName: string;
    reportUrl: string;
}

export interface XRayImage {
    id: number,
    doctorName: string,
    description: string
    type: string,
    image: string,
    date: Date
}

export interface PatientsResponse {
    status: number
    message: string
    data: Patient
}

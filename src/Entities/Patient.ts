import { int } from "zod"

export interface Patient {
    id: number,
    name: string,
    birthDay: Date,
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
    treatmentPlan: TreatmentPlan[],
    testResualt?: TestResualt[],
    xRayImage: XRayImage[]
}


export interface TreatmentPlan {

}

export interface TestResualt {

}


export interface XRayImage {

}


export interface TestResualt {

}

export interface PatientsResponse{
    status:number
    message:string
    data:Patient
}
    
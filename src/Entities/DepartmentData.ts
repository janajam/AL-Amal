import type { Specialty } from "./AccountsData";

export interface DepartmentData {
    id: number,
    name: string,
    descripttion: string,
    specialty: Specialty[],
    doctorsNumber: number,
    secretariesNumber: number,

}

export interface DepartmentResponse{
    status: number,
    message:string,
    data:DepartmentData[]
}
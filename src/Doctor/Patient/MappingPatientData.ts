import type { Patient, PatientListItem } from "../../Entities/Patient";

export const mapSearchPatientToListItem = (
  patient: Patient
): PatientListItem => {
  return {
    id: patient.id,
    medical_number: "",
    full_name: patient.full_name,
    phone: patient.phone,
    gender: patient.gender,
    birth_day: null,
    status: null,
  };
};
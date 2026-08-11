import type { Doctor } from "../../Entities/AccountsData";
import type { DoctorData } from "../../Entities/DoctorData";

export const mapDoctorToAccount = (doctor: DoctorData): Doctor => ({
  id: doctor.id,
  name: doctor.user.full_name,
  email: doctor.user.email,
  phoneNumber: doctor.user.phone,
  role: "Doctor",
  status: "ACTIVE",

  department: {
    id: doctor.department.id,
    name: doctor.department.name,
    description: doctor.department.description,
    services:[]
  },

  specialty: doctor.specialization,
  biography: doctor.biography,

  birthDay:'',
  image: "",
  createdAt: '',
  address: "",
  licenses: [],
});
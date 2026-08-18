// // import type { Doctor } from "../../Entities/AccountsData";
// // import type { DoctorData } from "../../Entities/DoctorData";

// // export const mapDoctorToAccount = (doctor: DoctorData): Doctor => ({
// //   id: doctor.id,
// //   full_name: doctor.user.full_name,
// //   email: doctor.user.email,
// //   phone: doctor.user.phone,
// //   role: "Doctor",
// //   status: "ACTIVE",

// //   department: {
// //     id: doctor.department.id,
// //     name: doctor.department.name,
// //     description: doctor.department.description,
// //     services:[]
// //   },

// //   specialty: doctor.specialization,
// //   biography: doctor.biography,

// //   birthDay:'',
// //   image: "",
// //   createdAt: '',
// //   address: "",
// //   licenses: [],
// // });



// import type { Doctor } from "../../Entities/AccountsData";
// import type { DoctorListItem } from "../../Entities/DoctorData";

// export const mapDoctorToAccount = (
//   doctor: DoctorListItem
// ): Doctor => {
//   return {
//     id: doctor.id,

//     full_name: doctor.name,

//     email: doctor.email,

//     phone: doctor.phone,

//     role: "Doctor",

//     status: doctor.is_active
//       ? "ACTIVE"
//       : "REVOKED",

//     image: doctor.image ?? "",

//     birthDay: "",

//     address: "",

//     createdAt: "",

//     department: undefined,

//     specialty: "",

//     biography: "",

//     licenses: [],
//   };
// };
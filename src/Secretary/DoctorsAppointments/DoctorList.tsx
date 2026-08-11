
// import logo from '../../assets/logo.webp'
// import type { Account } from '../../Entities/AccountsData'
// import { dummySchedule } from '../../Component/Schedule/ScheduleDummy'
// import { useNavigate } from 'react-router-dom';
// import AccountCard from '../../Admin/Accounts/AccountCard';
// import type { Department } from '../../Entities/DepartmentData';
// import { useGetDoctors } from '../../Hook/UseGetDoctors';
// import type { Doctor, DoctorsResponse } from '../../Entities/DoctorData';

// //for test

// // const department: Department = {
// //   id: 1,
// //   name: "Cardiology",
// //   description:'Cardiology department',
// //   services: [],
// // };

// // const doctors: Account[] = [
// //   {
// //     id: 1,
// //     name: "A",

// //     email: "A1@email.com",

// //     phoneNumber: "123456789",

// //     birthDay:"1990-01-01",

// //     image: logo,

// //     role: "Doctor",

// //     status: "ACTIVE",

// //     createdAt: "2022-02-10",

// //     address: "Address",

// //     department,

// //     // workingDays: dummySchedule,
// //   },

// //   {
// //     id: 2,

// //     name: "B",

// //     email: "B@email.com",

// //     phoneNumber: "987654321",

// //     birthDay: "1995-06-10",

// //     image: logo,

// //     role: "Doctor",

// //     status: "ACTIVE",

// //     createdAt: '12-6-2022'
// //       ,

// //     address: "Address",

// //     department,

// //     // workingDays: dummySchedule,
// //   },

// //   {
// //     id: 3,

// //     name: "C",

// //     email: "C@email.com",

// //     phoneNumber: "55555555",

// //     birthDay: "1992-04-20",

// //     image: logo,

// //     role: "Doctor",

// //     status: "ACTIVE",

// //     createdAt: '12-5-2021',

// //     address: "Address",

// //     department,

// //     // workingDays: dummySchedule,
// //   },
// // ];

// const DoctorsList = () => {
//   const navigate = useNavigate();

//   const {
//     data,
//     isLoading,
//     isError,
//   } = useGetDoctors();

//   if (isLoading) {
//     return <div>Loading doctors...</div>;
//   }

//   if (isError) {
//     return <div>Failed to load doctors.</div>;
//   }

//   const doctors: Doctor[] =
//     data?.data?.map((doctor) => ({
//       id: doctor.id,

//       name: doctor.user.full_name,

//       email: doctor.user.email,

//       phoneNumber: doctor.user.phone,

//       birthDay: "",

//       image: "",

//       role: "Doctor",

//       status: "ACTIVE",

//       createdAt: "",
//       address: "",

//       department: {
//         id: doctor.department.id,
//         name: doctor.department.name,
//         description: doctor.department.description,
//         services: [],
//       },
//     })) ?? [];


//   return (
//     <>
//       {doctors.map((doctor) => (

//         <AccountCard
//           key={doctor.id}
//           account={doctor}
//           onClick={() => navigate(`/accounts/${doctor.id}`)}
//         />
//       ))}
//     </>
//   )

// }
// export default DoctorsList



import { useNavigate } from "react-router-dom";
import AccountCard from "../../Admin/Accounts/AccountCard";
import type { Doctor } from "../../Entities/AccountsData";
import { useGetDoctors } from "../../Hook/UseGetDoctors";
import { mapDoctorToAccount } from "./MappingDoctorData";

const DoctorsList = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  } = useGetDoctors();

  console.log(data)
  if (isLoading) {
    return <div>Loading doctors...</div>;
  }

  if (isError) {
    return <div>Failed to load doctors.</div>;
  }

  // const doctors: Account[] =
  //   data?.data?.map((doctor) => ({
  //     id: doctor.id,
  //     doctorUser: {
  //       name: doctor.user.full_name,

  //       email: doctor.user.email,

  //       phoneNumber: doctor.user.phone,

  //       birthDay: "",

  //       image: "",

  //       role: "Doctor",

  //       status: "ACTIVE",

  //       createdAt: "",

  //       address: "",
  //     },
  //     department: {
  //       id: doctor.department.id,
  //       name: doctor.department.name,
  //       description: doctor.department.description,
  //       services: [],
  //     },
  //   })) ?? [];
const doctors: Doctor[] =
  data?.data?.map(mapDoctorToAccount) ?? [];
  return (
    <>
      {doctors.map((doctor) => (
      
        <AccountCard
          key={doctor.id}
          account={doctor}
          onClick={() => navigate(`/accounts/${doctor.id}`)}
        />
      ))}
    </>
  );
};

export default DoctorsList;
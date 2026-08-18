// import AccountCard from './AccountCard'
// import logo from '../../assets/logo.webp'
// import type { Account, Department } from '../../Entities/AccountsData'
// import { dummySchedule } from '../../Component/Schedule/ScheduleDummy'
// import { useNavigate } from 'react-router-dom';

// //for test

// const department: Department = {
//   id: 1,
//   name: "Cardiology",
// };

// const accounts: Account[] = [
//   {
//     id: 1,
//     name: "A",

//     email: "A1@email.com",

//     phoneNumber: "123456789",

//     birthDay: "1990-01-01",

//     image: logo,

//     role: "Doctor",

//     status: "ACTIVE",

//     createdAt: "2022-02-10",

//     address: "Address",

//     department,

//     workingDays: dummySchedule,
//   },

//   {
//     id: 2,

//     name: "B",

//     email: "B@email.com",

//     phoneNumber: "987654321",

//     birthDay: "1995-06-10",

//     image: logo,

//     role: "Doctor",

//     status: "ACTIVE",

//     createdAt:'2-5-2022',

//     address: "Address",

//     department,

//     workingDays: dummySchedule,
//   },

//   {
//     id: 3,

//     name: "C",

//     email: "C@email.com",

//     phoneNumber: "55555555",

//     birthDay: "1992-04-20",

//     image: logo,

//     role: "Secretary",

//     status: "ACTIVE",

//     createdAt:'12-6-2019',

//     address: "Address",

//     department,

//     workingDays: dummySchedule,
//   },
// ];
// const Accounts = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       {accounts.map((account) => (
//         <AccountCard
//           key={account.id}
//           account={account}
//           onClick={() => navigate(`/accounts/${account?.id}`)}
//         />
//       ))}
//     </>
//   )

// }
// export default Accounts

import { useNavigate } from "react-router-dom";
import DoctorsList from "../../Secretary/DoctorsAppointments/DoctorList";
import SecretariesList from "../Department/SecretariesList";
const Accounts = () => {
  
  const navigate = useNavigate();

  return (
    <>


      <DoctorsList/>
      <SecretariesList/>
    </>
  );
};

export default Accounts;
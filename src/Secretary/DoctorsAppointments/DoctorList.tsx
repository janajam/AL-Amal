
import logo from '../../assets/logo.webp'
import type { Account, Department } from '../../Entities/AccountsData'
import { dummySchedule } from '../../Component/Schedule/ScheduleDummy'
import { useNavigate } from 'react-router-dom';
import AccountCard from '../../Admin/Accounts/AccountCard';

//for test

const department: Department = {
  id: 1,
  name: "Cardiology",
};

const doctors: Account[] = [
  {
    id: 1,
    name: "A",

    email: "A1@email.com",

    phoneNumber: "123456789",

    birthDay: new Date("1990-01-01"),

    image: logo,

    role: "Doctor",

    status: "ACTIVE",

    createdAt: new Date("2022-02-10"),

    address: "Address",

    department,

    workingDays: dummySchedule,
  },

  {
    id: 2,

    name: "B",

    email: "B@email.com",

    phoneNumber: "987654321",

    birthDay: new Date("1995-06-10"),

    image: logo,

    role: "Doctor",

    status: "ACTIVE",

    createdAt: new Date(),

    address: "Address",

    department,

    workingDays: dummySchedule,
  },

  {
    id: 3,

    name: "C",

    email: "C@email.com",

    phoneNumber: "55555555",

    birthDay: new Date("1992-04-20"),

    image: logo,

    role: "Doctor",

    status: "ACTIVE",

    createdAt: new Date(),

    address: "Address",

    department,

    workingDays: dummySchedule,
  },
];
const DoctorsList = () => {
  const navigate = useNavigate();
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
  )

}
export default DoctorsList

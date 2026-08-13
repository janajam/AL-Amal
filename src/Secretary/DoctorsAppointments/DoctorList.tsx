
import { useNavigate } from "react-router-dom";
import AccountCard from "../../Admin/Accounts/AccountCard";
import { useGetDoctors } from "../../Hook/UseGetDoctors";
import { mapDoctorToAccount } from "./MappingDoctorData";
import type { Doctor } from "../../Entities/AccountsData";

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
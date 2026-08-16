
import { useNavigate } from "react-router-dom";
import AccountCard from "../../Admin/Accounts/AccountCard";
import { useGetDoctors } from "../../Hook/UseGetDoctors";
import { mapDoctorToAccount } from "./MappingDoctorData";
import type { Doctor } from "../../Entities/AccountsData";
import CardSkeleton from "../../Component/CardSkelaton";
import { Typography, useTheme } from "@mui/material";
import PulseDivider from "../../Component/Schedule/PluseDivider";

const DoctorsList = () => {
  const navigate = useNavigate();
const theme=useTheme()
  const {
    data,
    isLoading,
    isError,
  } = useGetDoctors();

  console.log(data)
  if (isLoading) {
    return <CardSkeleton/>;
  }

  if (isError) {
    return (

      <>
      <Typography
      sx={{
        fontWeight:550,
        color:theme.palette.etal.main
      }}
      >
        Faild To Load Somthing wrong 
      </Typography>
      <PulseDivider/>
      </>
    )}

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
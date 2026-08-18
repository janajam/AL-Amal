import { useNavigate } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

import { useGetDoctors } from "../../Hook/UseGetDoctors";
import CardSkeleton from "../../Component/CardSkelaton";
import PulseDivider from "../../Component/Schedule/PluseDivider";
import DoctorCard from "./DoctorCard";

const DoctorsList = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    data,
    isLoading,
    isError,
  } = useGetDoctors();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <>
        <Typography
          sx={{
            fontWeight: 550,
            color: theme.palette.etal.main,
          }}
        >
          Failed To Load. Something went wrong.
        </Typography>

        <PulseDivider />
      </>
    );
  }

  const doctors = data?.data ?? [];

  return (
    <>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onClick={() => navigate(`/doctors/${doctor.id}`)}
        />
      ))}
    </>
  );
};

export default DoctorsList;
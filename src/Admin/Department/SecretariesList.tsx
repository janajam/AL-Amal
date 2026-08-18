import { useNavigate } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

import { useGetSecretaries } from "../../Hook/UseGetSecretaries";
import CardSkeleton from "../../Component/CardSkelaton";
import PulseDivider from "../../Component/Schedule/PluseDivider";
import SecretaryCard from "./SecretaryCard";

const SecretariesList = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    data,
    isLoading,
    isError,
  } = useGetSecretaries();

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

  const secretaries = data?.data ?? [];

  return (
    <>
      {secretaries.map((secretary) => (
        <SecretaryCard
          key={secretary.id}
          secretary={secretary}
          onClick={() =>
            navigate(`/secretaries/${secretary.id}`)
          }
        />
      ))}
    </>
  );
};

export default SecretariesList;
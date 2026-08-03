import { Box, Typography } from "@mui/material";
import PatientSearch from "./Dashboard/PatientSearch";

export default function SecretaryDashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        mt:4,
        pt:4,
       }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 550,
          mt: 3,
          mb:4
        }}
      >
        Use the search below to retrieve a patient's account by email. <br />
        This will display their personal details and give you quick access to their full medical profile.
      </Typography>
       <PatientSearch />

    </Box>
  )
}
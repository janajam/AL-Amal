import { Box, Typography, useTheme } from "@mui/material";
import Appointment from "../../Component/AppointmentList";
import StatisticCard from './StatisticCard';


export default function AdminDashboard() {
  const theme =useTheme()

  return (
    <Box
      sx={{
        p: 2,
        mt: 2,
        bgcolor: theme.palette.background.default,
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box'
      }}>

      <StatisticCard/>
      <Typography
      sx={{ 
        fontSize:18,
        fontWeight:550,
        color:theme.palette.primary.main,
        mt:3
       }}
      >
        Today's Appointments
      </Typography>

      <Appointment />
    </Box>
  );
}
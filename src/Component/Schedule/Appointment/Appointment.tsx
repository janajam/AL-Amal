import { ArrowBack } from "@mui/icons-material";
import AppointmentScheduleSection from "./AppointmentScheduleSection";
import { Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Appointment = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { doctorId } = useParams<{ doctorId: string }>();
    const numericDoctorId = Number(doctorId);

    return (
        <><ArrowBack sx={{
            mx: 2,
            mt: 2,
            cursor: "pointer",
            color: theme.palette.primary.main,
        }}
            onClick={() => navigate(-1)}
        />
            {numericDoctorId && !isNaN(numericDoctorId) ? (
                <AppointmentScheduleSection
                    doctorId={numericDoctorId} />

             ) :
                 <Typography color="error" sx={{ m: 2 }}>
                    Doctor ID is missing or invalid.,
                </Typography>
            } 
        </>

    );

};

export default Appointment;
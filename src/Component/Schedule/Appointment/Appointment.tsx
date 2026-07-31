import { ArrowBack } from "@mui/icons-material";
import AppointmentScheduleSection from "./AppointmentScheduleSection";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    
    return (
        <><ArrowBack sx={{
            mx: 2,
            mt: 2,
            cursor: "pointer",
            color: theme.palette.primary.main,
        }}
            onClick={() => navigate(-1)}
        />
            <AppointmentScheduleSection
                doctorId={1} /></>

    );

};

export default Appointment;
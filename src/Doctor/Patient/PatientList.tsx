import { Box, Typography, useTheme } from "@mui/material";
import { useGetPatients } from "../../Hook/UseGetPatients";
import PatientCard from "./PatientCard";
import { useState } from "react";
import PulseDivider from "../../Component/Schedule/PluseDivider";
import CardSkeleton from "../../Component/CardSkelaton";


const PatientList = () => {
const theme=useTheme()
    const [search, setSearch] = useState('');
    const { data, isLoading, isError } = useGetPatients({ search });
    const patients = data?.data ?? [];

if(isLoading){

    return(<CardSkeleton/>
    )
}

if(isError){
    return(
        <Box>
            <Typography
            sx={{ 
                fontWeight:550,
                color:theme.palette.etal.main
             }}
            >
                somethings wrong faild load patients
            </Typography>
            <PulseDivider/>
        </Box>
    )
}

    return (

        <Box>

            {patients.map((patient) => (
                <PatientCard
                    key={patient.id}
                    patient={patient}
                />

            ))}

        </Box>

    );

};

export default PatientList
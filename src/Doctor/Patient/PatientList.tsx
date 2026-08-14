import { Box, Typography } from "@mui/material";
import { useGetPatients } from "../../Hook/UseGetPatients";
import PatientCard from "./PatientCard";
import { useState } from "react";
import PulseDivider from "../../Component/Schedule/PluseDivider";


const PatientList = () => {

    const [search, setSearch] = useState('');
    const { data, isLoading, isError } = useGetPatients({ search });
    const patients = data?.data ?? [];

if(isLoading){
    return(
        <Box>
            <Typography>
            patients fetching ...
            </Typography>
        </Box>
    )
}

if(isError){
    return(
        <Box>
            <Typography>
                somethings wrong
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
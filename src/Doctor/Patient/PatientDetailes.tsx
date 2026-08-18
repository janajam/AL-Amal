
import {
    AddRounded,
    ArrowBack,
    FemaleOutlined,
    MaleOutlined,
    MedicalInformationOutlined
} from '@mui/icons-material';
import { Box, Button, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPatient } from '../../Hook/UseGetPatient';
import { useAuthStore } from '../../Store/AuthStore';
import ContactInfo from './ContactInfo/ContactInfo';
import CreateMedicalRecordDialog from './MedicalRecord/CreateMedicalRecordDialog';
import MedicalRecordSection from './MedicalRecord/MedicalRecordSection';
import TestResultSection from './TestResult/TestSection';
import TreatmentPlanSection from './TreatmentPlan/TreatmentPlan';
import XRayImageSection from './XRayImage/XRayImageSection';
import AccountDetailsSkeleton from '../../Admin/Accounts/DetailsSkeleton';



const PatientDetailes = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    const { id } = useParams();

    const { data, isLoading, isError } = useGetPatient(Number(id));
    console.log(data)
    const patient = data?.data;
    console.log(data);

    const userRole = useAuthStore((state) => state.role);

    if (isLoading) {
        return (
            <AccountDetailsSkeleton/>
        );
    }

    if (isError || !patient) {
        return (
            <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
                patient's detailes dosent loaded
            </Typography>
        );
    }
    const medicalRecord = patient.medical_record;
    const [open, setOpen] = useState(false)

    const handleCreate = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ArrowBack
                sx={{
                    mx: 2,
                    mt: 2,
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                }}
                onClick={() => navigate(-1)}
            />

            <div key={patient.id}>

                <Box
                    sx={{
                        width: "88%",
                        bgcolor: theme.palette.background.default,
                        justifySelf: "center",
                        borderRadius: 1,
                        p: 4,
                        mb: 4,
                        boxShadow: "0 2px 17px #9ed1d5",
                    }}
                >
                    {/* head start */}
                    <Stack
                        spacing={2}
                        sx={{
                            justifySelf: 'center'
                        }}>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: 22,
                                fontWeight: 600,
                                color: theme.palette.primary.main
                            }}
                        >
                            {patient.user.full_name}
                        </Typography>

                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <MedicalInformationOutlined sx={{
                                    color: theme.palette.etal.main
                                }} />
                                <Typography sx={{
                                    fontWeight: 550
                                }}>{patient.medical_number} </Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                {patient.user.gender === 'Male'
                                    ? <MaleOutlined
                                        sx={{
                                            color: theme.palette.etal.main
                                        }} />
                                    : <FemaleOutlined
                                        sx={{
                                            color: theme.palette.etal.main
                                        }} />}
                                <Typography>{patient.user.gender}</Typography>
                            </Stack>
                        </Stack>

                    </Stack>
                    {/* head end */}

                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        sx={{
                            justifyContent: 'space-between',
                            my: 3,
                            px: 3,
                            [theme.breakpoints.down('md')]: {
                                justifyContent: 'center',
                                px: 0,

                            }
                        }}
                    >

                        {/* contant info */}
                        <ContactInfo patient={patient} />
                        {/* medical record */}
                        {medicalRecord ? (

                            <MedicalRecordSection
                                record={patient.medical_record!}
                                patientId={patient.id}
                            />

                        ) : userRole === "secretary" ? (
                            <Stack direction={'column'}>
                                <Stack
                                    direction={'row'}
                                    spacing={2}
                                    sx={{
                                        my: 2
                                    }}
                                >
                                    <MedicalInformationOutlined
                                        sx={{
                                            color: theme.palette.etal.main

                                        }} />

                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 20,
                                            mt: 2,
                                            whiteSpace: 'nowrap',
                                            [theme.breakpoints.down('md')]: {
                                                fontSize: 19
                                            },

                                            ml: '50%'
                                        }}
                                    >
                                        Medical Record
                                    </Typography>

                                </Stack>

                                <Button
                                    startIcon={<AddRounded />}
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        width: 180,
                                        border: `2px solid ${theme.palette.etal.main}`,
                                        bgcolor: theme.palette.etal.main,
                                        color: theme.palette.primary.contrastText,

                                    }}
                                    onClick={handleCreate}
                                >
                                    Create record
                                </Button>

                                {/* <CreateMedicalRecordDialog
                                     open={open}
                                     
                                      onClose={handleClose}        /> */}
                            </Stack>
                        ) : (

                            <Typography
                                color="text.secondary"
                            >
                                No medical record found.
                            </Typography>

                        )}

                    </Stack>

                </Box>

                {medicalRecord && (

                    <>
                        <TreatmentPlanSection
                            plans={medicalRecord.treatment_plans ?? []}
                            patientId={patient.id}
                            medicalRecordId={medicalRecord.id}
                        />

                        <TestResultSection
                            results={medicalRecord.lab_results ?? []}
                            pateintId={patient.id}
                            medicalRecordId={medicalRecord.id}

                        />

                        <XRayImageSection
                            image={medicalRecord.radiology_results ?? []}
                            patientId={patient.id}
                        />
                    </>

                )}
            </div >

        </>
    )
}

export default PatientDetailes

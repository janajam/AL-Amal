
import {
    AddRounded,
    ArrowBack,
    CalendarMonthOutlined,
    FemaleOutlined,
    MaleOutlined,
    MedicalInformationOutlined
} from '@mui/icons-material';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../../Entities/Patient';
import pdf from '../../assets/SRS HIMS.pdf'
import img from '../../assets/img.webp'
import img2 from '../../assets/img2.webp'
import ContactInfo from './ContactInfo/ContactInfo';
import MedicalRecordSection from './MedicalRecord/MedicalRecordSection';
import TreatmentPlanSection from './TreatmentPlan/TreatmentPlan';
import TestResultSection from './TestResult/TestSection';
import XRayImageSection from './XRayImage/XRayImageSection';
import { useAuthStore } from '../../Store/AuthStore';
import CreateMedicalRecordDialog from './MedicalRecord/CreateMedicalRecordDialog';
import { useState } from 'react';

//for test 

const patient: Patient = {
    id: 1,
    name: "John Smith",
    age: 30,
    gander: "Male",
    address: "New York",
    email: "john@email.com",
    phoneNumber: "123456789",
    // medicalRecord: null
    medicalRecord: {
        id: 1,

        sickness: ["Diabetes"],

        allergies: [
            "Penicillin",
            "Seafood"
        ],

        longTermMedication: [
            "Metformin 500mg"
        ],

        operations: [
            "Appendectomy"
        ],

        treatmentPlan: [
            {
                id: 1,
                medicalDiagnosis: "Type 2 Diabetes",
                doctorName: "Ahmed",
                treatmentSteps: [
                    "Continue Metformin",
                    "Walk 30 minutes",
                    "HbA1c after 8 weeks",
                    "HbA1c after 8 weeks"

                ],
                date: new Date(),
                status: "Ongoing"
            },
            {
                id: 2,
                medicalDiagnosis: "Hypertension",
                doctorName: "Sarah",
                treatmentSteps: [
                    "Reduce salt",
                    "Exercise daily"
                ],
                date: new Date("2025-10-01"),
                status: "Finished"
            }
        ],

        testResult: [
            {
                id: 1,
                requestedBy: "Ahmed",
                uploaded_by: "Leen",
                title: "Blood Test Report.pdf",
                attachment: pdf,
                uploaded_at: new Date(),
                result: 'result of test'
            },
            {
                id: 2,
                requestedBy: "Sarah",
                uploaded_by: "Leen",
                title: "Vitamin D Report.pdf",
                attachment: pdf,
                uploaded_at: new Date("2025-09-12"),
                result: 'result of test'

            }
        ],
        xRayImage: [
            {
                id: 1,
                requestedBy: "Ahmed",
                description:
                    "Hand X-ray shows no active pulmonary disease.",

                type: "Hand X-Ray",

                image: img,
                uploaded_by: "Leen",
                uploaded_at: new Date()
            },

            {
                id: 2,
                requestedBy: "Sarah",
                description:
                    "Left knee joint with mild osteoarthritis.",

                type: "Knee X-Ray",

                image: img2,
                uploaded_by: 'Leen',
                uploaded_at: new Date("2025-08-10")
            }
        ]
    }
};


const PatientDetailes = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    // const { id } = useParams();

    // const {
    // data,
    // } = useGetPatient(Number(id));

    // const patient = data?.data;

    const userRole = 'secretary'
    // const userRole = useAuthStore((state) => state.role);
    const medicalRecord = patient.medicalRecord;
const [open,setOpen]=useState(false)

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
                            {patient.name}
                        </Typography>

                        <Stack direction={'row'} spacing={2}>
                            <Stack direction={'row'} spacing={1}>
                                <CalendarMonthOutlined sx={{
                                    color: theme.palette.etal.main
                                }} />
                                <Typography>{patient.age} yrs</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                {patient.gander === 'Male'
                                    ? <MaleOutlined
                                        sx={{
                                            color: theme.palette.etal.main
                                        }} />
                                    : <FemaleOutlined
                                        sx={{
                                            color: theme.palette.etal.main
                                        }} />}
                                <Typography>{patient.gander}</Typography>
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
                                record={patient.medicalRecord!}
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

                                    <CreateMedicalRecordDialog
                                     open={open}
                                      onClose={handleClose}                            />
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
                            plans={medicalRecord.treatmentPlan ?? []}
                        />

                        <TestResultSection
                            results={medicalRecord.testResult ?? []}
                        />

                        <XRayImageSection
                            image={medicalRecord.xRayImage ?? []}
                        />
                    </>

                )}
            </div >

        </>
    )
}

export default PatientDetailes

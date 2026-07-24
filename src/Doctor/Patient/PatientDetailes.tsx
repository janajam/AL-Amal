
import {
    ArrowBack,
    CalendarMonthOutlined,
    FemaleOutlined,
    MaleOutlined
} from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../../Entities/Patient';
import ContactInfo from './ContactInfo';
import MedicalRecordSection from './MedicalRecordSection';
import TreatmentPlanSection from './TreatmentPlan';
import pdf from '../../assets/SRS HIMS.pdf'
import TestResultSection from './TestSection';
import XRayImageSection from './XRayImageSection';

import img from '../../assets/img.webp'


import img2 from '../../assets/img2.webp'

//for test 

const patient: Patient = {
    id: 1,
    name: "John Smith",
    age: 30,
    gander: "Male",
    address: "New York",
    email: "john@email.com",
    phoneNumber: "123456789",

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
                doctorName: "Ahmed",
                labWorkingName: "Al-Amal Laboratory",
                reportName: "Blood Test Report.pdf",
                reportUrl: pdf,
                date: new Date()
            },
            {
                id: 2,
                doctorName: "Sarah",
                labWorkingName: "City Medical Lab",
                reportName: "Vitamin D Report.pdf",
                reportUrl: pdf,
                date: new Date("2025-09-12")
            }
        ],
        xRayImage: [
            {
                id: 1,
                doctorName: "Ahmed",
                description:
                    "Hand X-ray shows no active pulmonary disease.",

                type: "Hand X-Ray",

                image:img,
                  
                date: new Date()
            },

            {
                id: 2,
                doctorName: "Sarah",
                description:
                    "Left knee joint with mild osteoarthritis.",

                type: "Knee X-Ray",

                image:img2,
                  
                date: new Date("2025-08-10")
            }
        ]
    }
};


const PatientDetailes = () => {

    const theme = useTheme();
    const navigate = useNavigate();


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
                                {patient.gander === 'male'
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
                        <MedicalRecordSection record={patient.medicalRecord ?? []} />
                    </Stack>
                </Box>

                {/* treatment Plan */}

                <TreatmentPlanSection
                    plans={
                        patient.medicalRecord.treatmentPlan ?? []
                    }
                />
                {/* test result */}

                <TestResultSection
                    results={
                        patient.medicalRecord.testResult ?? []
                    } />

                {/* XRay Image */}

                <XRayImageSection
                    image={
                        patient.medicalRecord.xRayImage ?? []
                    } />
            </div >

        </>
    )
}

export default PatientDetailes

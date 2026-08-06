

import { EditRounded, FiberManualRecord, MedicalInformationOutlined } from '@mui/icons-material'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react';
import type { MedicalRecord } from '../../../Entities/Patient';
import EditMedicalRecord from './EditMedicalRecord';
import { useAuthStore } from '../../../Store/AuthStore';

interface Props {
    record: MedicalRecord;
}
const MedicalRecordSection = ({ record }: Props) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false);
    // const userRole = useAuthStore((state) => state.role);
   const  userRole='secretary'
   
    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Stack>
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
                            }


                        }}
                    >
                        Medical Record
                    </Typography>
                </Stack>
                <Stack
                    spacing={2}

                    sx={{
                        justifyContent: 'space-between',

                    }}
                >
                    <Stack
                        spacing={1.5}>
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 550,
                                whiteSpace: 'nowrap'

                            }}
                        >
                            Sickness :
                        </Typography>
                        <Stack spacing={0.5} sx={{ pl: 2 }}>
                            {record.sickness?.map((sickness, index) => (
                                <Stack key={index} direction="row" spacing={1} sx={{
                                    alignItems: 'center'
                                }} >
                                    <FiberManualRecord sx={{ fontSize: 8, color: theme.palette.etal.main }} />
                                    <Typography sx={{ fontSize: 14 }}>{sickness}</Typography>
                                </Stack>))}
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 550,
                                whiteSpace: 'nowrap'

                            }}
                        >
                            Long Term Medication :
                        </Typography>
                        <Stack spacing={0.5} sx={{ pl: 2 }}>
                            {record.longTermMedication?.map((medication, index) => (
                                <Stack key={index} direction="row" spacing={1} sx={{
                                    alignItems: 'center'
                                }}>
                                    <FiberManualRecord sx={{ fontSize: 8, color: theme.palette.etal.main }} />
                                    <Typography sx={{ fontSize: 14 }}>{medication}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>

                    <Stack spacing={2}>
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 550,
                                whiteSpace: 'nowrap'

                            }}
                        >
                            Allergies :
                        </Typography>
                        <Stack spacing={0.5} sx={{ pl: 2 }}>
                            {record.allergies?.map((allergy, index) => (
                                <Stack key={index} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                    <FiberManualRecord sx={{ fontSize: 8, color: theme.palette.etal.main }} />
                                    <Typography sx={{ fontSize: 14 }}>{allergy}</Typography>

                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography
                            sx={{
                                fontSize: 15,
                                fontWeight: 550,
                                whiteSpace: 'nowrap'

                            }}
                        >
                            Operations :
                        </Typography>
                        <Stack spacing={0.5} sx={{ pl: 2 }}>

                            {record.operations?.map((operation, index) => (
                                <Stack key={index} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                    <FiberManualRecord sx={{ fontSize: 8, color: theme.palette.etal.main }} />
                                    <Typography sx={{ fontSize: 14 }}>{operation}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                    {userRole!=='secretary'&&
                    <Button
                        startIcon={<EditRounded />}
                        sx={{
                            whiteSpace: 'nowrap',
                            width: 120,
                            border: `2px solid ${theme.palette.etal.main}`,
                            bgcolor: theme.palette.etal.main,
                            color: theme.palette.primary.contrastText,
                            alignSelf: 'flex-start',
                            mt: 4,

                        }}
                        onClick={() => handleEdit()}
                    >
                        Edit
                    </Button>
}
                </Stack>
            </Stack>
            <EditMedicalRecord
                open={open}
                record={record}
                onClose={handleClose} />
        </div>
    )
}

export default MedicalRecordSection

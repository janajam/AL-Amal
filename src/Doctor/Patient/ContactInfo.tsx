import { ContactMailOutlined, EditRounded } from "@mui/icons-material"
import { Button, Stack, Typography, useTheme } from "@mui/material"
import type { Patient } from "../../Entities/Patient";
import { useState } from "react";
import EditContactInfoDialog from "./EditDialogs/EditContactInfo";


interface Props {
    patient: Patient;
}

const ContactInfo = ({ patient }: Props) => {
    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const theme = useTheme()
    return (
        <div>
            <Stack>
                <Stack
                    direction={'row'}
                    spacing={2}
                    sx={{ my: 2 }}
                >
                    <ContactMailOutlined
                        sx={{
                            color: theme.palette.etal.main
                        }} />

                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 20,
                            my: 3,
                            whiteSpace: 'nowrap',
                            [theme.breakpoints.down('md')]: {
                                fontSize: 19
                            }

                        }}
                    >
                        Contact Information
                    </Typography>
                </Stack>

                <Stack
                    direction={'row'}
                    sx={{
                        justifyContent: 'space-between',
                    }}
                >
                    <Stack spacing={3}>
                        <Stack direction={'row'} spacing={2}>
                            <Typography
                                sx={{
                                    fontSize: 15,
                                    fontWeight: 550,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Email :
                            </Typography>
                            <Typography>
                                {patient.email}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={2}>
                            <Typography
                                sx={{
                                    fontSize: 15,
                                    fontWeight: 550,
                                    whiteSpace: 'nowrap'

                                }}
                            >
                                Phone Number :
                            </Typography>
                            <Typography>
                                {patient.phoneNumber}
                            </Typography>
                        </Stack>

                        <Stack direction={'row'} spacing={2}>
                            <Typography
                                sx={{
                                    fontSize: 15,
                                    fontWeight: 550,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Address :
                            </Typography>
                            <Typography>
                                {patient.address}
                            </Typography>
                        </Stack>

                    </Stack>
                </Stack>
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
            </Stack>
            <EditContactInfoDialog
                open={open}
                contactInfo={patient}
                onClose={handleClose} />
        </div>
    )
}

export default ContactInfo

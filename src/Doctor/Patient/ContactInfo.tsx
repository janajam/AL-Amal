import { ContactMailOutlined } from "@mui/icons-material"
import { Stack, Typography, useTheme } from "@mui/material"
import type { Patient } from "../../Entities/Patient";


interface Props {
    patient: Patient;
}

const ContactInfo = ({ patient }: Props) => {

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

            </Stack>

        </div>
    )
}

export default ContactInfo

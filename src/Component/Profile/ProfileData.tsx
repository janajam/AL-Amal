
import { Box, Stack, Typography, useTheme } from "@mui/material";
import type { Account, Doctor, Secretary } from "../../Entities/AccountsData";
import { CakeOutlined, ContactPhoneOutlined, HomeOutlined, HourglassEmptyOutlined } from "@mui/icons-material";
import DoctorProfileData from "./DoctorProfileData";


interface Props {
    account: Doctor | Secretary;

    }

const ProfileData = ({ account }: Props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "88%",
                mx: "auto",
                my: 3,
                p: 3,
                // borderRadius: 2,
                // bgcolor: theme.palette.background.default,
                // boxShadow: "0 2px 17px #9ed1d5",
            }}
        >
            <Stack direction={{ sm: 'column', md: 'row' }}
                sx={{ justifyContent: 'space-between' }}
            >
                <Stack spacing={3}>

                    <Stack direction="row" spacing={2}>
                        <CakeOutlined
                            sx={{
                                color: theme.palette.etal.main
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Birth Day :
                        </Typography>

                        <Typography>
                            {account.birthDay}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <ContactPhoneOutlined
                            sx={{
                                color: theme.palette.etal.main
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Phone Number :
                        </Typography>

                        <Typography>
                            {account.phoneNumber}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <HomeOutlined sx={{
                            color: theme.palette.etal.main
                        }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Address:
                        </Typography>

                        <Typography>
                            {account.address || "Not provided"}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <HourglassEmptyOutlined
                            sx={{
                                color: theme.palette.etal.main
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Created At:
                        </Typography>

                        <Typography>
                            {account.createdAt}
                        </Typography>
                    </Stack>

                </Stack>
            </Stack>

            {account.role === "Doctor" && (
                // <DoctorProfileData
                //     doctor={account}
                // />
                <DoctorProfileData
                    doctor={account} />
            )}

        </Box>
    );
};

export default ProfileData;

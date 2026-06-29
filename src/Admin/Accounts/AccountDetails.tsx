
import {
    Box,
    Button,
    CardMedia,
    Divider,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useGetAccount } from "../../Hook/UseGetAccount";
import logo from '../../assets/logo.webp'
import pdf from '../../assets/SRS HIMS_٠٩٢٩٣٦.pdf'
import { ArrowBack } from "@mui/icons-material";
import LicenseItem from "./LicenseItem";

//for test
const accounts = [
    {
        id: 1, name: 'User Name', email: 'A1@email.com', phoneNumber: 'string', birthDay: '1990',
        image: { logo },
        role: "Doctor",
        status: "ACTIVE",
        createdAt: '10-2-2022',
        specialty: {
            id: 1,
            name: "Cardiology"
        },
        address: 'Lorem ipsum dolor sit amet. ',
        department: {
            id: 1,
            name: "Internal Medicine"
        },
        licenses: [
            {
                id: 1,
                name: "Medical License",
                fileUrl: pdf,
                uploadedAt: "2025-07-13",
            },
            {
                id: 2,
                name: "Board Certificate",
                fileUrl: "https://example.com/certificate.pdf",
                uploadedAt: "2025-07-14",
            },
        ],

        workingDays: ["Sunday", "Monday", "Tuesday"]
    },
]

const AccountDetails = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    // const { id } = useParams();

    // const {
    // data,
    // } = useGetAccount(Number(id));

    // const account = data?.data;



    return (
        <>
            {accounts.map((account) =>
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

                    <Box
                        sx={{
                            width: "90%",
                            bgcolor: theme.palette.background.default,
                            justifySelf: "center",
                            borderRadius: 3,
                            p: 3,
                            mb: 3,
                            boxShadow: "0 2px 17px #9ed1d5",
                        }}
                    >


                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 3, md: '25%' }}
                            sx={{
                                alignItems: "center",
                                mb: 4
                            }}
                        >


                            <CardMedia
                                component="img"
                                // image={account?.image}
                                image={logo}
                                alt={account?.name}
                                sx={{
                                    width: 200,
                                    height: 180,
                                    borderRadius: 3,
                                }}
                            />

                            <Stack spacing={1}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 600,
                                        fontSize: 30,
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center',
                                        justifySelf: 'center'
                                    }}
                                >
                                    {account?.name}
                                </Typography>

                                <Typography sx={{
                                    color: theme.palette.etal.main,
                                    fontWeight: 550
                                }}>
                                    {account?.role}
                                </Typography>

                                {account?.role === "Doctor" && (
                                    <Typography color="text.secondary">
                                        {account?.specialty.name}

                                    </Typography>
                                )}
                            </Stack>
                        </Stack>



                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            sx={{
                                justifyContent: "space-between"
                            }}
                        >
                            {/* LEFT */}

                            <Stack spacing={2}>

                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20
                                    }}
                                >
                                    Contact Information
                                </Typography>

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Email:
                                    </Typography>

                                    <Typography>
                                        {account?.email}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography
                                        sx={{ fontWeight: 600 }}>
                                        Phone:
                                    </Typography>

                                    <Typography>
                                        {account?.phoneNumber}
                                    </Typography>
                                </Stack>

                                <Divider
                                    sx={{
                                        height: '1.5px',
                                        width: '90%',
                                        bgcolor: theme.palette.etal.main
                                    }}
                                />

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Birthday:
                                    </Typography>
                                    <Typography>
                                        {/* {account?.birthDay?.toLocaleDateString()} */}
                                        {account.birthDay}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Address:
                                    </Typography>

                                    <Typography>
                                        {account?.address}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Created At:
                                    </Typography>

                                    <Typography>
                                        {/* {account?.createdAt.toLocaleDateString()} */}
                                        {account.createdAt}
                                    </Typography>
                                </Stack>
                            </Stack>

                            {/* RIGHT */}

                            <Stack spacing={2} sx={{ mt: { xs: 3, md: 0 } }}>

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Department:
                                    </Typography>

                                    <Typography>
                                        {account?.department.name}

                                    </Typography>
                                </Stack>
                                {account?.role === "Doctor" && (
                                    <>
                                        <Stack direction="row" spacing={2}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Specialty:
                                            </Typography>

                                            <Typography>
                                                {account.specialty.name}

                                            </Typography>
                                        </Stack>

                                        <Stack spacing={2}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Licenses:
                                            </Typography>
                                            <Stack >
                                                {account.licenses.map((license) => (

                                                    <LicenseItem
                                                        key={license.id}
                                                        license={license}
                                                    />

                                                ))}

                                            </Stack>
                                        </Stack>
                                    </>
                                )}
                                
                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Working Days:
                                    </Typography>

                                    <Typography>
                                        {account?.workingDays.join(", ")}
                                        {/* {account.workingDays} */}
                                    </Typography>
                                </Stack>


                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        alignSelf: "flex-end",
                                        bgcolor:
                                            account?.status === "ACTIVE"
                                                ? theme.palette.secondary.main
                                                : theme.palette.etal.main,
                                    }}
                                >
                                    {account?.status === "ACTIVE"
                                        ? "Revoke"
                                        : "Unrevoke"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </>
            )}
        </>
    );
};

export default AccountDetails;
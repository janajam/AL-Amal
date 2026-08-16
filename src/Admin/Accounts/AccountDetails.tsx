
import {
    Box,
    Button,
    CardMedia,
    CircularProgress,
    Divider,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import logo from '../../assets/amal.webp'
import pdf from '../../assets/SRS HIMS.pdf'
import { ArrowBack } from "@mui/icons-material";
import LicenseItem from "./LicenseItem";
import { useAuthStore } from "../../Store/AuthStore";
import AppointmentScheduleSection from "../../Component/Schedule/Appointment/AppointmentScheduleSection";
import { useGetAccount } from "../../Hook/UseGetAccount";
import Schedule from "../../Component/Schedule/Schedule";


const AccountDetails = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const userRole = useAuthStore((state) => state.role);
    const { id } = useParams();
    const [searchParams] = useSearchParams();
const role = (searchParams.get('role') as "Doctor" | "Secretary") ?? "Doctor";

    const { data, isLoading, isError } = useGetAccount(Number(id),role);
    const account = data?.data;

    if (isLoading) {
        return (
            <Stack  sx={{ py: 8 }}>
                <CircularProgress />
            </Stack>
        );
    }
    // const account = data?.data;



    return (
        <>
            {/* {accounts.map((account) => */}
                <div key={account?.user.id}
                >
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
                            borderRadius: 1,
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
                                // image={account?.user.image}
                                image={logo}
                                alt={account?.user.full_name}
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
                                    {account?.user.full_name}
                                </Typography>

                                <Typography sx={{
                                    color: theme.palette.etal.main,
                                    fontWeight: 550
                                }}>
                                    {/* {account?.user} */}
                                    {role}
                                </Typography>

                                {role === "Doctor" && (
                                    <Typography 
                                        color="text.secondary">
                                        {/* {account?.} */}

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
                                        {account?.user.email}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography
                                        sx={{ fontWeight: 600 }}>
                                        Phone:
                                    </Typography>

                                    <Typography>
                                        {account?.user.phone}
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
                                        {/* {account?.user.birthDay} */}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Address:
                                    </Typography>

                                    <Typography>
                                        {/* {account?.user.address} */}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Created At:
                                    </Typography>

                                    <Typography>
                                        {/* {account?.user.created_at} */}
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
                                {role === "Doctor" && (
                                    <>
                                        <Stack
                                            direction="row" spacing={2}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Specialty:
                                            </Typography>

                                            <Typography>
                                             {/* {account.} */}

                                            </Typography>
                                        </Stack>

                                        <Stack spacing={2}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Licenses:
                                            </Typography>
                                            <Stack >
                                                {/* {account.licenses.map((license) => (

                                                    <LicenseItem
                                                        key={license.id}
                                                        license={license}
                                                    />

                                                ))} */}

                                            </Stack>
                                        </Stack>
                                    </>
                                )}




                            </Stack>
                        </Stack>

                    </Box>
                     <Schedule accountId={account.id} />

                    {/* {userRole !== "secretary" ? (
                        <>
                           
                            <Button
                                variant="contained"
                                sx={{
                                    my: 3,
                                    alignSelf: "flex-end",
                                    justifySelf: 'flex-end',
                                    ml: '88%',
                                    bgcolor:
                                        account?.user.status === "ACTIVE"
                                            ? theme.palette.secondary.main
                                            : theme.palette.etal.main,
                                }}
                            >
                                {account?.status === "ACTIVE"
                                    ? "Revoke"
                                    : "Unrevoke"}
                            </Button>
                        </>
                    )
                        : (
                            <Box
                            sx={{ 
                                width:'98%',
                                alignItems:'center',
                                mt:13,
                                ml:1
                             }}
                            >
                                <AppointmentScheduleSection
                                    doctorId={account?.user.id} />

                            </Box>
                        )
                    } */}

                </div>
            {/* ) */}
            {/* } */}
        </>
    );
};

export default AccountDetails;
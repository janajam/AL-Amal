
import {
    Box,
    Button,
    CardMedia,
    Divider,
    Stack,
    Typography,
    useTheme
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AppointmentScheduleSection from "../../Component/Schedule/Appointment/AppointmentScheduleSection";
import Schedule from "../../Component/Schedule/Schedule";
import { useAuthStore } from "../../Store/AuthStore";
import { useGetDoctor } from "../../Hook/UseGetDoctor";
import getCroppedImageUrl from "../../apiServices/Image_URL";
import AccountDetailsSkeleton from "../../Admin/Accounts/DetailsSkeleton";
import logo from "../../assets/logo.webp";
import LicenseItem from "../../Admin/Accounts/LicenseItem";

const DoctorDetails = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const userRole = useAuthStore((state) => state.role);
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const role = (searchParams.get('role') as "Doctor" | "Secretary") ?? "Doctor";

    const { data, isLoading, isError } = useGetDoctor(Number(id));
    const doctor = data?.data;
    console.log(id);
    console.log(doctor?.name);


    if (isLoading) {
        return (
            <Stack sx={{ py: 8 }}>
                <AccountDetailsSkeleton />
            </Stack>
        );
    }

    if (isError || !data?.data) {
        return (
            <Typography
                sx={{
                    p: 4,
                    color: theme.palette.error.main,
                }}
            >
                Failed to load doctor details.
            </Typography>
        );
    }
    if (doctor) {
        return (
            <>
                <div key={doctor?.id}
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
                                image={getCroppedImageUrl(doctor.image ?? "")}
                                alt={doctor.name}
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
                                    {doctor.name}
                                </Typography>

                                <Typography sx={{
                                    color: theme.palette.etal.main,
                                    fontWeight: 550
                                }}>
                                    {doctor.role}
                                </Typography>

                                {role === "Doctor" && (
                                    <Typography
                                        color="text.secondary">
                                        {doctor?.specialization}

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
                                        {doctor?.email}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography
                                        sx={{ fontWeight: 600 }}>
                                        Phone:
                                    </Typography>

                                    <Typography>
                                        {doctor?.phone}
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
                                        {doctor.birth_date ? new Date(doctor.birth_date).toLocaleDateString() : 'N/A'}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Address:
                                    </Typography>

                                    <Typography>
                                        {doctor?.address}
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
                                        {doctor?.department}

                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row" spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Specialty:
                                    </Typography>

                                    <Typography>
                                        {doctor.specialization}

                                    </Typography>
                                </Stack>

                                {/* <Stack spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Licenses:
                                    </Typography>
                                    <Stack >
                                      { doctor?.license.map((license) => (

                                                    <LicenseItem
                                                        key={license}
                                                        license={license}
                                                    />

                                                ))} 
                                        
                                    </Stack>
                                </Stack> */}


                                <Stack spacing={2}>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Licenses:
                                    </Typography>

                                    <Stack>
                                        {doctor?.license && doctor.license.length > 0 ? (
                                            doctor.license.map((licenseItem, index) => (
                                                <LicenseItem
                                                    key={typeof licenseItem === "string" ? licenseItem + index : index}
                                                    license={licenseItem}
                                                    index={index + 1}
                                                />
                                            ))
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                No licenses uploaded.
                                            </Typography>
                                        )}
                                    </Stack>
                                </Stack>

                            </Stack>
                        </Stack>

                    </Box>

                    {userRole !== "secretary" ? (

                        <>
                            {doctor && <Schedule accountId={doctor.id} />}
                            {userRole === 'admin' &&
                                <Button
                                    variant="contained"
                                    sx={{
                                        my: 3,
                                        alignSelf: "flex-end",
                                        justifySelf: 'flex-end',
                                        ml: '88%',
                                        // bgcolor:
                                        //     doctor?.status === "ACTIVE"
                                        //         ? theme.palette.secondary.main
                                        //         : theme.palette.etal.main,
                                    }}
                                >
                                    {/* {doctor?.status === "ACTIVE"
                                ? "Revoke"
                                : "Unrevoke"} */} revoke
                                </Button>
                            }
                        </>
                    ) : (<Box
                        sx={{
                            width: '98%',
                            alignItems: 'center',
                            mt: 13,
                            ml: 1
                        }}
                    >
                        {doctor && <AppointmentScheduleSection
                            doctorId={doctor.id} />}

                    </Box>

                    )
                    }
                </div>
            </>

        );
    }
};

export default DoctorDetails;
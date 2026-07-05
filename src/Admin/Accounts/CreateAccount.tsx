import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Collapse, Divider, MenuItem, Snackbar, Stack, styled, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateAccountSchema, type CreateAccountInfo } from "../../Schema/CreateAccountSchema";

import { AddRounded, BadgeOutlined, HealthAndSafetyOutlined, HomeOutlined, InfoOutlined, MedicalServicesRounded, SupportAgentRounded } from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseDivider from "../../Component/Schedule/PluseDivider";
import { useCreateAccount } from "../../Hook/UseCreateAccount";

//for test 
const DEPARTMENTS = [
    "Cardiology",
    "Pediatrics",
    "Radiology",
    "Front Desk & Reception",
    "General Medicine",
];


const TextFieldStyle = styled(TextField)(() => ({
    margin: "normal",
    boxShadow: '0 4px 10px #9ed1d5',
    border: 'non',
    width: 370,
    overflow: 'hidden'


}))


const CreateAccount = () => {

    const [birthday, setBirthday] = useState<Date | null>(null);
    const today = new Date();
    const theme = useTheme()
    const navigate = useNavigate()
    const { mutate: createAccount, isPending } = useCreateAccount()

    // const onSubmit = (data: CreateAccountInfo) => {
    //     createAccount(data, {
    //         onSuccess: (response) => {
    //             alert(response.message);
    //             navigate("/dashboard/accounts");
    //         },
    //         onError: (error: any) => {
    //             alert(
    //                 error?.response?.data?.message ??
    //                 "Something went wrong"
    //             );

    //         },

    //     });

    // };
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });
    const handleClose = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));

    };
    const onSubmit = (data: CreateAccountInfo) => {
        createAccount(data, {

            onSuccess: (response) => {
                setSnackbar({
                    open: true,
                    message: response.message,
                    severity: "success",
                });
                setTimeout(() => {
                    navigate("/accounts");
                }, 1000);
            },
            onError: (error: any) => {
                setSnackbar({

                    open: true,
                    message:
                        error.response?.data?.message ??
                        "Something went wrong",
                    severity: "error",
                });
            },
        });
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CreateAccountInfo>({
        resolver: zodResolver(CreateAccountSchema),
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            specialty: '',
            department: '',
            role: "Doctor",
            birthday: '',
        }
    })
    const selectedRole = watch("role");

    const handleRoleChange = (
        _: React.MouseEvent<HTMLElement>,
        newRole: "Doctor" | "Secretary" | null
    ) => {
        if (!newRole) return;
        setValue("role", newRole);
        if (newRole === "Secretary") {
            setValue("specialty", "");
        }
    };

    return (

        <Box component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                mx: 'auto',
                p: 3
            }}
        >

            <Box sx={{ px: 4, pt: 3, pb: 0.5, }}>

                <ToggleButtonGroup value={selectedRole} exclusive onChange={handleRoleChange}>
                    <ToggleButton
                        value="Doctor"
                        sx={{
                            borderRadius: 7,
                            px: 4,
                            "&.Mui-selected": {
                                bgcolor: theme.palette.primary.main,
                                color: "white",
                                "&:hover": {
                                    bgcolor: theme.palette.etal.dark
                                }
                            }
                        }}
                    >
                        <MedicalServicesRounded
                            sx={{ mr: 1 }}
                        />
                        Doctor
                    </ToggleButton>

                    <ToggleButton
                        value="Secretary"
                        sx={{
                            borderRadius: 7,
                            px: 4,
                            "&.Mui-selected": {
                                bgcolor: theme.palette.primary.main,
                                color: "white",
                                "&:hover": {
                                    bgcolor: theme.palette.etal.dark
                                }
                            }
                        }}

                    >
                        <SupportAgentRounded
                            sx={{ mr: 1 }}
                        />
                        Secretary
                    </ToggleButton>

                </ToggleButtonGroup>
            </Box>

            <PulseDivider />

            <Stack spacing={3} >
                <SectionHeading icon={<HealthAndSafetyOutlined />} title="Basic information" step="01 / 03" />


                <Stack direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 3, md: 4, lg: 1 }}
                    sx={{
                        justifyContent: 'space-between'
                    }}>

                    <TextFieldStyle
                        label='Name'
                        sx={{
                            borderRadius: 1,
                        }}
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextFieldStyle
                        label='Email'
                        sx={{
                            borderRadius: 1,
                        }}
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }}
                    spacing={3}
                    sx={{
                        justifyContent: 'space-between'
                    }}>

                    <TextField
                        label='Phone Number'
                        margin="normal"
                        sx={{
                            boxShadow: '0 4px 10px #9ed1d5',
                            borderRadius: 1,
                            border: 'none',
                            width: 370,
                            height: 59
                        }}
                        {...register('phoneNumber')}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <Box
                            sx={{
                                width: 370,
                                margin: '20px auto',
                                boxShadow: '0 4px 10px #9ed1d5',
                                borderRadius: 1,
                                border: 'none',
                            }}>
                            <DatePicker
                                sx={{
                                    width: 370
                                }}
                                {...register('birthday')}
                                label="Birthday"
                                value={birthday}
                                onChange={(newValue) => setBirthday(newValue as Date)}
                                maxDate={today} // Prevents picking future dates
                                openTo="year" // Opens the year view first 
                                views={['year', 'month', 'day']}
                            />
                        </Box>
                    </LocalizationProvider>

                </Stack>
                <Divider />

                <SectionHeading icon={<HomeOutlined />} title="Address" step="02 / 03" />


                <TextField
                    label="Street address, city"
                    margin="normal"
                    fullWidth
                    sx={{
                        boxShadow: '0 4px 10px #9ed1d5',
                        borderRadius: 1,
                        border: 'none',


                    }}
                    {...register('address')}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                />
                <Divider />
                <SectionHeading icon={<BadgeOutlined />} title="Work details" step="03 / 03" />

                <Stack direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 3, md: 4, lg: 1 }}
                    sx={{
                        justifyContent: 'space-between'
                    }}>


                    <TextField
                        id="outlined-select-DEPARTMENT"
                        select
                        label="Department"
                        defaultValue="Department"
                        sx={{
                            borderRadius: 1,
                            boxShadow: '0 4px 10px #9ed1d5',
                            width: 370
                        }}
                        {...register('department')}
                        error={!!errors.department}
                        helperText={errors.department?.message}
                    >
                        {DEPARTMENTS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Collapse
                        in={selectedRole === "Doctor"}
                    >

                        <TextField
                            id="outlined-select-SPECIALTY"
                            select
                            label="Specialty"
                            defaultValue="Specialty"
                            sx={{
                                borderRadius: 1,
                                boxShadow: '0 4px 10px #9ed1d5',
                                width: 370
                            }}
                            {...register('specialty')}
                            error={!!errors.specialty}
                            helperText={errors.specialty?.message}
                        >
                            {DEPARTMENTS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Collapse>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    sx={{
                        py: 2.75,
                        justifyContent: "space-between"
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                        }}
                        spacing={0.75}
                    >
                        <InfoOutlined
                            sx={{
                                fontSize: 14,
                                color: theme.palette.etal.main
                            }} />
                        <Typography
                            sx={{
                                fontSize: 12,
                                color: theme.palette.primary.main
                            }}>
                            They'll receive login details by email once created
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                reset();
                                setBirthday(null);
                            }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isPending}
                            sx={{
                                height: 50
                            }}
                            startIcon={<AddRounded />}>
                            {isPending ? "Creating..." : "Create Account"}
                        </Button>
                    </Stack>

                </Stack>

            </Stack >
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default CreateAccount


function SectionHeading({ icon, title, step }: { icon: React.ReactNode; title: string; step: string }) {
    const theme = useTheme()
    return (
        <Stack direction="row"
            sx={{
                mb: 2.25,
                alignItems: "center",
                justifyContent: 'space-between'
            }}>
            <Stack direction={'row'} spacing={1.25}>
                <Box
                    sx={{
                        color: theme.palette.etal.main,
                        display: "flex",
                        "& svg": { fontSize: 20 }
                    }}>
                    {icon}
                </Box>
                <Typography variant="h2">{title}</Typography>

            </Stack>
            <Typography
                sx={{
                    fontSize: 10.5,
                    letterSpacing: "0.05em",
                    color: theme.palette.primary.main,
                }}
            >
                {step}
            </Typography>
        </Stack>
    );
}



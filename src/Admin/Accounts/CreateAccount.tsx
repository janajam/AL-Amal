import { zodResolver } from "@hookform/resolvers/zod";
import {
    Alert,
    Box,
    Button, Collapse,
    Divider,
    MenuItem,
    Snackbar,
    Stack,
    styled,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useTheme
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CreateAccountSchema, type CreateAccountInfo } from "../../Schema/CreateAccountSchema";
import {
    AddRounded,
    BadgeOutlined,
    HealthAndSafetyOutlined,
    HomeOutlined,
    InfoOutlined,
    MedicalServicesRounded,
    SupportAgentRounded
} from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseDivider from "../../Component/Schedule/PluseDivider";
import { useGetDepartments } from "../../Hook/UseGetDepartments";
import { useCreateAccount } from "../../Hook/UseCreateAccount";

const ganders = ['Male', 'Female']

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

    const { data: departments } = useGetDepartments()

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
        console.log(data)
        createAccount(data, {

            onSuccess: (response) => {
                setSnackbar({
                    open: true,
                    message: response.message,
                    severity: "success",
                });
                setTimeout(() => {
                    navigate("/dashboard/accounts");
                }, 500);
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
        control,
        setValue,
        formState: { errors },
    } = useForm<CreateAccountInfo>({
        resolver: zodResolver(CreateAccountSchema),
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            full_name: '',
            email: '',
            // password: '',
            phone: '',
            address: '',
            specialization: '',
            department_id: undefined,
            role: "Doctor",
            birth_date: '',
            gender: undefined,
            biography: ''
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
            setValue("specialization", "");
            setValue("biography", "");

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
                        label='Full_name'
                        sx={{
                            borderRadius: 1,
                        }}
                        {...register('full_name')}
                        error={!!errors.full_name}
                        helperText={errors.full_name?.message}
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
                        {...register('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                    <Controller
                        name="birth_date"
                        control={control}
                        render={({ field }) => (
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
                                        // {...register('birthday')}
                                        value={field.value ? new Date(field.value) : null}
                                        label="Birthday"
                                        // value={birthday}
                                        onChange={(newValue) => {
                                            field.onChange(newValue ? newValue.toISOString().split('T')[0] : '');
                                        }}
                                        maxDate={today} // Prevents picking future dates
                                        openTo="year" // Opens the year view first 
                                        views={['year', 'month', 'day']}
                                        slotProps={{
                                            textField: {
                                                error: !!errors.birth_date,
                                                helperText: errors.birth_date?.message,
                                                sx: { width: 370, boxShadow: '0 4px 10px #9ed1d5', borderRadius: 1 }
                                            }
                                        }}

                                    />
                                </Box>
                            </LocalizationProvider>
                        )} />
                </Stack>

                {/* <TextField
                    label='Gander'
                    sx={{
                        borderRadius: 1,
                        boxShadow: '0 4px 10px #9ed1d5',
                        width: 370

                    }}
                    {...register('gander')}
                    error={!!errors.gander}
                    helperText={errors.gander?.message}

                >
                    {ganders.map((gander) => (
                        <MenuItem key={gander} value={gander}>
                            {gander}
                        </MenuItem>
                    ))}
                </TextField> */}
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            select
                            label='Gender'
                            {...field}
                            error={!!errors.gender}
                            helperText={errors.gender?.message}
                            sx={{ borderRadius: 1, boxShadow: '0 4px 10px #9ed1d5', width: 370 }}
                        >
                            {ganders.map((g) => (
                                <MenuItem key={g} value={g}>{g}</MenuItem>
                            ))}
                        </TextField>
                    )}
                />
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


                    {/* <TextField
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
                        {departments?.data.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField> */}

                    <Controller
                        name="department_id"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                select
                                label="Department"
                                value={field.value ?? ''}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                error={!!errors.department_id}
                                helperText={errors.department_id?.message}
                                sx={{ borderRadius: 1, boxShadow: '0 4px 10px #9ed1d5', width: 370 }}
                            >
                                {departments?.data.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                     {selectedRole === 'Doctor' && (
                    <TextFieldStyle
                        label='Specialization'
                        sx={{
                            borderRadius: 1,
                        }}
                        {...register('specialization')}
                        error={!!errors.specialization}
                        helperText={errors.specialization?.message}
                    />
                    )}
                </Stack>
                 {selectedRole === 'Doctor' && (
                <TextFieldStyle
                    label='Biography'
                    sx={{
                        borderRadius: 1,
                    }}
                    {...register('biography')}
                    error={!!errors.biography}
                    helperText={errors.biography?.message}
                />
                )}

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



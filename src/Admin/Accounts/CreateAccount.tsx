import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { CreateAccountSchema, type CreateAccountInfo } from "../../Schema/CreateAccountSchema";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { Fullscreen } from "@mui/icons-material";


const CreateAccount = () => {

    const [birthday, setBirthday] = useState<Date | null>(null);

    // Get today's date to prevent selecting future dates
    const today = new Date();

    const theme = useTheme()
    const onSubmit = () => {

    }
    const {
        register,
        handleSubmit,
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
            role: '',
            birthday: '',
        }
    })



    return (
        <Box component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                mx: 'auto',
                my: 3,
                p: 3
            }}
        >

            <Stack spacing={3} >
                <Stack direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 3, md: 4, lg: 1 }}
                    sx={{
                        justifyContent: 'space-between'
                    }}>
                    <TextField
                        label='Name'
                        margin="normal"
                        sx={{
                            boxShadow: '0 4px 10px #9ed1d5',
                            borderRadius: 1,
                            border: 'none',
                            width: 370,
                        }}
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label='Email'
                        margin="normal"
                        sx={{
                            boxShadow: '0 4px 10px #9ed1d5',
                            borderRadius: 1,
                            border: 'none',
                            width: 370,
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
                                // error={!!errors.birthday}
                                // helpertext={errors.birthday?.message}
                                label="Birthday"
                                value={birthday}
                                onChange={(newValue) => setBirthday(newValue)}
                                maxDate={today} // Prevents picking future dates
                                openTo="year" // Opens the year view first (highly recommended for birthdays)
                                views={['year', 'month', 'day']} // Available views
                            />
                        </Box>
                    </LocalizationProvider>

                </Stack>


                <TextField
                    label='Address'
                    margin="normal"

                    sx={{
                        boxShadow: '0 4px 10px #9ed1d5',
                        borderRadius: 1,
                        border: 'none',
                        width: 370,

                    }}
                    {...register('address')}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                />
                <Stack direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 3, md: 4, lg: 1 }}
                    sx={{
                        justifyContent: 'space-between'
                    }}>

                    <TextField
                        label='Role'
                        margin="normal"
                        sx={{
                            boxShadow: '0 4px 10px #9ed1d5',
                            borderRadius: 1,
                            border: 'none',
                            width: 370,
                        }}
                        {...register('role')}
                        error={!!errors.role}
                        helperText={errors.role?.message}
                    />
                    <TextField
                        label='Department'
                        margin="normal"
                        sx={{
                            boxShadow: '0 4px 10px #9ed1d5',
                            borderRadius: 1,
                            border: 'none',
                            width: 370,
                        }}
                        {...register('department')}
                        error={!!errors.department}
                        helperText={errors.department?.message}
                    />


                </Stack>
                <TextField
                    label='Specialty'
                    margin="normal"
                    sx={{
                        boxShadow: '0 4px 10px #9ed1d5',
                        borderRadius: 1,
                        border: 'none',
                        width: 370,
                    }}
                    {...register('specialty')}
                    error={!!errors.specialty}
                    helperText={errors.specialty?.message}
                />

            </Stack>

        </Box >
    )
}

export default CreateAccount

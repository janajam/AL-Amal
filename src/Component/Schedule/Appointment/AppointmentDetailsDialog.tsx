import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";

import {
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { TimeSlot } from "../../../Entities/Appointment";
import { appointmentDetailsSchema, type AppointmentDetailsInput } from "../../../Schema/AppointmentDetailsDialogSchema";

interface Props {
    open: boolean;
    onClose: () => void;
    slot: TimeSlot | null;
    onSave: (updatedSlot: TimeSlot) => void;
    onCancelAppointment: (freedSlot: TimeSlot) => void;
}

const statusOptions: AppointmentDetailsInput["status"][] = [
    "Booked",
];

const AppointmentDetailsDialog = ({
    open,
    onClose,
    slot,
    onSave,
    onCancelAppointment,
}: Props) => {

    const theme = useTheme()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AppointmentDetailsInput>({
        resolver: zodResolver(appointmentDetailsSchema),
        defaultValues: {
            patientName: "",
            appointmentType: "",
            status: "Booked",
            startTime: dayjs(),
            endTime: dayjs(),
        },
    });

    useEffect(() => {

        if (!open || !slot || !slot.appointment) return;

        reset({
            patientName: slot.appointment.patientName,
            appointmentType: slot.appointment.appointment.type,
            status: slot.status as "Booked" | "Completed",
            startTime: dayjs(`${slot.date} ${slot.startTime}`, "YYYY-MM-DD HH:mm"),
            endTime: dayjs(`${slot.date} ${slot.endTime}`, "YYYY-MM-DD HH:mm"),
        });

    }, [slot, open, reset]);

    const onSubmit = (values: AppointmentDetailsInput) => {

        if (!slot || !slot.appointment) return;

        const updatedSlot: TimeSlot = {
            ...slot,
            // status: values.status,
            // startTime: values.startTime.format("HH:mm"),
            // endTime: values.endTime.format("HH:mm"),
            // appointment: {
            //     ...slot.appointment,
            //     patientName: values.patientName,
            //     appointment: {
            //         ...slot.appointment.appointment,
            //         status: values.status,
            //         type: values.appointmentType,
            //     },
            // },
        };

        onSave(updatedSlot);
        onClose();

    };

    const handleCancel = () => {

        if (!slot) return;

        // const freedSlot: TimeSlot = {
        //     id: slot.id,
        //     date: slot.date,
        //     startTime: slot.startTime,
        //     endTime: slot.endTime,
        //     status: "Available",
        //     appointment: undefined,
        // };

        // onCancelAppointment(freedSlot);
        onClose();

    };

    if (!slot || !slot.appointment) return null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
            >
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center"

                    }}>
                    <DialogTitle sx={{ fontSize: 17, fontWeight: 550 }}>
                        Appointment Details
                        <Typography
                            component="span"
                            sx={{
                                display: "block",
                                fontSize: 13,
                                fontWeight: 400,
                                color: "text.secondary",
                            }}
                        >
                            {dayjs(slot.date).format("dddd, DD MMM YYYY")}
                        </Typography>
                    </DialogTitle>
                     <Button color="error" variant='outlined' onClick={handleCancel}>
                            Cancel 
                        </Button>

                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogContent>

                        <Stack spacing={2.5} sx={{ mt: 2 }}>

                            <TextField
                                label="Patient Name"
                                fullWidth
                                error={!!errors.patientName}
                                helperText={errors.patientName?.message}
                                {...register("patientName")}
                            />

                            <TextField
                                label="Appointment Type"
                                fullWidth
                                error={!!errors.appointmentType}
                                helperText={errors.appointmentType?.message}
                                {...register("appointmentType")}
                            />

                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        select
                                        label="Status"
                                        {...field}
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                            <Controller
                                name="startTime"
                                control={control}
                                render={({ field }) => (
                                    <TimePicker
                                        label="Start Time"
                                        value={field.value}
                                        onChange={field.onChange}
                                        slotProps={{
                                            textField: {
                                                error: !!errors.startTime,
                                                helperText: errors.startTime?.message,
                                            },
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                name="endTime"
                                control={control}
                                render={({ field }) => (
                                    <TimePicker
                                        label="End Time"
                                        value={field.value}
                                        onChange={field.onChange}
                                        slotProps={{
                                            textField: {
                                                error: !!errors.endTime,
                                                helperText: errors.endTime?.message,
                                            },
                                        }}
                                    />
                                )}
                            />

                        </Stack>

                    </DialogContent>

                    <DialogActions sx={{  px: 3, pb: 2 }}>

                        <Stack direction="row" spacing={1}>
                            <Button 
                            sx={{ 
                                bgcolor:theme.palette.secondary.main,
                                color:theme.palette.primary.contrastText
                             }}
                            onClick={onClose}>
                                Cancel
                            </Button>

                            <Button type="submit" variant="contained">
                                Save Changes
                            </Button>
                        </Stack>

                    </DialogActions>

                </form>

            </Dialog>
        </LocalizationProvider>
    );

};

export default AppointmentDetailsDialog;
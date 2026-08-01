import { useEffect } from "react";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { TimeSlot } from "../../../Entities/Appointment";
import { bookingSchema, type BookingFormInput } from "../../../Schema/BookingDialogSchema";

interface Props {
    open: boolean;
    onClose: () => void;
    slot: TimeSlot | null;
    doctorId: number;
    onConfirm: (updatedSlot: TimeSlot) => void;
}

const BookingDialog = ({
    open,
    onClose,
    slot,
    doctorId,
    onConfirm,
}: Props) => {

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookingFormInput>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            patientName: "",
            appointmentType: "",
            startTime: dayjs(),
            endTime: dayjs(),
        },
    });

    // تعبئة/تصفير النموذج بالكامل بسطر واحد كل ما يتغير الـ slot

    useEffect(() => {

        if (!open || !slot) return;

        reset({
            patientName: "",
            appointmentType: "",
            startTime: dayjs(`${slot.date} ${slot.startTime}`, "YYYY-MM-DD HH:mm"),
            endTime: dayjs(`${slot.date} ${slot.endTime}`, "YYYY-MM-DD HH:mm"),
        });

    }, [slot, open, reset]);

    const onSubmit = (values: BookingFormInput) => {

        if (!slot) return;

        // const updatedSlot: TimeSlot = {
        //     ...slot,},
        //     },
        // };

        // onConfirm(updatedSlot);
        onClose();

    };

    if (!slot) return null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ fontSize: 17, fontWeight: 550 }}>
                    Book Appointment

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

                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogContent>

                        <Stack spacing={2.5} sx={{ mt: 2 }}>

                            <TextField
                                label="Patient Name"
                                fullWidth
                                autoFocus
                                error={!!errors.patientName}
                                helperText={errors.patientName?.message}
                                {...register("patientName")}
                            />

                            <TextField
                                label="Appointment Type"
                                fullWidth
                                placeholder="Consultation, Follow Up, ..."
                                error={!!errors.appointmentType}
                                helperText={errors.appointmentType?.message}
                                {...register("appointmentType")}
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

                    <DialogActions>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>

                        <Button type="submit" variant="contained">
                            Confirm Booking
                        </Button>
                    </DialogActions>

                </form>

            </Dialog>
        </LocalizationProvider>
    );

};

export default BookingDialog;
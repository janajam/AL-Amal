// import { useEffect } from "react";
// import dayjs from "dayjs";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Button,
//     Stack,
//     TextField,
//     Typography,
//     useTheme,
// } from "@mui/material";

// import {
//     LocalizationProvider,
//     TimePicker,
// } from "@mui/x-date-pickers";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import type { TimeSlot } from "../../../Entities/Appointment";
// import { bookingSchema, type BookingFormInput } from "../../../Schema/BookingDialogSchema";

// interface Props {
//     open: boolean;
//     onClose: () => void;
//     slot: TimeSlot | null;
//     doctorId: number;
//     onConfirm: (updatedSlot: TimeSlot) => void;
// }

// const BookingDialog = ({
//     open,
//     onClose,
//     slot,
//     doctorId,
//     onConfirm,
// }: Props) => {

//     const theme=useTheme()
//     const {
//         control,
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm<BookingFormInput>({
//         resolver: zodResolver(bookingSchema),
//         defaultValues: {
//             medical_number:'',
//             startTime: dayjs(),
//             endTime: dayjs(),
//         },
//     });


//     useEffect(() => {

//         if (!open || !slot) return;

//         reset({
//             medical_number: "",
//             startTime: dayjs(`${slot.date} ${slot.startTime}`, "YYYY-MM-DD HH:mm"),
//             endTime: dayjs(`${slot.date} ${slot.endTime}`, "YYYY-MM-DD HH:mm"),
//         });

//     }, [slot, open, reset]);

//     const onSubmit = (values: BookingFormInput) => {

//         if (!slot) return;

//         // const updatedSlot: TimeSlot = {
//         //     ...slot,},
//         //     },
//         // };

//         // onConfirm(updatedSlot);
//         onClose();

//     };

//     if (!slot) return null;

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Dialog
//                 open={open}
//                 onClose={onClose}
//                 fullWidth
//                 maxWidth="xs"
//             >
//                 <DialogTitle sx={{ fontSize: 17, fontWeight: 550 }}>
//                     Book Appointment

//                     <Typography
//                         component="span"
//                         sx={{
//                             display: "block",
//                             fontSize: 13,
//                             fontWeight: 400,
//                             color: "text.secondary",
//                         }}
//                     >
//                         {dayjs(slot.date).format("dddd, DD MMM YYYY")}
//                     </Typography>
//                 </DialogTitle>

//                 <form onSubmit={handleSubmit(onSubmit)}>

//                     <DialogContent>

//                         <Stack spacing={2.5} sx={{ mt: 2 }}>

//                             <TextField
//                                 label="Patient Medical Number"
//                                 fullWidth
//                                 autoFocus
//                                 error={!!errors.medical_number}
//                                 helperText={errors.medical_number?.message}
//                                 {...register("medical_number")}
//                             />

//                             {/* <TextField
//                                 label="Appointment Type"
//                                 fullWidth
//                                 placeholder="Consultation, Follow Up, ..."
//                                 error={!!errors.appointmentType}
//                                 helperText={errors.appointmentType?.message}
//                                 {...register("appointmentType")}
//                             /> */}

//                             <Controller
//                                 name="startTime"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TimePicker
//                                         label="Start Time"
//                                         value={field.value}
//                                         onChange={field.onChange}
//                                         slotProps={{
//                                             textField: {
//                                                 error: !!errors.startTime,
//                                                 helperText: errors.startTime?.message,
//                                             },
//                                         }}
//                                     />
//                                 )}
//                             />

//                             <Controller
//                                 name="endTime"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TimePicker
//                                         label="End Time"
//                                         value={field.value}
//                                         onChange={field.onChange}
//                                         slotProps={{
//                                             textField: {
//                                                 error: !!errors.endTime,
//                                                 helperText: errors.endTime?.message,
//                                             },
//                                         }}
//                                     />
//                                 )}
//                             />

//                         </Stack>

//                     </DialogContent>

//                     <DialogActions>
//                         <Button
//                           sx={{ 
//                                 bgcolor:theme.palette.secondary.main,
//                                 color:theme.palette.primary.contrastText
//                              }}
                          
//                         onClick={onClose}>
//                             Cancel
//                         </Button>

//                         <Button type="submit" variant="contained">
//                             Confirm Booking
//                         </Button>
//                     </DialogActions>

//                 </form>

//             </Dialog>
//         </LocalizationProvider>
//     );

// };

// export default BookingDialog;




import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";

import type { TimeSlot } from "../../../Entities/Appointment";
import { bookingSchema, type BookingFormInput } from "../../../Schema/BookingDialogSchema";
import { useBookAppointment } from "../../../Hook/UseBookAppointment";

interface Props {
    open: boolean;
    onClose: () => void;
    slot: TimeSlot | null;
    doctorId: number;
    onConfirm: (updatedSlot: TimeSlot) => void;
}

const BookingDialog = ({ open, onClose, slot, doctorId, onConfirm }: Props) => {
    const theme = useTheme();
    const { mutate: bookAppointment, isPending } = useBookAppointment(doctorId);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookingFormInput>({
        resolver: zodResolver(bookingSchema),
        defaultValues: { medical_number: "" },
    });

    useEffect(() => {
        if (!open) return;
        reset({ medical_number: "" });
    }, [slot, open, reset]);

    const onSubmit = (values: BookingFormInput) => {
        if (!slot) return;

        bookAppointment(
            {
                medical_number: values.medical_number,
                appointment_slot_id: slot.id,
            },
            {
                onSuccess: (response) => {
                    setSnackbar({ open: true, message: response.message, severity: "success" });
                    onConfirm({ ...slot, status: "Booked" });
                    onClose();
                },
                onError: (error: any) => {
                    setSnackbar({
                        open: true,
                        message: error.response?.data?.message ?? "حدث خطأ أثناء الحجز",
                        severity: "error",
                    });
                },
            }
        );
    };

    if (!slot) return null;

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                <DialogTitle sx={{ fontSize: 17, fontWeight: 550 }}>
                    Book Appointment
                    <Typography
                        component="span"
                        sx={{ display: "block", fontSize: 13, fontWeight: 400, color: "text.secondary" }}
                    >
                        {dayjs(slot.date).format("dddd, DD MMM YYYY")} — {slot.startTime} to {slot.endTime}
                    </Typography>
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Stack spacing={2.5} sx={{ mt: 2 }}>
                            <TextField
                                label="Patient Medical Number"
                                fullWidth
                                autoFocus
                                error={!!errors.medical_number}
                                helperText={errors.medical_number?.message}
                                {...register("medical_number")}
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            disabled={isPending}
                            sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.primary.contrastText }}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isPending}
                            startIcon={isPending ? <CircularProgress size={20} /> : null}
                        >
                            {isPending ? "Booking..." : "Confirm Booking"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    );
};

export default BookingDialog;
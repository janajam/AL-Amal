

import {
    Box,
    Paper,
    Typography,
    useTheme,
} from "@mui/material";

import dayjs from "dayjs";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import type { TimeSlot } from "../../../Entities/Appointment";

import ScheduleHeader from "../SchedualeHeader";
import WeekNavigator from "../WeekNavigatog";

import AppointmentDetailsDialog from "./AppointmentDetailsDialog";
import AppointmentTable from "./AppointmentTable";
import BookingDialog from "./BookingDialog";

import {
    getMonthWeeks,
    transformSlots,
} from "./AppointmentHelper";
import { useGetAppointmentSlots } from "../../../Hook/UseGetAppointmentSlot";
import AccountDetailsSkeleton from "../../../Admin/Accounts/DetailsSkeleton";



interface Props {
    doctorId: number;
}


const AppointmentScheduleSection = ({
    doctorId,
}: Props) => {

    const theme = useTheme();


    const [selectedMonth, setSelectedMonth] =
        useState(dayjs());

    const [currentWeek, setCurrentWeek] =
        useState(0);

    const [selectedSlot, setSelectedSlot] =
        useState<TimeSlot | null>(null);


    const [bookingDialogOpen, setBookingDialogOpen] =
        useState(false);


    const [detailsDialogOpen, setDetailsDialogOpen] =
        useState(false);

    const {
        data,
        isLoading,
        isError,
    } = useGetAppointmentSlots(
        selectedMonth.year(),
        selectedMonth.month() + 1
    );

    useEffect(() => {

        setCurrentWeek(0);

    }, [selectedMonth]);

    const weeks = useMemo(() => {

        if (!data?.data) {
            return [];
        }

        return getMonthWeeks(data.data);

    }, [data]);


    const currentWeekDates =
        weeks[currentWeek] ?? [];


    const slots = useMemo(() => {

        if (!data?.data) {
            return [];
        }

        return transformSlots(data.data);

    }, [data]);

    const currentWeekSlots = useMemo(() => {

        return slots.filter((slot) =>
            currentWeekDates.includes(slot.date)
        );

    }, [slots, currentWeekDates]);

    const groupedSlots = useMemo(() => {

        const map = new Map<string, TimeSlot[]>();

        currentWeekDates.forEach((date) => {

            map.set(
                date,
                currentWeekSlots.filter(
                    (slot) => slot.date === date
                )
            );

        });

        return map;

    }, [
        currentWeekDates,
        currentWeekSlots,
    ]);

    const handleSlotClick = (
        slot: TimeSlot
    ) => {

        setSelectedSlot(slot);

        if (slot.status === "Available") {

            setBookingDialogOpen(true);

        } else {

            setDetailsDialogOpen(true);

        }

    };


    const updateSlotInState = (
        updatedSlot: TimeSlot
    ) => {


        console.log(
            "Updated slot:",
            updatedSlot
        );

    };


    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                mt: 1,
                mb: 4,
                width: "93%",
                mx: "auto",
                borderRadius: 2,
                overflow: "hidden",
                maxWidth: "100%",
                bgcolor:
                    theme.palette.background.default,
                boxShadow:
                    "0 2px 17px #9ed1d5",
            }}
        >


            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: 700,
                    fontSize: 17,
                }}
            >
                Appointment Schedule
            </Typography>


            <ScheduleHeader
                selectedMonth={selectedMonth}
                onMonthChange={(month) => {

                    setSelectedMonth(month);
                    setCurrentWeek(0);

                }}
            />

            {isLoading && (

                <Box
                    sx={{
                        py: 8,
                        textAlign: "center",
                    }}
                >

                    <Typography color="text.secondary">
                        Loading appointments...
                    </Typography>
                    <AccountDetailsSkeleton />
                </Box>

            )}

            {!isLoading && isError && (

                <Box
                    sx={{
                        py: 8,
                        textAlign: "center",
                    }}
                >

                    <Typography color="error">
                        Failed to load appointment slots.
                    </Typography>

                </Box>

            )}

            {!isLoading &&
                !isError &&
                data?.data &&
                weeks.length === 0 && (

                    <Box
                        sx={{
                            py: 8,
                            textAlign: "center",
                        }}
                    >

                        <Typography color="text.secondary">
                            No appointment slots available
                            for this month.
                        </Typography>

                    </Box>

                )}
            {!isLoading &&
                !isError &&
                weeks.length > 0 && (

                    <>

                        <WeekNavigator
                            currentWeek={currentWeek}
                            totalWeeks={weeks.length}
                            currentWeekDates={
                                currentWeekDates
                            }

                            onPrevious={() =>
                                setCurrentWeek(
                                    (prev) =>
                                        Math.max(
                                            prev - 1,
                                            0
                                        )
                                )
                            }

                            onNext={() =>
                                setCurrentWeek(
                                    (prev) =>
                                        Math.min(
                                            prev + 1,
                                            weeks.length - 1
                                        )
                                )
                            }
                        />


                        <Box sx={{ mt: 4 }}>

                            <AppointmentTable
                                week={currentWeekDates}
                                groupedSlots={groupedSlots}
                                onSlotClick={
                                    handleSlotClick
                                }
                            />

                        </Box>

                    </>

                )}


            <BookingDialog
                open={bookingDialogOpen}

                onClose={() =>
                    setBookingDialogOpen(false)
                }

                slot={selectedSlot}

                doctorId={doctorId}

                onConfirm={
                    updateSlotInState
                }
            />


         
            <AppointmentDetailsDialog
                open={detailsDialogOpen}

                onClose={() =>
                    setDetailsDialogOpen(false)
                }

                slot={selectedSlot}

                onSave={
                    updateSlotInState
                }

                onCancelAppointment={
                    updateSlotInState
                }
            />

        </Paper>

    );

};


export default AppointmentScheduleSection;
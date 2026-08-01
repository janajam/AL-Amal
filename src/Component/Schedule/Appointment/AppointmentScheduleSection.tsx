import { Box, Paper, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import type { AppointmentListItem, TimeSlot } from "../../../Entities/Appointment";
import ScheduleHeader from "../SchedualeHeader";
import WeekNavigator from "../WeekNavigatog";
import { getMonthWeeks } from "./AppointmentHelper";
import AppointmentTable from "./AppointmentTable";
import { dummySlots } from "./dummySlots";
import { groupSlotsByDay } from "./helper";
import BookingDialog from "./BookingDialog";

interface Props {
    doctorId: number;
}
const AppointmentScheduleSection = ({ doctorId }: Props) => {

    const theme = useTheme();

    const [selectedMonth, setSelectedMonth] =
        useState(dayjs());

    const [currentWeek, setCurrentWeek] =
        useState(0);

    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentListItem | null>(null);
    const [slots, setSlots] = useState<TimeSlot[]>(dummySlots);

    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);


    useEffect(() => {

        setCurrentWeek(0);

    }, [selectedMonth]);

    const handleAppointmentClick = (
        appointment: AppointmentListItem
    ) => {

        setSelectedAppointment(appointment);
        // setDialogOpen(true);

    };

    // const slotsData = { data: dummySlots };

    const weeks = useMemo(() => getMonthWeeks(selectedMonth), [selectedMonth]);

    const currentWeekDates: string[] = weeks[currentWeek] ?? [];


    const groupedSlots = useMemo(
        () => groupSlotsByDay(slots, currentWeekDates),
        [currentWeekDates, slots]
    );
    const handleSlotClick = (slot: TimeSlot) => {
        setSelectedSlot(slot);

        if (slot.status === "Available") {
            setBookingDialogOpen(true);
        } else {
            setDetailsDialogOpen(true);
        }
    };

    const updateSlotInState = (updatedSlot: TimeSlot) => {
        setSlots((prev) =>
            prev.map((s) => (s.id === updatedSlot.id ? updatedSlot : s))
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
                    fontSize: 17
                }}

            >
                Appointment Schedule
            </Typography>


            <ScheduleHeader
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
            />

            <WeekNavigator
                currentWeek={currentWeek}
                totalWeeks={weeks.length}
                currentWeekDates={currentWeekDates}
                onPrevious={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
                onNext={() => setCurrentWeek((prev) => Math.min(prev + 1, weeks.length - 1))}
            />

            <Box sx={{ mt: 4 }}>

                <AppointmentTable
                    week={currentWeekDates}
                    groupedSlots={groupedSlots}
                    onSlotClick={handleSlotClick}
                />

            </Box>

            <BookingDialog 
            open={bookingDialogOpen}
             onClose={() => setBookingDialogOpen(false)}
            slot={selectedSlot} 
            doctorId={1} 
            onConfirm={updateSlotInState}
            />
        </Paper>

    );

};

export default AppointmentScheduleSection;
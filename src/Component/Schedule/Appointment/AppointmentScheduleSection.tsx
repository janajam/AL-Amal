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

    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {

        setCurrentWeek(0);

    }, [selectedMonth]);

    const handleAppointmentClick = (
        appointment: AppointmentListItem
    ) => {

        setSelectedAppointment(appointment);
        setDialogOpen(true);

    };

    const slotsData = { data: dummySlots };

    const weeks = useMemo(() => getMonthWeeks(selectedMonth), [selectedMonth]);

    const currentWeekDates: string[] = weeks[currentWeek] ?? [];

    const groupedSlots = useMemo(
        () => groupSlotsByDay(slotsData.data, currentWeekDates),
        [currentWeekDates, slotsData.data]
    );

    const handleSlotClick = (slot: TimeSlot) => {
        if (slot.status === "Available") {
            // book new appointment
        } else {
            // details of appointment
            setSelectedAppointment(slot.appointment ?? null);
        }
        setDialogOpen(true);
    };
    return (


        <Paper
            elevation={3}
            sx={{
                p: 3,
                mt:1,
                mb:4,
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
                    fontSize:17
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

            {/*

            <AppointmentDialog
                open={dialogOpen}
                appointment={selectedAppointment}
                onClose={() => setDialogOpen(false)}
            />

            */}

        </Paper>

    );

};

export default AppointmentScheduleSection;
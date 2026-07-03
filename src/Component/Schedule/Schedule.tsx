import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import ScheduleHeader from "./SchedualeHeader";
import { useGetSchedule } from "../../Hook/UseGetSchedule";
import WeekNavigator from "./WeekNavigatog";
import ScheduleTable from "./ScheduleTable";
import { splitScheduleIntoWeeks } from "./ScheduleHelper";
import { dummySchedule } from "./ScheduleDummy";
import type { WorkingSchedule } from "../../Entities/AccountsData";
import EditScheduleDialog from "./EditScheduleDialog";

interface Props {
    accountId: number;
}

const ScheduleSection = ({ accountId }: Props) => {

    const theme = useTheme();
    const [selectedDay, setSelectedDay] = useState<WorkingSchedule | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs());

    const [currentWeek, setCurrentWeek] = useState(0);

    const data = {
        data: dummySchedule,
    };

    const isLoading = false;

   const handleEdit = (schedule: WorkingSchedule) => {
    setSelectedDay(schedule);
    setDialogOpen(true);
};
    // const { data, isLoading } = useGetSchedule(
    //     accountId,
    //     selectedMonth.month() + 1,
    //     selectedMonth.year()
    // );

    const weeks = useMemo(() => {
        if (!data?.data) return [];
        return splitScheduleIntoWeeks(data.data);
    }, [data]);


    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                my: 5,
                borderRadius: 1,
                bgcolor: theme.palette.background.default,
                width: '90%',
                justifySelf: 'center',
                boxShadow: "0 2px 17px #9ed1d5",

            }}
        >

            <Typography
                variant="h5"
                sx={{
                    color: "primary",
                    fontWeight: 600,
                    fontSize: 20,
                    mb: 2
                }}
            >
                Working Schedule
            </Typography>

            <ScheduleHeader
                selectedMonth={selectedMonth}
                onMonthChange={(month) => {
                    setSelectedMonth(month);
                    setCurrentWeek(0);
                }}
            />

            <WeekNavigator
                currentWeek={currentWeek}
                totalWeeks={weeks.length}
                currentWeekData={weeks[currentWeek] ?? []}
                onPrevious={() =>
                    setCurrentWeek((prev) => Math.max(prev - 1, 0))
                }
                onNext={() =>
                    setCurrentWeek((prev) =>
                        Math.min(prev + 1, weeks.length - 1)
                    )
                }
            />

            <Box sx={{
                mt: 4
            }}>

                <ScheduleTable
                    week={weeks[currentWeek] ?? []}
                    loading={isLoading}
                    onEdit={handleEdit}
                />
                {/* <ScheduleTable
                    loading={isLoading}
                    week={weeks[currentWeek] ?? []}
                /> */}

            </Box>

            {selectedDay && (

                <EditScheduleDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    day={selectedDay}
                    accountId={accountId}
                />

            )}
            
        </Paper>

    );

};

export default ScheduleSection;
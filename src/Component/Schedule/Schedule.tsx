
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import ScheduleHeader from "./SchedualeHeader";
import WeekNavigator from "./WeekNavigatog";
import ScheduleTable from "./ScheduleTable";
import EditScheduleDialog from "./EditScheduleDialog";

import { useGetSchedule } from "../../Hook/UseGetSchedule";
import { useCreateSchedule } from "../../Hook/UseCreateSchedule";

import type {
  ScheduleDay,
  ScheduleWeek,
} from "../../Entities/WorkingSchedualeData";
import { useAuthStore } from "../../Store/AuthStore";

interface Props {
  accountId: number;
}

const ScheduleSection = ({ accountId }: Props) => {
  const theme = useTheme();

  const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [currentWeek, setCurrentWeek] = useState(0);

    const userRole = useAuthStore((state) => state.role);
  const { data, isLoading, isError } = useGetSchedule(
    accountId,
    selectedMonth.year(),
    selectedMonth.month() + 1
  );


  const { mutate: createSchedule, isPending: isCreating } = useCreateSchedule(accountId);

  const weeks: ScheduleWeek[] = data?.data?.weeks ?? [];
  const currentWeekData = weeks[currentWeek];
  const currentWeekDays = currentWeekData?.days ?? [];

  
  const noScheduleForMonth = !isLoading && (isError || !data?.data);

  useEffect(() => {
    setCurrentWeek(0);
  }, [selectedMonth]);

  const handleEdit = (schedule: ScheduleDay) => {
    setSelectedDay(schedule);
    setDialogOpen(true);
  };

  const handleCreateSchedule = () => {
    createSchedule({
      year: selectedMonth.year(),
      month: selectedMonth.month() + 1,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        my: 5,
        borderRadius: 1,
        bgcolor: theme.palette.background.default,
        width: "90%",
        justifySelf: "center",
        boxShadow: "0 2px 17px #9ed1d5",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "primary", fontWeight: 600, fontSize: 20, mb: 2 }}
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

      {noScheduleForMonth ? (
        
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No schedule has been created for {selectedMonth.format("MMMM YYYY")} yet.
          </Typography>

  {userRole === "doctor" && (
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            disabled={isCreating}
            onClick={handleCreateSchedule}
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            {isCreating ? "Creating..." : "Create Monthly Schedule"}
          </Button>
  )}
        </Box>
      ) : (
        <>
          <WeekNavigator
            currentWeek={currentWeek}
            totalWeeks={weeks.length}
            week={currentWeekData}
            onPrevious={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
            onNext={() =>
              setCurrentWeek((prev) => Math.min(prev + 1, weeks.length - 1))
            }
          />

          <Box sx={{ mt: 4 }}>
            <ScheduleTable
              week={currentWeekDays}
              loading={isLoading}
              onEdit={handleEdit}
            />
          </Box>
        </>
      )}

      {selectedDay && (
        <EditScheduleDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setSelectedDay(null);
          }}
          day={selectedDay}
          accountId={accountId}
        />
      )}
    </Paper>
  );
};

export default ScheduleSection;
// import { Box, Paper, Typography, useTheme } from "@mui/material";
// import { useEffect, useMemo, useState } from "react";
// import dayjs from "dayjs";
// import ScheduleHeader from "./SchedualeHeader";
// import { useGetSchedule } from "../../Hook/UseGetSchedule";
// import WeekNavigator from "./WeekNavigatog";
// import ScheduleTable from "./ScheduleTable";
// import { dummySchedule } from "./ScheduleDummy";
// import EditScheduleDialog from "./EditScheduleDialog";
// import { groupScheduleByDay, type ScheduleDayView } from "./ScheduleHelper";
// import { getMonthWeeks } from "./Appointment/AppointmentHelper";
// import type { ScheduleDay } from "../../Entities/WorkingSchedualeData";

// interface Props {
//     accountId: number;
// }

// const ScheduleSection = ({ accountId }: Props) => {

//     const theme = useTheme();
//     const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null);

//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [selectedMonth, setSelectedMonth] = useState(dayjs());

//     const [currentWeek, setCurrentWeek] = useState(0);

//     const data = {
//         data: dummySchedule,
//     };

//     const isLoading = false;

//     const handleEdit = (schedule: ScheduleDay) => {
//         setSelectedDay(schedule);
//         setDialogOpen(true);
//     };
//     // const { data, isLoading } = useGetSchedule(
//     //     accountId,
//     //     selectedMonth.month() + 1,
//     //     selectedMonth.year()
//     // );

//     const weeks = useMemo(() => getMonthWeeks(selectedMonth), [selectedMonth]);

//     useEffect(() => {
//         setCurrentWeek(0);
//     }, [selectedMonth]);

//     const currentWeekDates: string[] = weeks[currentWeek] ?? [];

//     const currentWeekSchedule = useMemo(
//         () => groupScheduleByDay(data.data, currentWeekDates),
//         [currentWeekDates, data.data]
//     );
//     return (

//         <Paper
//             elevation={3}
//             sx={{
//                 p: 3,
//                 my: 5,
//                 borderRadius: 1,
//                 bgcolor: theme.palette.background.default,
//                 width: '90%',
//                 justifySelf: 'center',
//                 boxShadow: "0 2px 17px #9ed1d5",

//             }}
//         >

//             <Typography
//                 variant="h5"
//                 sx={{
//                     color: "primary",
//                     fontWeight: 600,
//                     fontSize: 20,
//                     mb: 2
//                 }}
//             >
//                 Working Schedule
//             </Typography>

//             <ScheduleHeader
//                 selectedMonth={selectedMonth}
//                 onMonthChange={(month) => {
//                     setSelectedMonth(month);
//                     setCurrentWeek(0);
//                 }}
//             />

//          <WeekNavigator
//                 currentWeek={currentWeek}
//                 totalWeeks={weeks.length}
//                 currentWeekDates={currentWeekDates}
//                 onPrevious={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
//                 onNext={() => setCurrentWeek((prev) => Math.min(prev + 1, weeks.length - 1))}
//             />
//             <Box sx={{
//                 mt: 4
//             }}>


//                 <ScheduleTable
//                     week={currentWeekSchedule}
//                     loading={isLoading}
//                     onEdit={handleEdit}
//                 />

//             </Box>

//             {selectedDay && (

//                 <EditScheduleDialog
//                     open={dialogOpen}
//                     onClose={() => setDialogOpen(false)}
//                     day={selectedDay}
//                     accountId={accountId}
//                 />

//             )}

//         </Paper>

//     );

// };

// export default ScheduleSection;


import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import ScheduleHeader from "./SchedualeHeader";
import WeekNavigator from "./WeekNavigatog";
import ScheduleTable from "./ScheduleTable";
import EditScheduleDialog from "./EditScheduleDialog";

import { useGetSchedule } from "../../Hook/UseGetSchedule";

import type {
  ScheduleDay,
  ScheduleWeek,
} from "../../Entities/WorkingSchedualeData";

interface Props {
  accountId: number;
}

const ScheduleSection = ({ accountId }: Props) => {
  const theme = useTheme();

  const [selectedDay, setSelectedDay] =
    useState<ScheduleDay | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedMonth, setSelectedMonth] =
    useState(dayjs());

  const [currentWeek, setCurrentWeek] =
    useState(0);

  const {
    data,
    isLoading,
  } = useGetSchedule(
    accountId,
    selectedMonth.year(),
    selectedMonth.month() + 1
  );

  const weeks: ScheduleWeek[] =
    data?.data?.weeks ?? [];

  const currentWeekData =
    weeks[currentWeek];

  const currentWeekDays =
    currentWeekData?.days ?? [];

    console.log("ACCOUNT ID:", accountId);
console.log("SCHEDULE RESPONSE:", data);
console.log("SCHEDULE WEEKS:", data?.data?.weeks);
console.log("LOADING:", isLoading);  


  useEffect(() => {
    setCurrentWeek(0);
  }, [selectedMonth]);

  const handleEdit = (schedule: ScheduleDay) => {
    setSelectedDay(schedule);
    setDialogOpen(true);
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
        sx={{
          color: "primary",
          fontWeight: 600,
          fontSize: 20,
          mb: 2,
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
        week={currentWeekData}
        onPrevious={() =>
          setCurrentWeek((prev) =>
            Math.max(prev - 1, 0)
          )
        }
        onNext={() =>
          setCurrentWeek((prev) =>
            Math.min(
              prev + 1,
              weeks.length - 1
            )
          )
        }
      />

      <Box sx={{ mt: 4 }}>
        <ScheduleTable
          week={currentWeekDays}
          loading={isLoading}
          onEdit={handleEdit}
        />
      </Box>

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
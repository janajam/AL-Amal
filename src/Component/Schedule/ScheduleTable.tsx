import { Grid, Skeleton, Typography, useTheme } from "@mui/material";
import type { WorkingSchedule } from "../../Entities/AccountsData";
import DayCard from "./DayCard";

interface Props {
  week: WorkingSchedule[];
  loading: boolean;
  onEdit: (schedule: WorkingSchedule) => void;
}

const ScheduleTable = ({ loading, week, onEdit }: Props) => {
const theme = useTheme()
  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 3, md: 3, lg: 12 / 7 }}
          >
            <Skeleton
              variant="rounded"
              height={220}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!week.length) {
    return (
      <Typography
        sx={{
          align: "center",
          color: "text.secondary",
          py: 5
        }}
      >
        No schedule available for this week.
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={2}
    >
      {week.map((day) => (
        <Grid
          key={day.id}
          size={{ xs: 12, sm: 3, md: 3, lg: 12 / 6.6 }}
          >
          <DayCard
            key={day.id}
            day={day}
            onEdit={onEdit}
          />
        
        </Grid>
      ))}
    </Grid>
  );
};

export default ScheduleTable;
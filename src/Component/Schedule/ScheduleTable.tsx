import { Grid, Skeleton, Typography } from "@mui/material";
import type { WorkingSchedule } from "../../Entities/AccountsData";
import DayCard from "./DayCard";


interface Props {
  loading: boolean;
  week: WorkingSchedule[];
}

const ScheduleTable = ({ loading, week }: Props) => {

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4, lg: 12 / 7 }}
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
        align:"center",
        color:"text.secondary",
        py:5
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
          size={{ xs: 12, sm: 6, md: 4, lg: 12/6.6}}
        >
          <DayCard day={day} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ScheduleTable;
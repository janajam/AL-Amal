
// import { Grid, Skeleton, Typography } from "@mui/material";
// import DayCard from "./DayCard";
// import type { ScheduleDayView } from "./ScheduleHelper";
// import type { ScheduleDay } from "../../Entities/WorkingSchedualeData";

// interface Props {
//     week: ScheduleDay[];
//     loading: boolean;
//     onEdit: (schedule: ScheduleDay) => void;
// }

// const ScheduleTable = ({ loading, week, onEdit }: Props) => {

//     if (loading) {
//         return (
//             <Grid container spacing={2}>
//                 {Array.from({ length: 7 }).map((_, index) => (
//                     <Grid key={index} size={{ xs: 12, sm: 3, md: 3, lg: 12 / 7 }}>
//                         <Skeleton variant="rounded" height={220} />
//                     </Grid>
//                 ))}
//             </Grid>
//         );
//     }

//     if (!week.length) {
//         return (
//             <Typography sx={{ color: "text.secondary", py: 5, textAlign: "center" }}>
//                 No schedule available for this week.
//             </Typography>
//         );
//     }

//     return (
//         <Grid container spacing={2}>
//             {week.map((day) => (
//                 <Grid key={day.id} size={{ xs: 12, sm: 3, md: 3, lg: 12 / 6.6 }}>
//                     <DayCard day={day} onEdit={onEdit} />
//                 </Grid>
//             ))}
//         </Grid>
//     );
// };

// export default ScheduleTable;

import { Grid, Skeleton, Typography } from "@mui/material";
import DayCard from "./DayCard";
import type { ScheduleDay } from "../../Entities/WorkingSchedualeData";

interface Props {
  week: ScheduleDay[];
  loading: boolean;
  onEdit: (schedule: ScheduleDay) => void;
}

const ScheduleTable = ({ loading, week, onEdit }: Props) => {

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 3, md: 3, lg: 12 / 7 }}
          >
            <Skeleton variant="rounded" height={220} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!week.length) {
    return (
      <Typography
        sx={{
          color: "text.secondary",
          py: 5,
          textAlign: "center",
        }}
      >
        No schedule available for this week.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {week.map((day) => (
        <Grid
          key={day.id}
          size={{ xs: 12, sm: 3, md: 3, lg: 12 / 6.6 }}
        >
          <DayCard
            day={day}
            onEdit={onEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ScheduleTable;
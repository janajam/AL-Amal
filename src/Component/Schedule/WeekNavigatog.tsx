import {
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  Stack,
  Typography
} from "@mui/material";

import dayjs from "dayjs";
import type { WorkingSchedule } from "../../Entities/AccountsData";


interface Props {
  currentWeek: number;
  totalWeeks: number;
  currentWeekData: WorkingSchedule[];

  onPrevious: () => void;
  onNext: () => void;
}

const WeekNavigator = ({
  currentWeek,
  totalWeeks,
  currentWeekData,
  onPrevious,
  onNext,
}: Props) => {

  const firstDay =
    currentWeekData.length > 0
      ? dayjs(currentWeekData[0].date)
      : null;

  const lastDay =
    currentWeekData.length > 0
      ? dayjs(currentWeekData[currentWeekData.length - 1].date)
      : null;

  return (
    <Box
      sx={{
        my: 3
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <IconButton
          onClick={onPrevious}
          disabled={currentWeek === 0}
        >
          <ChevronLeft />
        </IconButton>

        <Stack
          sx={{
            alignItems: "center"
          }}
          spacing={0.5}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: 600,
              color: "primary"
            }}
          >
            Week {currentWeek + 1} of {totalWeeks}
          </Typography>

          {firstDay && lastDay && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {firstDay.format("DD MMM YYYY")} -{" "}
              {lastDay.format("DD MMM YYYY")}
            </Typography>
          )}
        </Stack>

        <IconButton
          onClick={onNext}
          disabled={currentWeek === totalWeeks - 1}
        >
          <ChevronRight />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default WeekNavigator;
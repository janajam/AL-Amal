
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import type { ScheduleWeek } from "../../Entities/WorkingSchedualeData";

interface Props {
    currentWeek: number;
    totalWeeks: number;

    week?: ScheduleWeek;

    currentWeekDates?: string[];

    onPrevious: () => void;
    onNext: () => void;
}

const WeekNavigator = ({
    currentWeek,
    totalWeeks,
    week,
    currentWeekDates,
    onPrevious,
    onNext,
}: Props) => {

    
    const dates =
        week?.days?.map((day) => day.date) ??
        currentWeekDates ??
        [];

    const firstDay = dates[0];
    const lastDay = dates[dates.length - 1];

    return (
        <Box sx={{ my: 3 }}>
            <Stack
                direction="row"
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >

                <IconButton
                    onClick={onPrevious}
                    disabled={currentWeek === 0}
                >
                    <ChevronLeft />
                </IconButton>

                <Stack
                    sx={{ alignItems: "center" }}
                    spacing={0.5}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            color: "primary",
                        }}
                    >
                        Week {currentWeek + 1} of {totalWeeks}
                    </Typography>

                    {firstDay && lastDay && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {dayjs(firstDay).format("DD MMM YYYY")} -{" "}
                            {dayjs(lastDay).format("DD MMM YYYY")}
                        </Typography>
                    )}
                </Stack>

                <IconButton
                    onClick={onNext}
                    disabled={
                        currentWeek === totalWeeks - 1
                    }
                >
                    <ChevronRight />
                </IconButton>

            </Stack>
        </Box>
    );
};

export default WeekNavigator;
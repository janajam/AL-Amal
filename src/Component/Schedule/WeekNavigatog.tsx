
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

interface Props {
    currentWeek: number;
    totalWeeks: number;
    currentWeekDates: string[]; 
    onPrevious: () => void;
    onNext: () => void;
}

const WeekNavigator = ({
    currentWeek,
    totalWeeks,
    currentWeekDates,
    onPrevious,
    onNext,
}: Props) => {

    const firstDay = currentWeekDates.length > 0 ? dayjs(currentWeekDates[0]) : null;
    const lastDay = currentWeekDates.length > 0
        ? dayjs(currentWeekDates[currentWeekDates.length - 1])
        : null;

    return (
        <Box sx={{ my: 3 }}>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <IconButton onClick={onPrevious} disabled={currentWeek === 0}>
                    <ChevronLeft />
                </IconButton>

                <Stack sx={{ alignItems: "center" }} spacing={0.5}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: "primary" }}>
                        Week {currentWeek + 1} of {totalWeeks}
                    </Typography>

                    {firstDay && lastDay && (
                        <Typography variant="body2" color="text.secondary">
                            {firstDay.format("DD MMM YYYY")} - {lastDay.format("DD MMM YYYY")}
                        </Typography>
                    )}
                </Stack>

                <IconButton onClick={onNext} disabled={currentWeek === totalWeeks - 1}>
                    <ChevronRight />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default WeekNavigator;
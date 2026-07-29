import dayjs, { type Dayjs } from "dayjs";
import { Grow } from "@mui/material";
import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

import {
    CalendarMonthRounded,
    CheckRounded,
    ChevronLeftRounded,
    ChevronRightRounded,
} from "@mui/icons-material";

interface Props {
    currentDate: Dayjs;
    appointmentsCount?: number;

    onPreviousMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
    onOpenMonthPicker: () => void;
}

const ScheduleHeader = ({
    currentDate,
    appointmentsCount = 0,
    onPreviousMonth,
    onNextMonth,
    onToday,
    onOpenMonthPicker,
}: Props) => {

    const theme = useTheme();

    const isCurrentMonth = currentDate.isSame(dayjs(), "month");

    const weeksInMonth = Math.ceil(
        (currentDate.startOf("month").day() +
            currentDate.daysInMonth()) / 7
    );

    return (

        <Box
            sx={{
                width: "100%",
                mx: "auto",
                mt:1,
                mb: 4,
            }}
        >

            {/* Header */}

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: 'center',
                    [theme.breakpoints.down('md')]: {
                        alignItems: 'flex-start'
                    }
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main
                    }}
                >
                    Schedule
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant={
                            isCurrentMonth
                                ? "contained"
                                : "outlined"
                        }
                        startIcon={
                            isCurrentMonth
                                ? <CheckRounded />
                                : undefined
                        }
                        onClick={onToday}
                        sx={{
                            borderRadius: 10,
                            textTransform: "none",
                            px: 3,
                        }}
                    >
                        Today
                    </Button>

                    <IconButton
                        onClick={onOpenMonthPicker}
                        sx={{
                            color: theme.palette.primary.main,
                            transition: ".25s",
                            "&:hover": {
                                bgcolor: theme.palette.primary.dark,
                                transform: "scale(1.08)",
                            }
                        }}
                    >

                        <CalendarMonthRounded />

                    </IconButton>

                </Stack>

            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Month */}

            <Stack
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
                spacing={3}
            >

                <IconButton
                    onClick={onPreviousMonth}
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        transition: ".25s",
                        "&:hover": {
                            bgcolor: theme.palette.primary.dark,
                            transform: "scale(1.08)",
                        },
                    }}
                >

                    <ChevronLeftRounded />

                </IconButton>

                <Grow
                    in
                    timeout={250}
                    key={currentDate.format("MM-YYYY")}
                >

                    <Box
                        sx={{
                            minWidth: 260,
                            textAlign: "center",
                        }}
                    >

                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 700 }}
                        >

                            {currentDate.format("MMMM YYYY")}

                        </Typography>

                        <Box
                            sx={{
                                width: 80,
                                height: 4,
                                borderRadius: 5,
                                bgcolor: theme.palette.primary.main,
                                mx: "auto",
                                mt: 1.5,
                            }}
                        />

                        <Typography
                            sx={{
                                color: "text.secondary",
                                mt: 2

                            }}
                        >

                            Showing {weeksInMonth} Weeks

                            {" • "}

                            {appointmentsCount} Available Slots

                        </Typography>

                    </Box>

                </Grow>

                <IconButton
                    onClick={onNextMonth}
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        transition: ".25s",
                        "&:hover": {
                            bgcolor: theme.palette.primary.dark,
                            transform: "scale(1.08)",
                        },
                    }}
                >

                    <ChevronRightRounded />

                </IconButton>

            </Stack>

        </Box >

    );
};

export default ScheduleHeader;
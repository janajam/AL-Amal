import {
    Stack,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRight,
    CalendarMonth,
} from "@mui/icons-material";

import dayjs, { Dayjs } from "dayjs";

import {
    LocalizationProvider,
    DatePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
    selectedMonth: Dayjs;
    onMonthChange: (date: Dayjs) => void;
}

const ScheduleHeader = ({
    selectedMonth,
    onMonthChange,
}: Props) => {
    const theme = useTheme();

    const previousMonth = () => {
        onMonthChange(selectedMonth.subtract(1, "month"));
    };

    const nextMonth = () => {
        onMonthChange(selectedMonth.add(1, "month"));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    mb: 3,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",

                }}
            >
                {/* Left Side */}

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                >
                    <IconButton
                     sx={{  
                          color:theme.palette.primary.main
                        }}
                        onClick={previousMonth}
                    >
                        <ChevronLeft />
                    </IconButton>

                    <Typography
                           sx={{
                            minWidth: 180,
                            textAlign: "center",
                            fontWeight: 600,
                            color: theme.palette.primary.main

                        }}
                    >
                        {selectedMonth.format("MMMM YYYY")}
                    </Typography>

                    <IconButton
                         sx={{  
                          color:theme.palette.primary.main
                        }}
                        onClick={nextMonth}
                    >
                        <ChevronRight />
                    </IconButton>
                </Stack>

                {/* Right Side */}

                <DatePicker
                    views={["year", "month"]}
                    value={selectedMonth}
                    onChange={(newValue) => {
                        if (newValue) {
                            onMonthChange(newValue as Dayjs);
                        }
                    }}
                    slots={{
                        openPickerIcon: CalendarMonth,
                    }}
                    slotProps={{
                        textField: {
                            size: "small",
                            sx: {
                                width:184
                            },
                        },
                    }}
                />
            </Stack>
        </LocalizationProvider>
    );
};

export default ScheduleHeader;
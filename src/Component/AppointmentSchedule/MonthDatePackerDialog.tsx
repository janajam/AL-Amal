import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";

import {
    ChevronLeftRounded,
    ChevronRightRounded,
} from "@mui/icons-material";

interface Props {
    open: boolean;
    value: Dayjs;
    onClose: () => void;
    onChange: (date: Dayjs) => void;
}

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const MonthPickerDialog = ({
    open,
    value,
    onClose,
    onChange,
}: Props) => {

    const theme = useTheme();

    const [year, setYear] = useState(value.year());

    useEffect(() => {
        if (open) {
            setYear(value.year());
        }
    }, [open, value]);

    const currentMonth = dayjs();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>

                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                    >
                        Select Month
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                    >

                        <IconButton
                            onClick={() => setYear(prev => prev - 1)}
                        >
                            <ChevronLeftRounded />
                        </IconButton>

                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 20
                            }}
                        >
                            {year}
                        </Typography>

                        <IconButton
                            onClick={() => setYear(prev => prev + 1)}
                        >
                            <ChevronRightRounded />
                        </IconButton>

                    </Stack>

                </Stack>

            </DialogTitle>

            <DialogContent>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 2,
                        mt: 2,
                    }}
                >

                    {months.map((month, index) => {

                        const selected =
                            value.month() === index &&
                            value.year() === year;

                        const isCurrent =
                            currentMonth.month() === index &&
                            currentMonth.year() === year;

                        return (

                            <Button
                                key={month}
                                variant={
                                    selected
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => {

                                    onChange(
                                        dayjs()
                                            .year(year)
                                            .month(index)
                                    );

                                    onClose();

                                }}
                                sx={{
                                    height: 70,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontSize: 16,
                                    fontWeight: 600,

                                    borderColor: isCurrent
                                        ? theme.palette.success.main
                                        : undefined,

                                    color: isCurrent
                                        ? theme.palette.success.main
                                        : undefined,

                                    transition: ".25s",

                                    "&:hover": {
                                        transform: "translateY(-3px)",
                                    },
                                }}
                            >

                                {month}

                            </Button>

                        );

                    })}

                </Box>

            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 2,
                }}
            >

                <Button
                    onClick={() => {

                        onChange(dayjs());

                        onClose();

                    }}
                >
                    Today
                </Button>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

            </DialogActions>

        </Dialog>
    );
};

export default MonthPickerDialog;
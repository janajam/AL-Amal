
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import type { TimeSlot } from "../../../Entities/Appointment";
import TimeSlotCard from "./AppointmentCard";

interface Props {
    date: string;
    slots: TimeSlot[];

    onSlotClick?: (slot: TimeSlot) => void;
}

const AppointmentColumn = ({
    date,
    slots,
    onSlotClick,
}: Props) => {

    const theme = useTheme();
    const day = dayjs(date);

    return (
        <Box
            sx={{
                maxWidth: 190,
                minWidth:0,
                flexShrink: 0, 
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.default,
                overflow: "hidden",
                flexDirection: "column",
                transition: ".25s",
                "&:hover": { boxShadow: 3 },
            }}
        >
            <Box
                sx={{
                    py: 2,
                    px: 2,
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: theme.palette.primary.main
                    }}>
                    {day.format("dddd")}
                </Typography>

                <Typography variant="body2" sx={{ opacity: .9 }}>
                    {day.format("DD MMM YYYY")}
                </Typography>
            </Box>
            <Divider />

            <Stack
                spacing={2}
                sx={{
                    p: 2,
                    flex: 1,
                    minHeight: 270,
                    bgcolor: theme.palette.background.default,
                }}
            >
                {slots.length === 0 ? (
                    <Box sx={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Typography sx={{
                            fontSize: 16,
                            color: 'gray'
                        }}>
                            No slots available
                        </Typography>
                    </Box>
                ) : (
                    slots.map((slot) => (
                        <TimeSlotCard
                            key={slot.id}
                            slot={slot}
                            onClick={onSlotClick}
                        />
                    ))
                )}
            </Stack>
        </Box>
    );
};

export default AppointmentColumn;


import { AddCircleRounded, PersonOutlined } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Card,
    CardActionArea,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import type { TimeSlot } from "../../../Entities/Appointment";

interface Props {
    slot: TimeSlot;
    onClick?: (slot: TimeSlot) => void;
}

const statusColorMap: Record<TimeSlot["status"], string> = {
    Available: "etal.main",
    Booked: "primary.main",
    Completed: "secondary.main",
};

const TimeSlotCard = ({ slot, onClick }: Props) => {

    const theme = useTheme();
    const isAvailable = slot.status === "Available";

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 1,
                bgcolor: ` ${slot.status === 'Booked'
                    ? theme.palette.background.paper
                    : theme.palette.background.default}`,
                border: `1px solid ${slot.status === 'Completed'
                        ? theme.palette.secondary.main
                        : theme.palette.divider}`,
                transition: ".25s",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
            }}
        >
            <CardActionArea onClick={() => onClick?.(slot)} sx={{ p: 2 }}>
                <Stack spacing={1}>

                    {/* Time */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            alignItems: "center"
                        }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography
                            sx={{
                                fontWeight: 550,
                                fontSize: 14
                            }}>
                            {slot.startTime} - {slot.endTime}
                        </Typography>
                    </Stack>

                    {isAvailable ? (
                        // Available
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <AddCircleRounded fontSize="small" sx={{ 
                                color:theme.palette.etal.main
                             }} />
                            <Typography sx={{ fontWeight: 600, color:theme.palette.etal.main }}>
                                Available for booking
                            </Typography>
                        </Stack>
                    ) : (
                        //  (Booked / Finished / Cancelled)
                        <>
                            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                <PersonOutlined fontSize="small" color="action" />
                                <Typography sx={{ fontWeight: 600 }}>
                                    {slot.appointment?.patientName}
                                </Typography>
                            </Stack>

                            <Typography variant="body2" color="text.secondary">
                                {slot.appointment?.appointment.type}
                            </Typography>

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 13,
                                    color: statusColorMap[slot.status]
                                }}
                            >
                                {slot.status}
                            </Typography>
                        </>
                    )}

                </Stack>
            </CardActionArea>
        </Card>
    );
};

export default TimeSlotCard;
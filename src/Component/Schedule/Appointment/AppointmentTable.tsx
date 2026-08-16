
import { Stack } from "@mui/material";
import AppointmentColumn from "./AppointmentColumn";
import type { TimeSlot } from "../../../Entities/Appointment";

interface Props {
    week: string[];
    groupedSlots: Map<string, TimeSlot[]>;
    onSlotClick?: (slot: TimeSlot) => void;
}

const AppointmentTable = ({ week, groupedSlots, onSlotClick }: Props) => {
    return (
        <Stack
            direction="row"
            spacing={2.6}
            sx={{
                alignItems: "stretch",
                overflowX: "auto",
                pb: 1,
                width: "100%",
                maxWidth: '100%',
                minWidth: 0,
                "&::-webkit-scrollbar": { height: 8 },
                "&::-webkit-scrollbar-thumb": { borderRadius: 1 },
            }}
        >


            {week
                .filter(
                    (date) =>
                        (groupedSlots.get(date)?.length ?? 0) > 0
                )
                .map((date) => (

                    <AppointmentColumn
                        key={date}
                        date={date}
                        slots={groupedSlots.get(date)!}
                        onSlotClick={onSlotClick}
                    />

                ))}
        </Stack>
    );
};

export default AppointmentTable;


import { Box, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleGrid from './ScheduleGrid';
import ScheduleHeader from './ScheduleHeader';
import WeekNavigator from './WeekNavigator';
import MonthPickerDialog from './MonthDatePackerDialog';

const SchedulePage = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [openMonthPicker, setOpenMonthPicker] = useState(false);


    return (
        <div>
            <Box
                sx={{
                    width: "93%",
                    mx: "auto",
                    mt: 3,
                    mb: 4,
                    bgcolor: theme.palette.background.default,
                    justifySelf: "center",
                    borderRadius: 1,
                    p: 3,
                    boxShadow: "0 2px 17px #9ed1d5",

                }}
            >




                <ScheduleHeader
                    currentDate={currentDate}
                    appointmentsCount={23}
                    onPreviousMonth={() =>
                        setCurrentDate(prev => prev.subtract(1, "month"))
                    }
                    onNextMonth={() =>
                        setCurrentDate(prev => prev.add(1, "month"))
                    }
                    onToday={() =>
                        setCurrentDate(dayjs())
                    }
                    onOpenMonthPicker={() =>
                        setOpenMonthPicker(true)
                    }
                />

                <MonthPickerDialog
                    open={openMonthPicker}
                    value={currentDate}
                    onClose={() => setOpenMonthPicker(false)}
                    onChange={(date) => {
                        setCurrentDate(date);
                        setOpenMonthPicker(false);
                    }}
                />
                <WeekNavigator
                // currentDate={currentDate}
                // setCurrentDate={setCurrentDate}
                />

                <ScheduleGrid
                // currentDate={currentDate}
                />
            </Box>
        </div>
    )
}

export default SchedulePage

import {
  AccessTime,
  Edit
} from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  useTheme
} from "@mui/material";

import dayjs from "dayjs";
import type { ScheduleDay } from "../../Entities/WorkingSchedualeData";


interface Props {
  day: ScheduleDay;
  onEdit: (schedule: ScheduleDay) => void;
}

const DayCard = ({ day, onEdit }: Props) => {

  const theme = useTheme();
  const isWorkingDay = day.status === "work_day";

  return (
    <Card
      sx={{
        height: '90%',
        borderRadius: 1,
        transition: "0.3s",
        bgcolor: `${day.status === 'off_day'
          ? theme.palette.background.default
          : theme.palette.background.paper}`,
        border: 'none',
        width: 150,
        mx: 6,
        alignSelf: 'center',
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>

        {/* Header */}

        <Stack
          sx={{
            alignItems: "center",
          }}
        >

          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600
            }}
          >
            {day.day_name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {dayjs(day.date).format("DD MMM ")}
          </Typography>


        </Stack>

        <Divider sx={{ my: 2 }} />

        {isWorkingDay ? (

          <Stack spacing={1}>

            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center" }}
            >
              <AccessTime
                color="action"
                fontSize="small"
              />

              <Typography
                sx={{
                  fontWeight: 550,
                  fontSize: 14,
                }}
              >
                From:
              </Typography>

              <Typography>
                {day.start_time}
              </Typography>

            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center" }}
            >
              <AccessTime
                color="action"
                fontSize="small"
              />

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 550
                }}
              >
                To:
              </Typography>

              <Typography>
                {day.end_time}
              </Typography>

            </Stack>

          </Stack>

        ) : (

          <Box
            sx={{
              py: 2,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: 'gray'
              }}
            >
              OFF DAY
            </Typography>
          </Box>

        )}

        {/* Edit */}

        <Button
          fullWidth
          variant="contained"
          startIcon={<Edit />}
          sx={{
            my: 1,
            borderRadius: 1,
          }}
          onClick={() => onEdit(day)}
        >
          Edit
        </Button>

      </CardContent>
    </Card>
  );
};

export default DayCard;
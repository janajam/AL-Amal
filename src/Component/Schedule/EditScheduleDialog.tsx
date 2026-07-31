
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import {
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useUpdateSchedule } from "../../Hook/UseUpdateSchedule";
import type { ScheduleDayView } from "./ScheduleHelper";

interface Props {
  open: boolean;
  onClose: () => void;
  day: ScheduleDayView; 
  accountId: number;
}

const EditScheduleDialog = ({
  open,
  onClose,
  day,
  accountId,
}: Props) => {

  const { mutate: updateSchedule, isPending: isUpdating } =
    useUpdateSchedule(accountId);

  // const { mutate: createSchedule, isPending: isCreating } =
  //   useCreateSchedule(accountId);

  // const isPending = isUpdating || isCreating;

  // Local State

  const [available, setAvailable] = useState(false);

  const [startTime, setStartTime] = useState<Dayjs | null>(null);

  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  // Fill dialog whenever another day is selected

  useEffect(() => {
    if (!open) return;

    setAvailable(day.isAvailable);

    setStartTime(
      day.startTime ? dayjs(day.startTime, "HH:mm") : null
    );

    setEndTime(
      day.endTime ? dayjs(day.endTime, "HH:mm") : null
    );

  }, [day, open]);

  // Save

  const handleSave = () => {

    if (available && (!startTime || !endTime)) return;

    const payload = {
      startTime: available ? startTime!.format("HH:mm") : "",
      endTime: available ? endTime!.format("HH:mm") : "",
      isAvailable: available,
    };

    if (day.isPlaceholder || day.id === null) {

      // createSchedule(
      //   {
      //     date: day.date,
      //     ...payload,
      //   },
      //   {
      //     onSuccess: () => onClose(),
      //   }
      // );

    } else {

      updateSchedule(
        {
          scheduleId: day.id,
          data: payload,
        },
        {
          onSuccess: () => onClose(),
        }
      );

    }

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          sx={{
            fontSize: 17,
            fontWeight: 550,
          }}
        >
          {day.day}

          <Typography
            component="span"
            sx={{
              display: "block",
              fontSize: 13,
              fontWeight: 400,
              color: "text.secondary",
            }}
          >
            {dayjs(day.date).format("DD MMM YYYY")}
          </Typography>
        </DialogTitle>

        <DialogContent>

          <Stack spacing={3} sx={{ mt: 2 }}>

            <FormControlLabel
              label="Available"
              control={
                <Switch
                  checked={available}
                  onChange={(e) =>
                    setAvailable(e.target.checked)
                  }
                />
              }
            />

            <TimePicker
              label="Start Time"
              value={startTime}
              disabled={!available}
              onChange={(value) =>
                setStartTime(value as Dayjs | null)
              }
            />

            <TimePicker
              label="End Time"
              value={endTime}
              disabled={!available}
              onChange={(value) =>
                setEndTime(value as Dayjs | null)
              }
            />

          </Stack>

        </DialogContent>

        <DialogActions>

          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            // disabled={isPending}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>
    </LocalizationProvider>
  );
};

export default EditScheduleDialog;
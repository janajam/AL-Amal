
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import type { ScheduleDay, ScheduleStatus, UpdateScheduleRequest } from "../../Entities/WorkingSchedualeData";
import { useUpdateScheduleDay } from "../../Hook/UseUpdateScheduleDay";

interface Props {
  open: boolean;
  onClose: () => void;
  day: ScheduleDay; 
  accountId: number;
}

const EditScheduleDialog = ({
  open,
  onClose,
  day,
  accountId,
}: Props) => {

  const { mutate: updateSchedule, isPending: isUpdating } =
  useUpdateScheduleDay(
    accountId,
    dayjs(day.date).year(),
    dayjs(day.date).month() + 1
  );

  
  
const [status, setStatus] =  useState<ScheduleStatus>(day.status);

const [startTime, setStartTime] =  useState<Dayjs | null>(
    day.start_time
      ? dayjs(day.start_time, "HH:mm:ss")
      : null
  );

const [endTime, setEndTime] =
  useState<Dayjs | null>(
    day.end_time
      ? dayjs(day.end_time, "HH:mm:ss")
      : null
  );

   
  useEffect(() => {
  if (!open) return;

  setStatus(day.status);

  setStartTime(
    day.start_time
      ? dayjs(day.start_time, "HH:mm:ss")
      : null
  );

  setEndTime(
    day.end_time
      ? dayjs(day.end_time, "HH:mm:ss")
      : null
  );



}, [day, open]);

const handleSave = () => {
  if (
    status === "work_day" &&
    (!startTime || !endTime)
  ) {
    return;
  }

  const payload: UpdateScheduleRequest = {
    status,

    start_time:
      status === "work_day"
        ? startTime!.format("HH:mm")
        : null,

    end_time:
      status === "work_day"
        ? endTime!.format("HH:mm")
        : null,
  };

  updateSchedule(
    {
      dayId: day.id,
      data: payload,
    },
    {
      onSuccess: () => {
        onClose();
      },
    }
  );
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
          {day.day_name} -{" "}

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
                  checked={status === "work_day"}
                 onChange={(e) =>
    setStatus(
      e.target.checked
        ? "work_day"
        : "off_day"
    )
  }
                />
              }
            />

            <TimePicker
              label="Start Time"
              value={startTime}
              disabled={status!=='work_day'}
              onChange={(value) =>
                setStartTime(value as Dayjs | null)
              }
            />

            <TimePicker
              label="End Time"
              value={endTime}
                disabled={status!=='work_day'}
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
            disabled={isUpdating}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>
    </LocalizationProvider>
  );
};

export default EditScheduleDialog;
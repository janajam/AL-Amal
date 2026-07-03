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
} from "@mui/material";

import {
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { WorkingSchedule } from "../../Entities/AccountsData";
import { useUpdateSchedule } from "../../Hook/UseUpdateSchedule";

interface Props {
  open: boolean;
  onClose: () => void;
  day: WorkingSchedule;
  accountId: number;
}

const EditScheduleDialog = ({
  open,
  onClose,
  day,
  accountId,
}: Props) => {

  const { mutate: updateSchedule, isPending } =
    useUpdateSchedule(accountId);

  // Local State

  const [available, setAvailable] = useState(false);

  const [startTime, setStartTime] =useState<Dayjs | null>(null);

  const [endTime, setEndTime] =useState<Dayjs | null>(null);

  // Fill dialog whenever another day is selected

  useEffect(() => {
    if (!open) return;
    setAvailable(day.isAvailable);
   setStartTime(dayjs(day.startTime, "HH:mm"));
    setEndTime(dayjs(day.endTime, "HH:mm"));
  }, [day, open]);

  // Save

  const handleSave = () => {
    if (!startTime || !endTime) return;
    updateSchedule(
      {
        scheduleId: day.id,
        data: {
          startTime: startTime.format("HH:mm"),
          endTime: endTime.format("HH:mm"),
          isAvailable: available,
        },
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
            fontSize:17,
            fontWeight:550
         }}
        >
         {day.day}
        </DialogTitle>

        <DialogContent>

          <Stack spacing={3} sx={{mt:2}}>

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

          <Button
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isPending}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>
    </LocalizationProvider>
  );
};

export default EditScheduleDialog;
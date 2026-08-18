import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { XRayImage } from "../../../Entities/Patient";

import {
  editXRayImageSchema,
  type EditXRayImageInput,
} from "../../../Schema/EditXRayImageSchema";

import { useEditXRayImage } from "../../../Hook/UseEditXRayImage";

interface Props {
  open: boolean;
  img: XRayImage | null;
  patientId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditXRayImageDialog = ({
  open,
  img,
  patientId,
  onClose,
  onSuccess,
}: Props) => {
  const theme = useTheme();

  const editMutation = useEditXRayImage(
    img?.id ?? 0,
    patientId
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditXRayImageInput>({
    resolver: zodResolver(editXRayImageSchema),
    mode: "onChange",

    defaultValues: {
      doctor_name: "",
      image: undefined,
    },
  });

  const newImage = watch("image");

  const previewImage = newImage
    ? URL.createObjectURL(newImage)
    : img?.image;

  useEffect(() => {
    if (!img || !open) return;

    reset({
      doctor_name: img.doctor_name ?? "",
      image: undefined,
    });
  }, [img, open, reset]);

  const handleCancel = () => {
    reset();
    onClose();
  };

  const submitDialog = (data: EditXRayImageInput) => {
  console.log("========== EDIT XRAY ==========");
  console.log("Result ID:", img?.id);
  console.log("Patient ID:", patientId);
  console.log("Doctor:", data.doctor_name);
  console.log("Image:", data.image);

  if (!img?.id) {
    console.error("No XRay ID!");
    return;
  }

  editMutation.mutate(data, {
    onSuccess: (response) => {
      console.log(
        "XRAY UPDATE SUCCESS:",
        response
      );

      reset();
      onClose();
      onSuccess?.();
    },

    onError: (error) => {
      console.error(
        "XRAY UPDATE ERROR:",
        error
      );
    },
  });
};
  return (
    <Dialog
      open={open}
      onClose={
        editMutation.isPending
          ? undefined
          : onClose
      }
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.22)",
        },

        "& .MuiDialog-paper": {
          width: {
            xs: "99vw",
            sm: 520,
            md: 620,
          },
          maxWidth: "none",
          backgroundImage: "none",
          boxShadow: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 17,
          fontWeight: 700,
          color: theme.palette.primary.main,
        }}
      >
        Edit Radiology Image
      </DialogTitle>

      <DialogContent>
        <form
          onSubmit={handleSubmit(submitDialog)}
          id="edit-xray-form"
        >
          <Stack spacing={2} sx={{ mt: 1 }}>

            {/* Doctor */}
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 550,
              }}
            >
              Doctor Name
            </Typography>

            <TextField
              fullWidth
              {...register("doctor_name")}
              error={!!errors.doctor_name}
              helperText={
                errors.doctor_name?.message
              }
            />

            {/* Image */}
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 550,
              }}
            >
              Radiology Image
            </Typography>

            {previewImage && (
              <Box
                component="iframe"
                src={previewImage}
                sx={{
                  width: "100%",
                  height: 300,
                  border: 0,
                  borderRadius: 2,
                }}
              />
            )}

            <Button
              component="label"
              variant="outlined"
              sx={{
                width: "60%",
                alignSelf: "center",
              }}
            >
              Replace Image

              <input
                hidden
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (!file) return;

                  setValue(
                    "image",
                    file,
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  );
                }}
              />
            </Button>

            {newImage && (
              <Button
                color="error"
                variant="outlined"
                sx={{
                  width: "60%",
                  alignSelf: "center",
                }}
                onClick={() =>
                  setValue(
                    "image",
                    undefined
                  )
                }
              >
                Remove New Image
              </Button>
            )}

          </Stack>
        </form>
      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleCancel}
          disabled={editMutation.isPending}
          sx={{
            bgcolor:
              theme.palette.secondary.main,
            color:
              theme.palette.secondary.contrastText,
            width: 100,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="edit-xray-form"
          disabled={editMutation.isPending}
          startIcon={
            editMutation.isPending ? (
              <CircularProgress size={20} />
            ) : null
          }
          sx={{
            bgcolor:
              theme.palette.primary.main,
            color:
              theme.palette.primary.contrastText,
            width: 130,
          }}
        >
          {editMutation.isPending
            ? "Saving..."
            : "Save"}
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default EditXRayImageDialog;
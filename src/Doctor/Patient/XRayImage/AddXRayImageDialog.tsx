import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createXRayImageSchema,
  type AddXRayImageInput,
} from "../../../Schema/AddXRayImageSchema";

import { useEffect } from "react";

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
  useTheme,
} from "@mui/material";

import { useAddXRayImage } from "../../../Hook/UseCreateXRayImage";

interface Props {
  open: boolean;
  medicalRecordId: number;
  patientId: number;
  onClose: () => void;
}

const AddXRayImageDialog = ({
  open,
  medicalRecordId,
  patientId,
  onClose,
}: Props) => {
  const theme = useTheme();

  const addMutation = useAddXRayImage(
    medicalRecordId,
    patientId
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddXRayImageInput>({
    resolver: zodResolver(createXRayImageSchema),
    mode: "onChange",

    defaultValues: {
      type: "",
      description: "",
      doctor_name: "",
    },
  });

  const selectedImage = watch("image");

  // =========================
  // Image Preview
  // =========================

  const previewImage = selectedImage
    ? URL.createObjectURL(selectedImage)
    : "";

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // =========================
  // Image Change
  // =========================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // =========================
  // Reset
  // =========================

  const clearForm = () => {
    reset({
      type: "",
      description: "",
      doctor_name: "",
    });
  };

  // =========================
  // Cancel
  // =========================

  const handleCancel = () => {
    if (addMutation.isPending) return;

    clearForm();
    onClose();
  };

  // =========================
  // Submit
  // =========================

  const submitDialog = (
    data: AddXRayImageInput
  ) => {
    console.log("========== ADD XRAY ==========");
    console.log("Medical Record ID:", medicalRecordId);
    console.log("Patient ID:", patientId);
    console.log("Doctor:", data.doctor_name);
    console.log("Type:", data.type);
    console.log("Description:", data.description);
    console.log("Image:", data.image);

    addMutation.mutate(data, {
      onSuccess: (response) => {
        console.log(
          "XRAY CREATE SUCCESS:",
          response
        );

        clearForm();
        onClose();
      },

      onError: (error) => {
        console.error(
          "XRAY CREATE ERROR:",
          error
        );
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
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
        Add Radiology Image
      </DialogTitle>

      <DialogContent>
        <form
          onSubmit={handleSubmit(submitDialog)}
          id="add-xray-form"
        >
          <Stack spacing={2} sx={{ mt: 1 }}>

            {/* Doctor */}

            <TextField
              label="Doctor Name"
              fullWidth
              {...register("doctor_name")}
              error={!!errors.doctor_name}
              helperText={
                errors.doctor_name?.message
              }
            />

            {/* Type */}

            <TextField
              label="Image Type"
              fullWidth
              {...register("type")}
              error={!!errors.type}
              helperText={
                errors.type?.message
              }
            />

            {/* Description */}

            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              {...register("description")}
              error={!!errors.description}
              helperText={
                errors.description?.message
              }
            />

            {/* Preview */}

            {previewImage && (
              <Box
                component="img"
                src={previewImage}
                alt="X-Ray preview"
                sx={{
                  mt: 1,
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            )}

            {/* Upload */}

            <Button
              component="label"
              variant="outlined"
              sx={{
                width: "50%",
                alignSelf: "center",
              }}
            >
              Upload Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {errors.image && (
              <Box
                sx={{
                  color: "error.main",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                {errors.image.message}
              </Box>
            )}
          </Stack>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleCancel}
          disabled={addMutation.isPending}
          sx={{
            bgcolor:
              theme.palette.secondary.main,
            color:
              theme.palette.secondary.contrastText,
            width: 100,
            mx: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="add-xray-form"
          disabled={addMutation.isPending}
          startIcon={
            addMutation.isPending ? (
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
          {addMutation.isPending
            ? "Saving..."
            : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddXRayImageDialog;
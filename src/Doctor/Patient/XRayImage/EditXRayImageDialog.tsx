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
import { useEffect, useMemo } from "react";
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
      description: "",
      type: "",
      image: undefined,
    },
  });

  const newImage = watch("image");

  /*
   * إذا لم يختر المستخدم صورة جديدة
   * نعرض الصورة القديمة.
   *
   * إذا اختار صورة جديدة
   * نعرض الصورة الجديدة.
   */
  const previewImage = useMemo(() => {
    if (newImage) {
      return URL.createObjectURL(newImage);
    }

    return img?.image ?? "";
  }, [newImage, img?.image]);

  useEffect(() => {
    return () => {
      if (newImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [newImage, previewImage]);

  /*
   * عند فتح Dialog
   * تعبئة البيانات الحالية.
   */
  useEffect(() => {
    if (!img || !open) return;

    reset({
      doctor_name: img.doctor_name ?? "",
      description: img.description ?? "",
      type: img.type ?? "",
      image: undefined,
    });
  }, [img, open, reset]);

  /*
   * Cancel
   */
  const handleCancel = () => {
    if (editMutation.isPending) return;

    reset();
    onClose();
  };

  /*
   * Submit
   */
  const submitDialog = (
    data: EditXRayImageInput
  ) => {
    if (!img?.id) {
      console.error("No XRay result ID");
      return;
    }

    console.log("========== EDIT XRAY ==========");
    console.log("Result ID:", img.id);
    console.log("Patient ID:", patientId);
    console.log("Doctor:", data.doctor_name);
    console.log("Type:", data.type);
    console.log("Description:", data.description);
    console.log("Image:", data.image);

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
          : handleCancel
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
          id="edit-xray-form"
          onSubmit={handleSubmit(submitDialog)}
        >
          <Stack spacing={2} sx={{ mt: 1 }}>

            {/* Doctor Name */}

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

            {/* Image Type */}

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 550,
              }}
            >
              Image Type
            </Typography>

            <TextField
              fullWidth
              {...register("type")}
              error={!!errors.type}
              helperText={
                errors.type?.message
              }
            />

            {/* Description */}

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 550,
              }}
            >
              Description
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={3}
              {...register("description")}
              error={!!errors.description}
              helperText={
                errors.description?.message
              }
            />

            {/* Current / New Image */}

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
                title="Radiology Image"
                sx={{
                  width: "100%",
                  height: 300,
                  border: 0,
                  borderRadius: 2,
                }}
              />
            )}

            {/* Replace Image */}

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

                  setValue("image", file, {
                    shouldDirty: true,
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
              />
            </Button>

            {/* Remove Selected New Image */}

            {newImage && (
              <Button
                color="error"
                variant="outlined"
                sx={{
                  width: "60%",
                  alignSelf: "center",
                }}
                onClick={() => {
                  setValue(
                    "image",
                    undefined,
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  );
                }}
              >
                Remove New Image
              </Button>
            )}

            {/* Image Error */}

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
          disabled={editMutation.isPending}
          sx={{
            bgcolor:
              theme.palette.secondary.main,
            color:
              theme.palette.secondary
                .contrastText,
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
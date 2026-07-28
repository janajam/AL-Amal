import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createXRayImageSchema, type AddXRayImageInput } from "../../../Schema/AddXRayImageSchema";
import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, useTheme } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddXRayImageDialog = ({ open, onClose }: Props) => {

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddXRayImageInput>({
    resolver: zodResolver(createXRayImageSchema),
    mode: "onChange",
    defaultValues: {
      requestedBy: "",
      uploaded_by: "",
      type: "",
      description: "",
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setValue("image", file, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handleCancel = () => {
    reset();
    setImage(null);
    setPreview("");
    onClose();
  };

  const submitDialog = (data: AddXRayImageInput) => {

    console.log(data);
    /*
    {
      requestedBy
      uploaded_by
      type
      description
      image
    }
    */
    reset();
    setImage(null);
    setPreview("");
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.22)',
          },
          '& .MuiDialog-paper': {
            width: { xs: '99vw', sm: 520, md: 620 },
            maxWidth: 'none',
            backgroundImage: 'none',
            boxShadow: 'none',

          },
        }}
      >
        <DialogTitle sx={{
          fontSize: 17,
          fontWeight: 700,
          color: theme.palette.primary.main
        }}>
          Add Radilogy Image
        </DialogTitle>
        <DialogContent >
          <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
            <Stack spacing={2}>
              <TextField
                label="Doctor Name"
                fullWidth
                {...register("requestedBy")}
                error={!!errors.requestedBy}
                helperText={errors.requestedBy?.message}
              />

              <TextField
                label="Radiologist"
                fullWidth
                {...register("uploaded_by")}
                error={!!errors.uploaded_by}
                helperText={errors.uploaded_by?.message}
              />

              <TextField
                label="Image Type"
                fullWidth
                {...register("type")}
                error={!!errors.type}
                helperText={errors.type?.message}
              />

              <TextField
                label="Description"
                multiline
                rows={2}
                fullWidth
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              {preview && (

                <Box
                  component="img"
                  src={preview}
                  sx={{
                    mt: 2,
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />

              )}

              <Button
                component="label"
                variant="outlined"
              >
                Upload Image

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

            </Stack>
          </form>
        </DialogContent>

          <DialogActions>
                            <Button onClick={handleCancel}
                                sx={{
                                    bgcolor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                    width: 100,
                                    mx: 3
                                }}
        
                            >
        
                                Cancel
                            </Button>
                            <Button type="submit" form="subscription-form"
                                // disabled={editPlan.isPending}
                                // startIcon={
                                //     editPlan.isPending
                                //         ? <CircularProgress size={20} />
                                //         : null}
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    width: 130,
        
                                }}>
                                {/* {editPlan.isPending ? 'Sending...' : 'Send'} */}
                                save
                            </Button>
                        </DialogActions>
        
      </Dialog>

    </div>
  )
}

export default AddXRayImageDialog

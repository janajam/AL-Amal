import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, useTheme } from "@mui/material";
import type { XRayImage } from "../../../Entities/Patient"
import { useEffect, useState } from "react";
import { editXRayImageSchema, type EditXRayImageInput } from "../../../Schema/EditXRayImageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRounded } from "@mui/icons-material";


interface Props {
    open: boolean,
    img: XRayImage | null,
    onClose: () => void
}

const EditXRayImageDialog = ({ open, img, onClose }: Props) => {

    // const [newImage, setNewImage] = useState<File | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const theme = useTheme();

    const handelCancel = () => {
        reset()
        onClose()
    }

    
    const submitDialog = (data: EditXRayImageInput) => {

        console.log(data);
        onClose()
    }

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
            requestedBy: "",
            uploaded_by: "",
            type: "",
            description: "",

        },
    });

    const newImage = watch("image");

    const previewImage = newImage
        ? URL.createObjectURL(newImage)
        : img?.image;


    useEffect(() => {
        if (!img || !open) return;

        reset({
            requestedBy: img.requestedBy,
            uploaded_by: img.uploaded_by,
            type: img.type,
            description: img.description,
        });

        setValue("image", undefined as never);

    }, [img, open, reset, setValue]);

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
                    Edit Radilogy Image
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <Stack spacing={2}>

                            <Typography sx={{
                                fontSize: 16,
                                fontWeight: 550
                            }}>
                                Doctor Name
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                {...register("requestedBy")}
                                error={!!errors.requestedBy}
                                helperText={errors.requestedBy?.message}
                            />
                            <Typography sx={{
                                fontSize: 16,
                                fontWeight: 550
                            }}>
                                Radiologist Name
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                {...register("uploaded_by")}
                                error={!!errors.uploaded_by}
                                helperText={errors.uploaded_by?.message}
                            />
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    fontWeight: 550
                                }}>
                                Image Type
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                {...register("type")}
                                error={!!errors.type}
                                helperText={errors.type?.message}
                            />
                            <Typography
                                sx={{
                                    fontSize: 16,
                                    fontWeight: 550
                                }}>
                                Image Description
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                            {/* Image */}
                            <Box
                                component="img"
                                src={previewImage}
                                sx={{
                                    width: "86%",
                                    height: 330,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    alignSelf: "center",
                                }}
                            />
                            <Button
                                component="label"
                                variant="outlined"
                                sx={{ 
                                    width:'50%',
                                    alignSelf:'center'  
                                 }}
                            >
                                Replace Image

                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (!file) return;

                                        setValue("image", file, {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        });
                                    }}
                                />
                            </Button>
                            <Button
                             sx={{ 
                                    width:'50%',
                                    alignSelf:'center'
                             }}
                                color="error"
                                variant="outlined"
                                onClick={() => {
                                    setValue("image", undefined as never);
                                }}
                            >
                                Remove New Image
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelCancel}
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

export default EditXRayImageDialog

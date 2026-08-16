import { useEffect, useState } from "react";
import type { LabResult, TestResult } from "../../../Entities/Patient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTestResultSchema, type EditTestResultInput } from "../../../Schema/EditTestResultSchema";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";


interface Props {
    open: boolean,
    result: LabResult | null,
    medicalRecordId: number,
    onClose: () => void
}


const EditTestResultDialog = ({ open, result, onClose ,medicalRecordId}: Props) => {
    const [removeOldFile, setRemoveOldFile] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const theme = useTheme();


    const handelCancel = () => {
        reset()
        onClose()
    }

    const submitDialog = (data: EditTestResultInput) => {

        console.log(data);

        /*
        {
            doctor_name,
            tecnical,
            title,
            result,
            attachment // File | undefined
        }
        */

        onClose();
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EditTestResultInput>({
        resolver: zodResolver(editTestResultSchema),
        mode: "onChange",
        defaultValues: {
            doctor_name: "",
            tecnical: "",
            title: "",
            result: "",
        },
    });

    useEffect(() => {
        if (!open || !result) return;

        reset({
            doctor_name: result.doctor_name,
            tecnical: result.tecnical,
            title: result.title,
            result: result.result,
        });

        setSelectedFile(null);
        setRemoveOldFile(false);

    }, [open, result, reset]);

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(selectedFile);

        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);

    }, [selectedFile]);

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
                    Edit Test Result
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <Stack spacing={2}>
                            <Typography sx={{
                                fontSize: 16,
                                fontWeight: 550
                            }}>
                                Result Description
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                {...register("result")}
                                error={!!errors.result}
                                helperText={errors.result?.message}
                            />

                            <Typography sx={{
                                fontSize: 16,
                                fontWeight: 550
                            }}>
                                Doctor Name
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                {...register("doctor_name")}
                                error={!!errors.doctor_name}
                                helperText={errors.doctor_name?.message}
                            />
                            <Typography sx={{
                                fontSize: 16,
                                fontWeight: 550
                            }}>
                                Laboratory Technician
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                {...register("tecnical")}
                                error={!!errors.tecnical}
                                helperText={errors.tecnical?.message}
                            />
                            <Stack spacing={3}
                                sx={{ mt: 2 }}>
                                <Stack direction={'row'} spacing={3}>
                                    <Typography
                                        sx={{ fontWeight: 600 }}
                                    >

                                        Current Report
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => {
                                            setRemoveOldFile(true);
                                        }}
                                    >
                                        Remove Current File
                                    </Button>
                                </Stack>
                                {!removeOldFile && result?.attachment && (
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                        }}
                                    >

                                        <Stack
                                            direction="row"
                                            sx={{
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}
                                        >

                                            <Stack spacing={0.5}>
                                                <Typography
                                                    sx={{ fontWeight: 600 }}>
                                                    {result?.title}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    PDF Document
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" spacing={1}>

                                                <Button
                                                    variant="outlined"
                                                    href={result?.attachment}
                                                    target="_blank"
                                                >
                                                    Preview
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    href={result?.attachment}
                                                    download
                                                >
                                                    Download
                                                </Button>

                                            </Stack>
                                        </Stack>


                                    </Paper>
                                )}
                            </Stack>
                            <Divider />
                            <Button
                                component="label"
                                variant="outlined"
                            >

                                Upload New PDF

                                <input
                                    hidden
                                    type="file"
                                    accept="application/pdf"

                                    onChange={(e) => {

                                        const file = e.target.files?.[0];

                                        if (!file) return;

                                        setSelectedFile(file);

                                        setValue("attachment", file);

                                    }}

                                />

                            </Button>
                            {selectedFile && (

                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                    }}
                                >

                                    <Stack
                                        direction="row"
                                        sx={{
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >

                                        <Box>

                                            <Typography
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {selectedFile.name}
                                            </Typography>

                                            <Typography variant="body2">
                                                New PDF
                                            </Typography>

                                        </Box>

                                        <Stack direction="row" spacing={1}>

                                            <Button
                                                variant="outlined"
                                                href={previewUrl}
                                                target="_blank"
                                            >
                                                Preview
                                            </Button>

                                            <Button
                                                color="error"
                                                variant="outlined"
                                                onClick={() => {
                                                    setSelectedFile(null);
                                                    setValue("attachment", undefined);
                                                }}
                                            >
                                                Remove
                                            </Button>

                                        </Stack>

                                    </Stack>

                                </Paper>

                            )}

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

export default EditTestResultDialog

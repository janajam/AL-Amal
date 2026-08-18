import { useForm } from "react-hook-form";
import { createTestResultSchema, type AddTestResultInput } from "../../../Schema/AddTestResultSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, useTheme } from "@mui/material";
import { PictureAsPdfRounded } from "@mui/icons-material";
import useCreateLabResult from "../../../Hook/UseAddLabResult";
import { getLabAttachmentUrl } from "../../Helper";


interface Props {
    open: boolean;
    onClose: () => void;
    medicalRecordId: number;
    patientId: number;
}

const AddTestResultDialog = ({ open, onClose, patientId, medicalRecordId }: Props) => {
    const theme = useTheme()
    const { mutate: createResult, isPending } = useCreateLabResult(patientId)


    const submitDialog = (data: AddTestResultInput) => {

        const formData = new FormData();

        formData.append(
            "medical_diagnosis",
            data.medical_diagnosis
        );

        formData.append(
            "medical_record_id",
            String(data.medical_record_id)
        );

        formData.append(
            "title",
            data.title
        );
        formData.append(
            'doctor_name',
            data.doctor_name
        ),
            formData.append(
                "result",
                data.result
            );

        if (data.attachment) {
            formData.append(
                "attachment",
                data.attachment
            );
        }

        createResult(formData, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    }; const handelCancel = () => {
        reset()
        onClose()
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;
        if (file.type !== "application/pdf") {
            return;
        }
        setValue("attachment", file, {
            shouldValidate: true
        });

    };



    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AddTestResultInput>({
        resolver: zodResolver(createTestResultSchema),

        defaultValues: {
            medical_diagnosis: "",
            medical_record_id: medicalRecordId,
            title: "",
            result: "",
            doctor_name: ''
        },
    });
    const removeAttachment = () => {

        setValue("attachment", undefined, {
            shouldValidate: true
        });

    };
    const attachment = watch("attachment");

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
                    Add Test Result
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <Stack spacing={2}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label='Test Title'
                                fullWidth
                                variant="outlined"
                                {...register('title')}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="medication"
                                label='medical_diagnosis'
                                fullWidth
                                variant="outlined"
                                {...register('medical_diagnosis')}
                                error={!!errors.medical_diagnosis}
                                helperText={errors.medical_diagnosis?.message}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="result"
                                label='Result Description '
                                fullWidth
                                variant="outlined"
                                {...register('result')}
                                error={!!errors.result}
                                helperText={errors.result?.message}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id=""
                                label='doctorName '
                                fullWidth
                                variant="outlined"
                                {...register('doctor_name')}
                                error={!!errors.doctor_name}
                                helperText={errors.doctor_name?.message}
                            />


                            <Stack spacing={2}
                                sx={{ mt: 3 }}
                            >

                                <Button
                                    variant="outlined"
                                    component="label"
                                >
                                    Upload PDF

                                    <input
                                        hidden
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />

                                </Button>

                                {attachment && (

                                    <Card
                                        variant="outlined"
                                        sx={{ p: 2 }}
                                    >
                                        <Stack direction="row" spacing={1}> <PictureAsPdfRounded />
                                            <Typography>

                                                {attachment.name}

                                            </Typography>
                                        </Stack>

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            sx={{
                                                mt: 2
                                            }}
                                        >

                                            <Button
                                                variant="outlined"
                                                href={URL.createObjectURL(attachment)}
                                                target="_blank"

                                                rel="noopener noreferrer"
                                                component="a"
                                            >
                                                Preview
                                            </Button>

                                            <Button
                                                color="error"
                                                onClick={removeAttachment}
                                            >
                                                Remove
                                            </Button>

                                        </Stack>

                                    </Card>

                                )}

                            </Stack>
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
                        disabled={isPending}
                        startIcon={
                            isPending
                                ? <CircularProgress size={20} />
                                : null}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,

                        }}>
                        {isPending ? 'Sending...' : 'Send'}

                    </Button>
                </DialogActions>

            </Dialog>

        </div>
    )
}

export default AddTestResultDialog

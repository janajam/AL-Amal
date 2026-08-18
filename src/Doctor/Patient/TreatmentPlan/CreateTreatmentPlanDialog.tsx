

import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, Stack, TextField, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { createTreatmentPlanSchema, type CreateTreatmentPlanInput } from "../../../Schema/CreateTreatmentPlaneSchema"
import { AddRounded, DeleteOutlineRounded } from "@mui/icons-material"
import { useCreateTreatmentPlan } from "../../../Hook/UseCreateTreatmentPlane"

interface Props {
    open: boolean,
    patientId: number,
    medicalRecordId: number,
    onClose: () => void
}

const CreateTreatmentPlanDialog = ({ open, patientId,medicalRecordId, onClose }: Props) => {
    const theme = useTheme()
    const { mutate: createTreatmentPlan, isPending } = useCreateTreatmentPlan(medicalRecordId, patientId)

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<CreateTreatmentPlanInput>({
        resolver: zodResolver(createTreatmentPlanSchema),
        defaultValues: {
            medical_diagnosis: "",
            steps: [""],
        },
    });

    const treatmentSteps = watch("steps");

    const submitDialog = (data: CreateTreatmentPlanInput) => {
        createTreatmentPlan(data, {
            onSuccess: (response) => {
                setSnackbar({
                    open: true,
                    message: response.message,
                    severity: "success",
                });
                reset();
                onClose();
            },
            onError: (error: any) => {
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message ?? "حدث خطأ أثناء إنشاء الخطة",
                    severity: "error",
                });
            },
        });
    };

    const handelCancel = () => {
        reset()
        onClose()
    }

    const addStep = () => {
        setValue("steps", [...treatmentSteps, ""]);
    };

    const removeStep = (index: number) => {
        if (treatmentSteps.length === 1) return;
        setValue("steps", treatmentSteps.filter((_, i) => i !== index));
    };

    const updateStep = (index: number, value: string) => {
        const updated = [...treatmentSteps];
        updated[index] = value;
        setValue("steps", updated, { shouldValidate: true });
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.22)' },
                    '& .MuiDialog-paper': {
                        width: { xs: '99vw', sm: 520, md: 620 },
                        maxWidth: 'none',
                        backgroundImage: 'none',
                        boxShadow: 'none',
                    },
                }}
            >
                <DialogTitle sx={{ fontSize: 17, fontWeight: 700, color: theme.palette.primary.main }}>
                    Create New Plan
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(submitDialog)} id="create-plan-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="medicalDiagnosis"
                            label='Medical Diagnosis'
                            fullWidth
                            variant="outlined"
                            {...register('medical_diagnosis')}
                            error={!!errors.medical_diagnosis}
                            helperText={errors.medical_diagnosis?.message}
                        />

                        <Typography sx={{ mt: 3, mb: 1, fontWeight: 700 }}>
                            Treatment Steps
                        </Typography>

                        {treatmentSteps.map((step, index) => (
                            <Stack key={index} direction="row" spacing={2} sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label={`Step ${index + 1}`}
                                    value={step}
                                    error={!!errors.steps?.[index]}
                                    helperText={errors.steps?.[index]?.message}
                                    onChange={(e) => updateStep(index, e.target.value)}
                                />
                                <IconButton
                                    color="error"
                                    disabled={treatmentSteps.length === 1}
                                    onClick={() => removeStep(index)}
                                >
                                    <DeleteOutlineRounded />
                                </IconButton>
                            </Stack>
                        ))}

                        <Button startIcon={<AddRounded />} onClick={addStep} sx={{ mt: 1, alignSelf: "flex-start" }}>
                            Add Step
                        </Button>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handelCancel}
                        disabled={isPending}
                        sx={{
                            bgcolor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                            width: 100,
                            mx: 3
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="create-plan-form"
                        disabled={isPending}
                        startIcon={isPending ? <CircularProgress size={20} /> : null}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,
                        }}
                    >
                        {isPending ? 'Creating...' : 'create'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    )
}

export default CreateTreatmentPlanDialog
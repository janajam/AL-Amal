
import { zodResolver } from '@hookform/resolvers/zod';
import { Delete } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { TreatmentPlan, TreatmentPlanPayload } from '../../../Entities/Patient';
import { editTreatmentPlanSchema, type EditTreatmentPlanInput } from '../../../Schema/EditTreatmentPlane';
import { useEditTreatmentPlan } from '../../../Hook/UseEditTreatmentPlan';
interface Props {
    open: boolean,
    plan: TreatmentPlanPayload | null,
    patientId: number,
    medicalRecordId: number,
    onClose: () => void
}

const EditTreatmentPlanDialog = ({ open, plan, patientId, medicalRecordId, onClose }: Props) => {

    const theme = useTheme()
    const { mutate: editPlan, isPending } = useEditTreatmentPlan(plan?.id ?? 0, medicalRecordId, patientId)
  
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const submitDialog = (formData: EditTreatmentPlanInput) => {
        editPlan(formData, {
            onSuccess: (response) => {
                setSnackbar({
                    open: true,
                    message: response.message,
                    severity: "success",
                });
                onClose();
            },
            onError: (error: any) => {
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message ?? 'some things wrong',
                    severity: "error",
                });}
        });
    }
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm<EditTreatmentPlanInput>({
        resolver: zodResolver(editTreatmentPlanSchema),
        defaultValues: {
            medical_diagnosis: '',
            status: 'ongoing',
            steps: []
        }
    })


  useEffect(() => {
        if (plan && open) {
            reset({
                medical_diagnosis: plan.medical_diagnosis,
                steps: plan.steps.map((s) => s.instruction) ?? [],
                status: plan.status === 'ongoing' ? 'ongoing' : 'finished',
            });
        }
    }, [plan, open, reset]);

    
const handelCancel=()=>{
        reset()
        onClose()
    }

    const steps = watch("steps");
    const status = watch("status");
    const medicalDiagnosis = watch("medical_diagnosis");
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
                    Edit Treatment Plan
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <FormControl sx={{ mt: 1 }}>

                            <RadioGroup
                                row
                                value={status}
                                onChange={(e) => {

                                    setValue(
                                        "status",
                                        e.target.value as "ongoing" | "finished",
                                        {
                                            shouldValidate: true
                                        }
                                    );

                                }}
                            >

                                <FormControlLabel
                                    value="ongoing"
                                    control={<Radio />}
                                    label="Ongoing"
                                />

                                <FormControlLabel
                                    value="finished"
                                    control={<Radio />}
                                    label="Finished"
                                />

                            </RadioGroup>

                        </FormControl>
                        <Typography sx={{
                            fontSize: 16,
                            fontWeight: 550
                        }}>
                            Medical Diagnosis
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            {...register("medical_diagnosis")}
                            error={!!errors.medical_diagnosis}
                            helperText={errors.medical_diagnosis?.message}
                        />
                        <Typography
                            sx={{
                                mt: 3,
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            Treatment Steps
                        </Typography>

                        {steps.map((step, index) => (

                            <Stack
                                key={index}
                                direction="row"
                                spacing={1}
                                sx={{ mt: 1 }}
                            >

                                <TextField
                                    fullWidth
                                    value={step}
                                    onChange={(e) => {

                                        const updated = [...steps];
                                        updated[index] = e.target.value;

                                        setValue(
                                            "steps",
                                            updated,
                                            {
                                                shouldValidate: true
                                            }
                                        );

                                    }}
                                />

                                <IconButton
                                    color="error"
                                    onClick={() => {

                                        const updated = steps.filter(
                                            (_, i) => i !== index
                                        );

                                        setValue(
                                            "steps",
                                            updated,
                                            {
                                                shouldValidate: true
                                            }
                                        );

                                    }}
                                >
                                    <Delete />
                                </IconButton>

                            </Stack>

                        ))}

                        <Button
                            sx={{ mt: 2 }}
                            onClick={() => {

                                setValue(
                                    "steps",
                                    [...steps, ""],
                                    {
                                        shouldValidate: true
                                    }
                                );

                            }}
                        >
                            + Add Step
                        </Button>
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

export default EditTreatmentPlanDialog


import { zodResolver } from '@hookform/resolvers/zod';
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { TreatmentPlan } from '../../../Entities/Patient';
import { editTreatmentPlanSchema, type EditTreatmentPlanInput } from '../../../Schema/EditTreatmentPlane';
interface Props {
    open: boolean,
    plan: TreatmentPlan | null,
    onClose: () => void
}

const EditTreatmentPlanDialog = ({ open, plan, onClose }: Props) => {

    const theme = useTheme()

    // const editPlan=useEditPlan(plan?.id|| 0)

    const submitDialog = (formData: EditTreatmentPlanInput) => {
        // editPlan.mutate(formData)
        onClose()
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
            medicalDiagnosis: '',
            status: 'Ongoing',
            treatmentSteps: []
        }
    })


    useEffect(() => {

        if (plan && open) {

            reset({
                medicalDiagnosis: plan.medicalDiagnosis,
                treatmentSteps: plan.treatmentSteps ?? [],
                status: plan.status,
            });
        }

    }, [plan, open, reset]);


    const treatmentSteps = watch("treatmentSteps");

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
                    Edit Treatment Plane
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <FormControl sx={{ mt: 1 }}>

                            <RadioGroup
                                row
                                value={watch("status")}
                                onChange={(e) => {

                                    setValue(
                                        "status",
                                        e.target.value as "Ongoing" | "Finished",
                                        {
                                            shouldValidate: true
                                        }
                                    );

                                }}
                            >

                                <FormControlLabel
                                    value="Ongoing"
                                    control={<Radio />}
                                    label="Ongoing"
                                />

                                <FormControlLabel
                                    value="Finished"
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
                            {...register("medicalDiagnosis")}
                            error={!!errors.medicalDiagnosis}
                            helperText={errors.medicalDiagnosis?.message}
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

                        {treatmentSteps.map((step, index) => (

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

                                        const updated = [...treatmentSteps];
                                        updated[index] = e.target.value;

                                        setValue(
                                            "treatmentSteps",
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

                                        const updated = treatmentSteps.filter(
                                            (_, i) => i !== index
                                        );

                                        setValue(
                                            "treatmentSteps",
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
                                    "treatmentSteps",
                                    [...treatmentSteps, ""],
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
                    <Button onClick={onClose}
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

export default EditTreatmentPlanDialog

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material"
import { useForm } from "react-hook-form"
import { createTreatmentPlanSchema, type CreateTreatmentPlanInput } from "../../../Schema/CreateTreatmentPlaneSchema"
import { AddRounded, DeleteOutlineRounded } from "@mui/icons-material"
import { useAuthStore } from "../../../Store/AuthStore"

interface Props {
    open: boolean,
    onClose: () => void
}


const CreateTreatmentPlanDialog = ({ open, onClose }: Props) => {
    const theme = useTheme()
    const { fullName } = useAuthStore();

    const submitDialog = (data: CreateTreatmentPlanInput) => {

        const payload: CreateTreatmentPlanInput = {

            medicalDiagnosis: data.medicalDiagnosis,

            treatmentSteps: data.treatmentSteps.filter(
                step => step.trim() !== ""
            ),

            doctorName: fullName || "Dr.Ahmad",

            status: "Ongoing",

            date: new Date(),
        };

        // createTreatmentPlan.mutate(payload);

    };

    const handelCancel = () => {
        reset()
        onClose()
    }

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
            medicalDiagnosis: "",
            treatmentSteps: [""],
        },
    });
    const treatmentSteps = watch("treatmentSteps");

    const addStep = () => {
        setValue("treatmentSteps", [
            ...treatmentSteps,
            "",
        ]);
    };


    const removeStep = (index: number) => {

        if (treatmentSteps.length === 1) return;

        setValue(
            "treatmentSteps",
            treatmentSteps.filter((_, i) => i !== index)
        );
    };

    const updateStep = (
        index: number,
        value: string
    ) => {

        const updated = [...treatmentSteps];
        updated[index] = value;
        setValue(
            "treatmentSteps",
            updated,
            {
                shouldValidate: true,
            }
        );
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
                    Create New Plan
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="medicalDiagnosis"
                            label='Medical Diagnosis'
                            fullWidth
                            variant="outlined"
                            {...register('medicalDiagnosis')}
                            error={!!errors.medicalDiagnosis}
                            helperText={errors.medicalDiagnosis?.message}
                        />

                        <Typography
                            sx={{
                                mt: 3,
                                mb: 1,
                                fontWeight: 700
                            }}
                        >
                            Treatment Steps
                        </Typography>

                        {treatmentSteps.map((step, index) => (

                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{ mb: 2 }}
                            >

                                <TextField
                                    fullWidth
                                    label={`Step ${index + 1}`}
                                    value={step}
                                    error={!!errors.treatmentSteps?.[index]}
                                    helperText={errors.treatmentSteps?.[index]?.message}

                                    onChange={(e) =>
                                        updateStep(index, e.target.value)
                                    }
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
                        <Button
                            startIcon={<AddRounded />}
                            onClick={addStep}
                            sx={{
                                mt: 1,
                                alignSelf: "flex-start",
                            }}
                        >
                            Add Step
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
                        // disabled={createOffer.isPending}
                        // startIcon={
                        //     createOffer.isPending
                        //         ? <CircularProgress size={20} />
                        //         : null}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,

                        }}>
                        create    {/* {createOffer.isPending ? 'Creating...' : 'Create'} */}

                    </Button>

                </DialogActions>

            </Dialog>
        </div>
    )
}

export default CreateTreatmentPlanDialog

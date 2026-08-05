import { zodResolver } from "@hookform/resolvers/zod"
import { AddRounded, DeleteOutlineRounded } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material"
import { useForm } from "react-hook-form"
import { editMedicalRecordSchema, type EditMedicalRecordInput } from "../../../Schema/EditMedicalRecordSchema"

interface Props {
    open: boolean,
    onClose: () => void
}


const CreateMedicalRecordDialog = ({ open, onClose }: Props) => {
    const theme = useTheme()
    const submitDialog = (data: EditMedicalRecordInput) => {

        const payload: EditMedicalRecordInput = {

            sickness: data.sickness.filter(
                sickness => sickness.trim() !== ""
            ),
            allergies: data.allergies.filter(
                allergy => allergy.trim() !== ''
            ),
            longTermMedication: data.longTermMedication.filter(
                medication => medication.trim() !== ''
            ),
            operations: data.operations.filter(
                operation => operation.trim() !== ''
            ),

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
    } = useForm<EditMedicalRecordInput>({
        resolver: zodResolver(editMedicalRecordSchema),
        defaultValues: {
            sickness: [''],
            allergies: [''],
            longTermMedication: [''],
            operations: ['']

        },
    });
    const sickness = watch("sickness");
    const allergies = watch("allergies");
    const longTermMedication = watch("longTermMedication");
    const operations = watch("operations");

    const addSickness = () => {
        setValue("sickness", [
            ...sickness,
            "",
        ]);
    };

    const addAllergy = () => {
        setValue("allergies", [
            ...allergies,
            "",
        ]);
    };

    const addLongTermMedication = () => {
        setValue("longTermMedication", [
            ...longTermMedication,
            "",
        ]);
    };

    const addOperation = () => {
        setValue("operations", [
            ...operations,
            "",
        ]);
    };

    const removeSickness = (index: number) => {

        if (sickness.length === 1) return;

        setValue(
            "sickness",
            sickness.filter((_, i) => i !== index)
        );
    };

    const removeAllergy = (index: number) => {
        if (allergies.length === 1) return;
        setValue(
            "allergies",
            allergies.filter((_, i) => i !== index),
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };

    const removeLongTermMedication = (index: number) => {

        if (longTermMedication.length === 1) return;

        setValue(
            "longTermMedication",
            longTermMedication.filter((_, i) => i !== index),
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };

    const removeOperation = (index: number) => {

        if (operations.length === 1) return;

        setValue(
            "operations",
            operations.filter((_, i) => i !== index),
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };
    const updateSickness = (
        index: number,
        value: string
    ) => {

        const updated = [...sickness];
        updated[index] = value;
        setValue(
            "sickness",
            updated,
            {
                shouldValidate: true,
            }
        );
    };

    const updateAllergy = (
        index: number,
        value: string
    ) => {

        const updated = [...allergies];

        updated[index] = value;

        setValue(
            "allergies",
            updated,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };

    const updateLongTermMedication = (
        index: number,
        value: string
    ) => {

        const updated = [...longTermMedication];

        updated[index] = value;

        setValue(
            "longTermMedication",
            updated,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };

    const updateOperation = (
        index: number,
        value: string
    ) => {

        const updated = [...operations];

        updated[index] = value;

        setValue(
            "operations",
            updated,
            {
                shouldDirty: true,
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
                    Create Medical Record
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <Typography
                            sx={{
                                mt: 3,
                                mb: 1,
                                fontWeight: 700
                            }}
                        >
                            Sickness
                        </Typography>

                        {sickness.map((sickness, index) => (

                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{ mb: 2 }}
                            >

                                <TextField
                                    fullWidth
                                    label={`Sickness ${index + 1}`}
                                    value={sickness}
                                    error={!!errors.sickness?.[index]}
                                    helperText={errors.sickness?.[index]?.message}

                                    onChange={(e) =>
                                        updateSickness(index, e.target.value)
                                    }
                                />

                                <IconButton
                                    color="error"
                                    disabled={sickness.length === 1}
                                    onClick={() => removeSickness(index)}
                                >
                                    <DeleteOutlineRounded />
                                </IconButton>

                            </Stack>

                        ))}
                        <Button
                            startIcon={<AddRounded />}
                            onClick={addSickness}
                            sx={{
                                mt: 1,
                                alignSelf: "flex-start",
                            }}
                        >
                            Add Sickness
                        </Button>
                        <Typography
                            sx={{
                                mt: 3,
                                mb: 1,
                                fontWeight: 700
                            }}
                        >
                            Alleragies
                        </Typography>

                        {allergies.map((allergy, index) => (

                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{ mb: 2 }}
                            >

                                <TextField
                                    fullWidth
                                    label={`Allergy ${index + 1}`}
                                    value={allergy}
                                    error={!!errors.allergies?.[index]}
                                    helperText={errors.allergies?.[index]?.message}

                                    onChange={(e) =>
                                        updateAllergy(index, e.target.value)
                                    }
                                />

                                <IconButton
                                    color="error"
                                    disabled={allergies.length === 1}
                                    onClick={() => removeAllergy(index)}
                                >
                                    <DeleteOutlineRounded />
                                </IconButton>

                            </Stack>

                        ))}
                        <Button
                            startIcon={<AddRounded />}
                            onClick={addAllergy}
                            sx={{
                                mt: 1,
                                alignSelf: "flex-start",
                            }}
                        >
                            Add Allergy
                        </Button>
                        <Typography
                            sx={{
                                mt: 3,
                                mb: 1,
                                fontWeight: 700
                            }}
                        >
                            Long Term Medications
                        </Typography>

                        {longTermMedication.map((medication, index) => (

                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{ mb: 2 }}
                            >

                                <TextField
                                    fullWidth
                                    label={`Medication ${index + 1}`}
                                    value={medication}
                                    error={!!errors.longTermMedication?.[index]}
                                    helperText={errors.longTermMedication?.[index]?.message}

                                    onChange={(e) =>
                                        updateLongTermMedication(index, e.target.value)
                                    }
                                />

                                <IconButton
                                    color="error"
                                    disabled={longTermMedication.length === 1}
                                    onClick={() => removeLongTermMedication(index)}
                                >
                                    <DeleteOutlineRounded />
                                </IconButton>

                            </Stack>

                        ))}
                        <Button
                            startIcon={<AddRounded />}
                            onClick={addLongTermMedication}
                            sx={{
                                mt: 1,
                                alignSelf: "flex-start",
                            }}
                        >
                            Add Long Term Medication
                        </Button>

                        <Typography
                            sx={{
                                mt: 3,
                                mb: 1,
                                fontWeight: 700
                            }}
                        >
                            Operations
                        </Typography>

                        {operations.map((operation, index) => (

                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{ mb: 2 }}
                            >

                                <TextField
                                    fullWidth
                                    label={`Operation ${index + 1}`}
                                    value={operation}
                                    error={!!errors.operations?.[index]}
                                    helperText={errors.operations?.[index]?.message}

                                    onChange={(e) =>
                                        updateOperation(index, e.target.value)
                                    }
                                />

                                <IconButton
                                    color="error"
                                    disabled={operations.length === 1}
                                    onClick={() => removeOperation(index)}
                                >
                                    <DeleteOutlineRounded />
                                </IconButton>

                            </Stack>

                        ))}
                        <Button
                            startIcon={<AddRounded />}
                            onClick={addOperation}
                            sx={{
                                mt: 1,
                                alignSelf: "flex-start",
                            }}
                        >
                            Add Operation
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

export default CreateMedicalRecordDialog

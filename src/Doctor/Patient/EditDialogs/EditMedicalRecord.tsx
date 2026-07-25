

import { zodResolver } from '@hookform/resolvers/zod'
import { Add, Delete } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { MedicalRecord } from '../../../Entities/Patient'
import { editMedicalRecordSchema, type EditMedicalRecordInput } from '../../../Schema/EditMedicalRecordSchema'

interface Props {
    open: boolean,
    record: MedicalRecord | null,
    onClose: () => void
}

const EditMedicalRecord = ({ open, record, onClose }: Props) => {

    const theme = useTheme()


    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EditMedicalRecordInput>({
        resolver: zodResolver(editMedicalRecordSchema),

        defaultValues: {
            sickness: [],
            allergies: [],
            longTermMedication: [],
            operations: [],
        },
    });
    const submitDialog = (formData: EditMedicalRecordInput) => {
        // editOffer.mutate(formData)
        onClose()
    }

    useEffect(() => {

        if (record && open) {
            reset({
                sickness: record.sickness ?? [],
                allergies: record.allergies ?? [],
                longTermMedication: record.longTermMedication ?? [],
                operations: record.operations ?? [],
            });
        }
    }, [record, open, reset]);

    const sickness = watch("sickness");
    const allergies = watch("allergies");
    const longTermMedication = watch("longTermMedication");
    const operations = watch("operations");

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
                    Edit Medical Record
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <Stack spacing={2}>

                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    mb: 2
                                }}
                            >
                                Sickness
                            </Typography>

                            <Stack spacing={2}>
                                {sickness.map((item, index) => (
                                    <Stack direction={'row'}>
                                        <Controller
                                            key={index}
                                            name={`sickness.${index}`}
                                            control={control}
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    fullWidth

                                                />

                                            )}
                                        />


                                        <IconButton

                                            color="error"

                                            onClick={() => {

                                                const updated =
                                                    sickness.filter(
                                                        (_, i) => i !== index
                                                    );

                                                setValue(
                                                    "sickness",
                                                    updated,
                                                    {
                                                        shouldDirty: true,
                                                    }
                                                );

                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                ))}

                            </Stack>
                            <Button
                                startIcon={<Add />}
                                onClick={() => {

                                    setValue(
                                        "sickness",
                                        [...sickness, ""],
                                        {
                                            shouldDirty: true,
                                        }
                                    );

                                }}
                            >
                                Add Disease
                            </Button>

                            {/* long term medication */}
                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: 16
                                }}
                            >
                                Long Term Medication
                            </Typography>

                            <Stack spacing={2}>

                                {longTermMedication.map((item, index) => (

                                    <Stack
                                        key={index}
                                        direction="row"
                                        spacing={1}
                                    >

                                        <Controller
                                            name={`longTermMedication.${index}`}
                                            control={control}
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    fullWidth

                                                />

                                            )}
                                        />

                                        <IconButton

                                            color="error"

                                            onClick={() => {

                                                const updated =
                                                    longTermMedication.filter(
                                                        (_, i) => i !== index
                                                    );

                                                setValue(
                                                    "longTermMedication",
                                                    updated,
                                                    {
                                                        shouldDirty: true,
                                                    }
                                                );

                                            }}
                                        >
                                            <Delete />
                                        </IconButton>

                                    </Stack>

                                ))}
                                <Button

                                    startIcon={<Add />}

                                    sx={{
                                        mt: 2,
                                        alignSelf: "center"
                                    }}

                                    onClick={() => {

                                        setValue(

                                            "longTermMedication",

                                            [...longTermMedication, ""],

                                            {
                                                shouldDirty: true,
                                            }

                                        );

                                    }}

                                >

                                    Add Long Term Medication

                                </Button>
                            </Stack>

                            {/* Allergies */}


                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: 16
                                }}
                            >
                                Allergies
                            </Typography>

                            <Stack spacing={2}>

                                {allergies.map((item, index) => (

                                    <Stack
                                        key={index}
                                        direction="row"
                                        spacing={1}
                                    >

                                        <Controller
                                            name={`allergies.${index}`}
                                            control={control}
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    fullWidth

                                                />

                                            )}
                                        />

                                        <IconButton

                                            color="error"

                                            onClick={() => {

                                                const updated =
                                                    allergies.filter(
                                                        (_, i) => i !== index
                                                    );

                                                setValue(
                                                    "allergies",
                                                    updated,
                                                    {
                                                        shouldDirty: true,
                                                    }
                                                );

                                            }}
                                        >
                                            <Delete />
                                        </IconButton>

                                    </Stack>

                                ))}

                            </Stack>
                            <Button

                                startIcon={<Add />}

                                sx={{
                                    mt: 2,
                                    alignSelf: 'center'
                                }}

                                onClick={() => {

                                    setValue(
                                        "allergies",
                                        [...allergies, ""],
                                        {
                                            shouldDirty: true,
                                        }

                                    );

                                }}

                            >

                                Add Allergy

                            </Button>

                            {/* operation */}

                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    fontSize: 16
                                }}
                            >
                                Operations
                            </Typography>

                            <Stack spacing={2}>

                                {operations.map((item, index) => (

                                    <Stack
                                        key={index}
                                        direction="row"
                                        spacing={1}
                                    >

                                        <Controller
                                            name={`operations.${index}`}
                                            control={control}
                                            render={({ field }) => (

                                                <TextField
                                                    {...field}
                                                    fullWidth
                                                />

                                            )}
                                        />

                                        <IconButton

                                            color="error"

                                            onClick={() => {

                                                const updated =
                                                    operations.filter(
                                                        (_, i) => i !== index
                                                    );

                                                setValue(
                                                    "operations",
                                                    updated,
                                                    {
                                                        shouldDirty: true,
                                                    }
                                                );

                                            }}
                                        >
                                            <Delete />
                                        </IconButton>

                                    </Stack>

                                ))}

                            </Stack>
                            <Button

                                startIcon={<Add />}

                                sx={{
                                    mt: 2,
                                    alignSelf: 'center'
                                }}

                                onClick={() => {

                                    setValue(

                                        "operations",

                                        [...operations, ""],

                                        {
                                            shouldDirty: true,
                                        }

                                    );

                                }}

                            >

                                Add Operation

                            </Button>
                        </Stack>


k


                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditMedicalRecord


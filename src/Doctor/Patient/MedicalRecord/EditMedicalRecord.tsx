

import { zodResolver } from '@hookform/resolvers/zod'
import { Add, Delete } from '@mui/icons-material'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { MedicalRecord } from '../../../Entities/Patient'
import { editMedicalRecordSchema, type EditMedicalRecordInput } from '../../../Schema/EditMedicalRecordSchema'
import { useEditMedicalRecord } from '../../../Hook/UseEditMedicalRecord'

interface Props {
    open: boolean,
    record: MedicalRecord | null,
    patientId: number,
    onClose: () => void
}

const EditMedicalRecord = ({ open, record, onClose ,patientId}: Props) => {

    const theme = useTheme()
    const { mutate: editRecord, isPending } = useEditMedicalRecord(patientId)

const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        control,
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
            long_term_medication: [],
            operations: [],
        },
    });


const submitDialog = (formData: EditMedicalRecordInput) => {
        editRecord(formData, {
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
                    message: error.response?.data?.message ?? "there is an error on the create process",
                    severity: "error",
                });
            },
        });
    }
    const handelCancel = () => {
        reset()
        onClose()
    }

    useEffect(() => {

        if (record && open) {
            reset({
                sickness: record.sickness ?? [],
                allergies: record.allergies ?? [],
                long_term_medication: record.long_term_medication ?? [],
                operations: record.operations ?? [],
            });
        }
    }, [record, open, reset]);

    const sickness = watch("sickness");
    const allergies = watch("allergies");
    const long_term_medication = watch("long_term_medication");
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

                                {long_term_medication.map((item, index) => (

                                    <Stack
                                        key={index}
                                        direction="row"
                                        spacing={1}
                                    >

                                        <Controller
                                            name={`long_term_medication.${index}`}
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
                                                    long_term_medication.filter(
                                                        (_, i) => i !== index
                                                    );

                                                setValue(
                                                    "long_term_medication",
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

                                            "long_term_medication",

                                            [...long_term_medication, ""],

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

                        <DialogActions>
                            <Button onClick={handelCancel}
                                sx={{
                                    bgcolor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                    width: 100,
                                    mx: 3,
                                    my: 2
                                }}

                            >

                                Cancel
                            </Button>
                            <Button type="submit" form="subscription-form"
                                disabled={isPending}
                                startIcon={isPending ? <CircularProgress size={20} /> : null}
                               sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    width: 130,

                                }}>
                                {isPending ? 'Sending...' : 'Send'}
                                
                            </Button>
                        </DialogActions>





                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditMedicalRecord


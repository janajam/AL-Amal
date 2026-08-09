import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";

import { useEffect, useState } from "react";

import {
    Controller,
    useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type {
    Account,
    Doctor,
    Secretary,
    Specialty,
} from "../../Entities/AccountsData";
import { editProfileSchema, type EditProfileInput } from "../../Schema/EditProfilrSchema";
import pdf from '../../assets/SRS HIMS.pdf'
import pdf2 from '../../assets/Incident-Response-Plan-Template.pdf'
interface Props {
    open: boolean;

    account: Doctor | Secretary;

    onClose: () => void;

    onSubmit?: (
        data: EditProfileInput
    ) => void;
}



const licenses = [
    {
        id: 1,
        name: "Medical License",
        fileUrl: pdf,
        uploadedAt: "2025-07-13",
    },
    {
        id: 2,
        name: "Board Certificate",
        fileUrl: pdf2,
        uploadedAt: "2025-07-14",
    },
]


const EditProfileDialog = ({
    open,
    account,
    onClose,
    onSubmit,
}: Props) => {

    const theme = useTheme();
    // const [removeOldFile, setRemoveOldFile] = useState(false);
    const [removedLicenseIds, setRemovedLicenseIds] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<EditProfileInput>({
        resolver: zodResolver(editProfileSchema),

        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            birthDay: undefined,
            address: "",
            specialty: "",
        },
    });

    useEffect(() => {
        if (!open || !account) return;

        reset({
            name: account.name,
            email: account.email,
            phoneNumber: account.phoneNumber,
            birthDay: account.birthDay,
            address: account.address,
            specialty:
                account.role === "Doctor"
                    ? account.specialty?.name ?? ""
                    : "",
        });

        setRemovedLicenseIds([]);
        setSelectedFile(null);
        setPreviewUrl(null);

    }, [open, account, reset]);

    const submitForm = (
        data: EditProfileInput
    ) => {


        const payload = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            birthDay: data.birthDay,
            address: data.address,

            ...(account.role === "Doctor"
                ? {
                    specialty: data.specialty,
                    removedLicenseIds,
                    newLicense: selectedFile,
                }
                : {}),
        };
        console.log("Update profile:", payload);

        onSubmit?.(data);
    };


    const handleCancel = () => {

        reset();

        onClose();
    };


    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    fontSize: 18
                }}
            >
                Edit Profile
            </DialogTitle>


            <DialogContent>

                <Stack
                    component="form"
                    id="edit-profile-form"
                    onSubmit={handleSubmit(submitForm)}
                    spacing={2.5}
                    sx={{
                        mt: 2,
                    }}
                >

                    {/* Name */}

                    <TextField
                        label="Full Name"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={
                            errors.name?.message
                        }
                    />


                    {/* Email */}

                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        {...register("email")}
                        error={!!errors.email}
                        helperText={
                            errors.email?.message
                        }
                    />


                    {/* Phone */}

                    <TextField
                        label="Phone Number"
                        fullWidth
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={
                            errors.phoneNumber?.message
                        }
                    />


                    {/* Birthday */}

                    <Controller
                        name="birthDay"
                        control={control}
                        render={({
                            field,
                        }) => (

                            <TextField
                                label="Birth Day"
                                type="date"
                                fullWidth
                                value={
                                    field.value
                                    // ? field.value
                                    //     .toISOString()
                                    //     .split("T")[0]
                                    // : ""
                                }
                                onChange={(e) => {

                                    const value =
                                        e.target.value;

                                    field.onChange(
                                        value
                                            ? new Date(value)
                                            : undefined
                                    );

                                }}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }} error={
                                    !!errors.birthDay
                                }
                                helperText={
                                    errors.birthDay
                                        ?.message
                                }
                            />

                        )}
                    />


                    {/* Address */}

                    <TextField
                        label="Address"
                        fullWidth
                        multiline
                        minRows={2}
                        {...register("address")}
                        error={!!errors.address}
                        helperText={
                            errors.address?.message
                        }
                    />


                    {/* Department */}

                    <TextField
                        label="Department"
                        fullWidth
                        value={account.department.name}
                        disabled
                    />


                    {/* Role */}

                    <TextField
                        label="Role"
                        fullWidth
                        value={account.role}
                        disabled
                    />


                    {/* Doctor specific */}

                    {account.role === "Doctor" && (
                        <>
                            <TextField
                                // select
                                disabled
                                label="Specialty"
                                fullWidth
                                {...register("specialty")}
                                error={
                                    !!errors.specialty
                                }
                                helperText={
                                    errors.specialty?.message
                                }
                            />
                            <Typography
                                sx={{ fontWeight: 600 }}
                            >

                                Current Licenses
                            </Typography>

                            {licenses.map((licens) => {
                                const isRemoved =
                                    removedLicenseIds.includes(licens.id);
                                if (isRemoved) return null;
                                return (

                                    <Paper
                                        key={licens.id}
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Stack
                                            direction={{
                                                xs: "column",
                                                sm: "row",
                                            }}
                                            spacing={2}
                                            sx={{
                                                justifyContent: "space-between",
                                                alignItems: {
                                                    xs: "stretch",
                                                    sm: "center",
                                                },
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {licens.name}

                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    PDF Document
                                                </Typography>
                                            </Box>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    href={licens.fileUrl}
                                                    target="_blank"
                                                >
                                                    Preview
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => {
                                                        setRemovedLicenseIds(
                                                            (prev) => [
                                                                ...prev,
                                                                licens.id,
                                                            ]
                                                        );
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Paper>




                                )
                            })}
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

                                        const file =
                                            e.target.files?.[0];

                                        if (!file) return;

                                        const url =
                                            URL.createObjectURL(file);

                                        setSelectedFile(file);
                                        setPreviewUrl(url);
                                    }} />

                            </Button>
                            {selectedFile && previewUrl && (

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
                                                // href={previewUrl}
                                                href={previewUrl ?? undefined}
                                                target="_blank"
                                            >
                                                Preview
                                            </Button>

                                            <Button
                                                color="error"
                                                variant="outlined"

                                                onClick={() => {

                                                    URL.revokeObjectURL(
                                                        previewUrl
                                                    );

                                                    setSelectedFile(null);
                                                    setPreviewUrl(null);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Stack>

                                    </Stack>

                                </Paper>

                            )}

                        </>

                    )}

                </Stack>

            </DialogContent>


            <DialogActions
                sx={{
                    px: 3,
                    pb: 2,
                }}
            >

                <Button
                    onClick={handleCancel}
                    sx={{
                        bgcolor:
                            theme.palette.secondary.main,

                        color:
                            theme.palette.secondary
                                .contrastText,
                    }}
                >
                    Cancel
                </Button>


                <Button
                    type="submit"
                    form="edit-profile-form"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                        bgcolor:
                            theme.palette.primary.main,
                    }}
                >
                    Save Changes
                </Button>

            </DialogActions>

        </Dialog>
    );
};

export default EditProfileDialog;
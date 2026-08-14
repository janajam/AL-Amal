
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Patient, PatientDetail } from '../../../Entities/Patient';
import { editContactInfoSchema, type EditContactInfoInput } from '../../../Schema/EditContactInfoSchema';
import { useEditContactInfo } from '../../../Hook/UseEditContactInfo';

interface Props {
    open: boolean,
    contactInfo: PatientDetail | null,
    onClose: () => void
}

const EditContactInfoDialog = ({ open, contactInfo, onClose }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<EditContactInfoInput>({
        resolver: zodResolver(editContactInfoSchema),
        mode: 'onChange'
    })

    const theme = useTheme()
    const handelCancel = () => {
        reset()
        onClose()
    }
    const editContactInfo = useEditContactInfo(contactInfo?.id ?? 0);
    useEffect(() => {

        if (!contactInfo) return;

        reset({
            full_name: contactInfo.user.full_name,
            email: contactInfo.user.email,
            address: contactInfo.user.address,
            phone: contactInfo.user.phone,

        });

    }, [contactInfo, reset]);

    const submitDialog = (formData: EditContactInfoInput) => {
        if (!contactInfo) return;

        editContactInfo.mutate(formData, {
            onSuccess: () => {
                reset();
                onClose();
            },

            onError: (error) => {
                console.error("Failed to update patient:", error);
            },
        });
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
                    Edit {contactInfo?.user.full_name} Contact Info
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label='Full Name'
                            fullWidth
                            variant="outlined"
                            {...register('full_name')}
                            error={!!errors.full_name}
                            helperText={errors.full_name?.message}
                        />

                        <TextField
                            margin="dense"
                            label="Email"
                            multiline
                            fullWidth
                            variant="outlined"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            margin="dense"
                            id="phoneNumber"
                            label='Phone Number'
                            fullWidth
                            variant="outlined"
                            {...register('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />

                        <TextField
                            margin="dense"
                            id="address"
                            label='Address'
                            fullWidth
                            variant="outlined"
                            {...register('address')}
                            error={!!errors.address}
                            helperText={errors.address?.message}

                        />




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
                        disabled={editContactInfo.isPending}
                        startIcon={
                            editContactInfo.isPending ? (
                                <CircularProgress size={20} />
                            ) : null
                        }
                        sx={{

                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,
                            my: 2

                        }}>
                        {editContactInfo.isPending ? "Saving..." : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default EditContactInfoDialog

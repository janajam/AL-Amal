
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Patient } from '../../../Entities/Patient';
import { editContactInfoSchema, type EditContactInfoInput } from '../../../Schema/EditContactInfoSchema';

interface Props {
    open: boolean,
    contactInfo: Patient | null,
    onClose: () => void
}

const EditContactInfoDialog = ({ open, contactInfo, onClose }: Props) => {

    const theme = useTheme()
const handelCancel=()=>{
        reset()
        onClose()
    }
    
    // const editcontactInfo=useEditcontactInfo(contactInfo?.id|| 0)
    useEffect(() => {


        if (!contactInfo) return;

        reset({
            name: contactInfo.name,
            email: contactInfo.email,
            address: contactInfo.address,
            phoneNumber: contactInfo.phoneNumber,

        });

    }, [contactInfo]);


    const submitDialog = (formData: EditContactInfoInput) => {
        // editOffer.mutate(formData)
        onClose()
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<EditContactInfoInput>({
        resolver: zodResolver(editContactInfoSchema),
        mode: 'onChange'
    })

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
                    Edit {contactInfo?.name} Contact Info
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label='Title'
                            fullWidth
                            variant="outlined"
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
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
                            {...register('phoneNumber')}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
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
                        //   disabled={editOffer.isPending}
                        //   startIcon={
                        //       editOffer.isPending
                        //           ? <CircularProgress size={20} />
                        //            : null}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,
                            my: 2

                        }}>
                        {/* {editOffer.isPending ? 'Sending...' : 'Send'} */}
                        save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default EditContactInfoDialog

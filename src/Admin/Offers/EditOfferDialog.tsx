
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { OfferData } from '../../Entities/OfferData';
import { useEditOffer } from '../../Hook/UseEditOffer';
import { createOfferSchema, type CreateOfferInput } from '../../Schema/CreateOfferSchema';
interface Props {
    open: boolean,
    offer: OfferData| null,
    onClose: () => void
}

const EditOfferDialog = ({ open, offer, onClose }: Props) => {

    const theme = useTheme()

    const editOffer=useEditOffer(offer?.id|| 0)
    useEffect(() => {


        if (!offer) return;

        reset({
            title: offer.title,
            description: offer.description,
            startTime: offer.startTime,
            endTime: offer.endTime,
            status: offer.status,
        });

    }, [offer]);


    const submitDialog = (formData: CreateOfferInput) => {
        editOffer.mutate(formData)
        onClose()
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateOfferInput>({
        resolver: zodResolver(createOfferSchema),
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
                    Edit {offer?.title}
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label='Title'
                            fullWidth
                            variant="standard"
                            {...register('title')}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />

                        <TextField
                            margin="dense"
                            label="Description"
                            multiline
                            fullWidth
                            variant="standard"
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />

                        <TextField
                            margin="dense"
                            id="startTime"
                            label='Start Time'
                            fullWidth
                            variant="standard"
                            {...register('startTime')}
                            error={!!errors.startTime}
                            helperText={errors.startTime?.message}
                        />

                        <TextField
                            margin="dense"
                            id="endTime"
                            label='End Time'
                            fullWidth
                            variant="standard"
                            {...register('endTime')}
                            error={!!errors.endTime}
                            helperText={errors.endTime?.message}

                        />




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
                          disabled={editOffer.isPending}
                          startIcon={
                              editOffer.isPending
                                  ? <CircularProgress size={20} />
                                   : null}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,

                        }}>
                        {editOffer.isPending ? 'Sending...' : 'Send'}
                        
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default EditOfferDialog

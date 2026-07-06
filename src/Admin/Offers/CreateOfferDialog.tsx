import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createOfferSchema, type CreateOfferInput } from "../../Schema/CreateOfferSchema";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress, useTheme } from "@mui/material";

interface Props {
    open: boolean;
    onClose: () => void;
    offerId: number;
}

const CreateOfferDialog = ({ open, onClose, offerId }: Props) => {

    const theme = useTheme()


    const submitDialog = (formData: CreateOfferInput) => {
        // sendRespons.mutate(formData)
        onClose();
    };


    const {
        register,
        handleSubmit,
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
                    Edit Offer
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label=""
                            type="email"
                            fullWidth
                            variant="standard"
                        //   {...register('email')}
                        //   error={!!errors.email}
                        //   helperText={errors.email?.message}

                        />
                        <TextField
                            margin="dense"
                            label="Response"
                            placeholder="Response"
                            multiline
                            minRows={3}
                            fullWidth
                            variant="standard"
                        //   {...register('response')}
                        //   error={!!errors.response}
                        //   helperText={errors.response?.message}

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
                        //   disabled={sendRespons.isPending}
                        //   startIcon={
                        //       sendRespons.isPending
                        //           ? <CircularProgress size={20} />
                        //           : null}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,

                        }}>
                        {/* {sendRespons.isPending ? 'Sending...' : 'Send'} */}
                        send
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default CreateOfferDialog

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material"
import { useState } from "react"
import CardContainer from "../../Component/CardContainer"
import { useGetComplaints } from "../../Hook/UseGetComplaints"
import { UsePostComplaintRespnse } from "../../Hook/UsePostComplaintRespnse"
import { useForm } from "react-hook-form"
import { ComplaintResponseSchema, type ComplaintResponseInput } from "../../Schema/ComplaintResponseSchema.ts"
import { zodResolver } from "@hookform/resolvers/zod"

//for test 
const complaints = [
    { clientName: 'AA', subject: 'subject', email: 'aa@email.com', description: 'description', status: 'open' },
    { clientName: 'BB', subject: 'subject', email: 'BB@email.com', description: 'description', status: 'open' },
    { clientName: 'CC', subject: 'subject', email: 'CC@email.com', description: 'description', status: 'open' },
    { clientName: 'DD', subject: 'subject', email: 'DD@email.com', description: 'description', status: 'open' },


]

const ComplaintCard = () => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    useGetComplaints()
    const sendRespons = UsePostComplaintRespnse()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ComplaintResponseInput>({
        defaultValues: {
            email: '',
            response: ''
        },
        resolver: zodResolver(ComplaintResponseSchema),
        mode: 'onChange'
    })
    //for dialog 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitDialog = (formData: ComplaintResponseInput) => {
        sendRespons.mutate(formData)
        handleClose();
    };



    return (
        <Box>

            {/* {data?.data.map */}
            {complaints.map
                (complaint => (
                    <CardContainer>

                        <Card key={complaint.clientName} sx={{
                            my: 2,
                            bgcolor: theme.palette.background.default,
                            boxShadow: '0 4px 10px #9ed1d5',
                            px: 2
                        }}>
                            <CardHeader
                                subheader={complaint.clientName}
                                title={complaint.subject}
                                sx={{
                                    color: theme.palette.primary.main,

                                }}
                            />

                            <CardContent>
                                <Stack direction={'row'} sx={{
                                    justifyContent: 'space-between'
                                }}>
                                    <Stack >
                                        <Typography sx={{ fontWeight: 700, fontSize: 17 }}>{complaint.email}</Typography>
                                        <Typography>{complaint.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis accusamus voluptatibus tenetur dolor. Hic, itaque fugit sit, provident ullam numquam deleniti autem rerum nihil iure commodi quae unde nesciunt libero!</Typography>
                                    </Stack>
                                    <Typography>{complaint.status}</Typography>
                                </Stack>
                                <Button
                                    variant='contained'
                                    sx={{
                                        bgcolor: theme.palette.etal.main,
                                        width: 150,
                                        height: 40,
                                        mt: 3,
                                        ml: '77%',
                                        cursor: 'pointer',
                                        [theme.breakpoints.down('md')]: {
                                            ml: '22%'
                                        }
                                    }}
                                    onClick={() => {
                                        handleClickOpen()
                                    }}
                                >
                                    Respose
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
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
                                        Your Response
                                    </DialogTitle>
                                    <DialogContent >
                                        <DialogContentText sx={{
                                            width: '100%'
                                        }}>
                                            Lets Solve The Complaint And Make Things Fine

                                        </DialogContentText>
                                        <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Email Address"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                {...register('email')}
                                                error={!!errors.email}
                                                helperText={errors.email?.message}

                                            />
                                            <TextField
                                                margin="dense"
                                                label="Response"
                                                placeholder="Response"
                                                multiline
                                                minRows={3}
                                                fullWidth
                                                variant="standard"
                                                {...register('response')}
                                                error={!!errors.response}
                                                helperText={errors.response?.message}

                                            />

                                        </form>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}
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
                                            disabled={sendRespons.isPending}
                                            startIcon={
                                                sendRespons.isPending
                                                    ? <CircularProgress size={20} />
                                                    : null}
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                width: 130,

                                            }}>
                                            {sendRespons.isPending ? 'Sending...' : 'Send'}

                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </CardContainer>


                ))}

        </Box>
    )
}

export default ComplaintCard



import { useForm } from "react-hook-form";
import { createTestResultSchema, type AddTestResultInput } from "../../../Schema/AddTestResultSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, useTheme } from "@mui/material";
import { PictureAsPdfRounded } from "@mui/icons-material";


interface Props {
    open: boolean,
    onClose: () => void
}


const AddTestResultDialog = ({ open, onClose }: Props) => {
    const theme = useTheme()

    const submitDialog = (data: AddTestResultInput) => {
  if (!data.attachment) {
        return;
    }
        // createTestResult.mutate(data, {

        reset();
        onClose();
    };
    const handelCancel = () => {
        reset()
        onClose()
    }

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setValue("attachment", file, {
            shouldValidate: true
        });

    };



    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<AddTestResultInput>({
        resolver: zodResolver(createTestResultSchema),
        defaultValues: {
            requestedBy: "",
            uploaded_by: "",
            title: "",
            result: ""
        }
    });

    const removeAttachment = () => {

        setValue("attachment", undefined, {
            shouldValidate: true
        });

    };
    const attachment = watch("attachment");

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
                    Add Test Result
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit(submitDialog)} id="subscription-form">
                        <Stack spacing={2}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label='Test Title'
                                fullWidth
                                variant="outlined"
                                {...register('title')}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="requestedBy"
                                label='Doctor Name'
                                fullWidth
                                variant="outlined"
                                {...register('requestedBy')}
                                error={!!errors.requestedBy}
                                helperText={errors.requestedBy?.message}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="result"
                                label='Result Description '
                                fullWidth
                                variant="outlined"
                                {...register('result')}
                                error={!!errors.result}
                                helperText={errors.result?.message}
                            />

                            <Stack spacing={2}
                                sx={{ mt: 3 }}
                            >

                                <Button
                                    variant="outlined"
                                    component="label"
                                >
                                    Upload PDF

                                    <input
                                        hidden
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                    />

                                </Button>

                                {attachment && (

                                    <Card
                                        variant="outlined"
                                        sx={{ p: 2 }}
                                    >
                                        <Stack direction="row" spacing={1}> <PictureAsPdfRounded/>
                                        <Typography>

                                            {attachment.name}

                                        </Typography>
</Stack>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            sx={{
                                                mt: 2
                                            }}
                                        >

                                            <Button
                                                variant="outlined"
                                                href={URL.createObjectURL(attachment)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                component="a"
                                            >
                                                Preview
                                            </Button>

                                            <Button
                                                color="error"
                                                onClick={removeAttachment}
                                            >
                                                Remove
                                            </Button>

                                        </Stack>

                                    </Card>

                                )}

                            </Stack>
                        </Stack>
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
                        // disabled={editPlan.isPending}
                        // startIcon={
                        //     editPlan.isPending
                        //         ? <CircularProgress size={20} />
                        //         : null}
                        sx={{
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: 130,

                        }}>
                        {/* {editPlan.isPending ? 'Sending...' : 'Send'} */}
                        save
                    </Button>
                </DialogActions>

            </Dialog>

        </div>
    )
}

export default AddTestResultDialog

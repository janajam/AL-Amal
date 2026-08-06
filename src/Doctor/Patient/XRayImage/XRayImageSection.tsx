import { useState } from "react";

import {
    AddRounded,
    Close,
    DescriptionOutlined,
    EditRounded,
    PersonOutlined
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardMedia,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme
} from "@mui/material";
import type { XRayImage } from "../../../Entities/Patient";
import EditXRayImageDialog from "./EditXRayImageDialog";
import AddXRayImageDialog from "./AddXRayImageDialog";
import { useAuthStore } from "../../../Store/AuthStore";

interface Props {
    image: XRayImage[];
}

const XRayImageSection = ({ image }: Props) => {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const theme = useTheme();
    // const userRole = useAuthStore((state) => state.role);
   const  userRole='secretary'
   

    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const [selected, setSelected] = useState(0);

    const current = image[selected];

    if (!image.length) return null;

    return (

        <Box
            sx={{
                width: "93%",
                bgcolor: theme.palette.background.default,
                justifySelf: "center",
                p: 4,
                mt: -2
            }}
        >
            <Stack direction="row" spacing={4}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: 20
                    }}

                >
                    Radiology Image
                </Typography>
                    {userRole!=='secretary'&&
            
                <Button
                    variant='outlined'
                    startIcon={<AddRounded />}
                    sx={{
                        whiteSpace: 'nowrap',
                        border: `2px solid ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main,
                        ml: '83%',
                        mt: 4,

                    }}
                    onClick={() => handleAdd()}
                >
                    Add
                </Button>
}
            </Stack>
            <Tabs
                value={selected}
                onChange={(_, value) => setSelected(value)}
                variant="scrollable"
                scrollButtons="auto"
            >

                {image.map((item) => (

                    <Tab
                        key={item.id}
                        label={
                            <Stack
                                sx={{ alignItems: "flex-start" }}>

                                <Typography sx={{ fontWeight: 700 }}>
                                    {new Date(item.uploaded_at).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                        }
                                    )}
                                </Typography>

                                <Typography variant="caption">
                                    {item.requestedBy}
                                </Typography>

                            </Stack>
                        }
                    />

                ))}

            </Tabs>

            <Card
                sx={{
                    width: "100%",
                    bgcolor: theme.palette.background.default,
                    justifySelf: "center",
                    borderRadius: 1,
                    py: 2,
                    px: 4,
                    mb: 4,
                    boxShadow: "0 2px 17px #9ed1d5",
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

                        {selected === 0 && (

                            <Typography
                                sx={{
                                    fontSize: 10,
                                    color: theme.palette.etal.main
                                }}
                            >
                                Latest
                            </Typography>
                        )}

                        <Typography
                            variant="h5"
                            sx={{
                                mt: 2, fontWeight: 700,
                                fontSize: 12
                            }}
                        >
                            {current.type}
                        </Typography>

                    </Box>

                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                        }}
                    >
                        {new Date(current.uploaded_at).toLocaleDateString()}
                    </Typography>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{
                        justifyContent: 'space-between'
                    }}>
                    <Stack
                        spacing={3}
                        sx={{
                            mt: 2
                        }}>

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: "center" }}
                        >

                            <PersonOutlined
                                sx={{
                                    color: theme.palette.etal.main,
                                }}
                            />

                            <Box>

                                <Typography
                                    sx={{ fontWeight: 700 }}
                                >
                                    Radiologist
                                </Typography>

                                <Typography >
                                    Dr. {current.uploaded_by}
                                </Typography>

                            </Box>

                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: "center" }}
                        >

                            <PersonOutlined
                                sx={{
                                    color: theme.palette.etal.main,
                                }}
                            />

                            <Box>

                                <Typography
                                    sx={{ fontWeight: 700 }}
                                >
                                    Doctor
                                </Typography>

                                <Typography >
                                    Dr. {current.requestedBy}
                                </Typography>

                            </Box>

                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: "center" }}
                        >

                            <DescriptionOutlined
                                sx={{
                                    color: theme.palette.etal.main,
                                }}
                            />

                            <Box>

                                <Typography
                                    sx={{ fontWeight: 700 }}
                                >
                                    Description
                                </Typography>

                                <Typography >
                                    {current.description}
                                </Typography>

                            </Box>

                        </Stack>

                    </Stack>

                    <Card
                        variant="outlined"
                        sx={{
                            bgcolor: theme.palette.background.default,
                            mr: 4,
                            [theme.breakpoints.down('md')]: {
                                mt: 3,
                                width: 200,
                                height: 280,
                            },
                            width: 360,
                            height: 280


                        }}
                    >
                        <CardMedia
                            component="img"
                            image={current.image}
                            onClick={() => setPreviewOpen(true)}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                cursor: "zoom-in",
                                borderRadius: 1,
                                transition: ".25s",

                                "&:hover": {
                                    transform: "scale(1.02)",
                                },
                            }}
                        />
                    </Card>
                </Stack>
                    {userRole!=='secretary'&&
            
                <Button
                    startIcon={<EditRounded />}
                    sx={{
                        whiteSpace: 'nowrap',
                        width: 120,
                        border: `2px solid ${theme.palette.etal.main}`,
                        bgcolor: theme.palette.etal.main,
                        color: theme.palette.primary.contrastText,
                        alignSelf: 'flex-end',
                        mt: 4,
                        ml: '86%',


                    }}
                    onClick={() => handleEdit()}
                >
                    Edit
                </Button>
}
            </Card>

            <EditXRayImageDialog
                open={open}
                img={current}
                onClose={handleClose}
            />

            <AddXRayImageDialog 
            open={openDialog} 
            onClose={handleCloseDialog}
            />

            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>
                   
                 
                    <IconButton
                        onClick={() => setPreviewOpen(false)}
                        sx={{
                            position: "absolute",
                            right: 10,
                            top: 10,
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    sx={{
                        p: 2,
                    }}
                >
                    <Box
                        component="img"
                        src={current.image}
                        sx={{
                            width: "90%",
                            maxHeight: "77vh",
                            objectFit: "contain",
                        }}
                    />
                </DialogContent>
            </Dialog>
        </Box>

    );

};

export default XRayImageSection;
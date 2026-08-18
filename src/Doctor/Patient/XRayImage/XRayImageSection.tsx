
import { useState } from "react";

import {
    AddRounded,
    Close,
    DescriptionOutlined,
    EditRounded,
    PersonOutlined,
} from "@mui/icons-material";

import {
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from "@mui/material";

import type { XRayImage } from "../../../Entities/Patient";

import EditXRayImageDialog from "./EditXRayImageDialog";
import AddXRayImageDialog from "./AddXRayImageDialog";
import { useAuthStore } from "../../../Store/AuthStore";

interface Props {
    image: XRayImage[];
    patientId: number;
    medicalRecordId: number;
}

const XRayImageSection = ({
    image,
    patientId,
    medicalRecordId,
}: Props) => {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const [selected, setSelected] = useState(0);

    const theme = useTheme();

    const userRole = useAuthStore((state) => state.role);
    if (!image || image.length === 0) {
        return null;
    }


    const current = image[selected];

    const isPdf = current.image
        .toLowerCase()
        .endsWith(".pdf");

    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*
     * Add
     */
    const handleAdd = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    /*
     * تغيير الـ Tab
     */
    const handleTabChange = (
        _: React.SyntheticEvent,
        value: number
    ) => {
        setSelected(value);
    };

    console.log("CURRENT XRAY:", current);
    console.log("IMAGE URL:", current.image);

    return (
        <Box
            sx={{
                width: "93%",
                bgcolor: theme.palette.background.default,
                justifySelf: "center",
                p: 4,
                mt: -2,
            }}
        >
            {/* ================= Header ================= */}

            <Stack
                direction="row"
                spacing={4}
                sx={{
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: 20,
                    }}
                >
                    Radiology Images
                </Typography>

                {userRole !== "secretary" && (
                    <Button
                        variant="outlined"
                        startIcon={<AddRounded />}
                        sx={{
                            whiteSpace: "nowrap",
                            border: `2px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                            ml: "auto",
                            mb: 2,
                        }}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                )}
            </Stack>

            {/* ================= Tabs ================= */}

            <Tabs
                value={selected}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                {image.map((item) => (
                    <Tab
                        key={item.id}
                        label={
                            <Stack
                                sx={{
                                    alignItems: "flex-start",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {new Date(
                                        item.created_at
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                    })}
                                </Typography>

                                <Typography variant="caption">
                                    Dr. {item.doctor_name}
                                </Typography>
                            </Stack>
                        }
                    />
                ))}
            </Tabs>

            {/* ================= Current Result ================= */}

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
                {/* ---------- Card Header ---------- */}

                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        {selected === 0 && (
                            <Typography
                                sx={{
                                    fontSize: 10,
                                    color: theme.palette.etal.main,
                                }}
                            >
                                Latest
                            </Typography>
                        )}

                        <Typography
                            variant="h5"
                            sx={{
                                mt: 2,
                                fontWeight: 700,
                                fontSize: 14,
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
                        {new Date(
                            current.created_at
                        ).toLocaleDateString()}
                    </Typography>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* ================= Content ================= */}

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    {/* ---------- Information ---------- */}

                    <Stack
                        spacing={3}
                        sx={{
                            mt: 2,
                            maxWidth: {
                                xs: "100%",
                                md: "50%",
                            },
                        }}
                    >
                        {/* Doctor */}

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <PersonOutlined
                                sx={{
                                    color: theme.palette.etal.main,
                                }}
                            />

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Doctor
                                </Typography>

                                <Typography>
                                    Dr. {current.doctor_name}
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Description / Result */}

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                alignItems: "flex-start",
                            }}
                        >
                            <DescriptionOutlined
                                sx={{
                                    color: theme.palette.etal.main,
                                }}
                            />

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Result
                                </Typography>

                                <Typography
                                    sx={{
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {current.description}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>

                    {/* ---------- PDF / Image Preview ---------- */}

                    <Card
                        variant="outlined"
                        sx={{
                            bgcolor:
                                theme.palette.background.default,
                            mr: 4,

                            width: 360,
                            height: 280,

                            [theme.breakpoints.down("md")]: {
                                mt: 3,
                                width: 200,
                                height: 280,
                                mr: 0,
                            },
                        }}
                    >
                        {/* <Box
              component="iframe"
              src={current.image}
              title={`Radiology result ${current.id}`}
              onClick={() => setPreviewOpen(true)}
              sx={{
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 1,
                cursor: "zoom-in",
              }}
            /> */}
                        {isPdf ? (
                            <Box
                                component="iframe"
                                src={current.image}
                                title={`Radiology result ${current.id}`}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    border: 0,
                                    borderRadius: 1,
                                }}
                            />
                        ) : (
                            <Box
                                component="img"
                                src={current.image}
                                alt={current.type}
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
                        )}

                    </Card>
                </Stack>

                {/* ================= Edit Button ================= */}

                {userRole !== "secretary" && (
                    <Button
                        startIcon={<EditRounded />}
                        sx={{
                            whiteSpace: "nowrap",
                            width: 120,
                            border: `2px solid ${theme.palette.etal.main}`,
                            bgcolor: theme.palette.etal.main,
                            color:
                                theme.palette.primary.contrastText,
                            alignSelf: "flex-end",
                            mt: 4,
                            ml: "auto",
                            display: "flex",
                        }}
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                )}
            </Card>

            {/* ================= Edit Dialog ================= */}

            <EditXRayImageDialog
                open={open}
                img={current}
                patientId={patientId}
                onClose={handleClose}
            />

            {/* ================= Add Dialog ================= */}

            <AddXRayImageDialog
                open={openDialog}
                medicalRecordId={medicalRecordId}
                patientId={patientId}
                onClose={handleCloseDialog}
            />

            {/* ================= Full Preview ================= */}

            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>
                    Radiology Image

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
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {isPdf ? (
                        <Box
                            component="iframe"
                            src={current.image}
                            title={`Radiology result ${current.id}`}
                            sx={{
                                width: "100%",
                                height: "77vh",
                                border: 0,
                            }}
                        />
                    ) : (
                        <Box
                            component="img"
                            src={current.image}
                            alt={current.type}
                            sx={{
                                width: "90%",
                                maxHeight: "77vh",
                                objectFit: "contain",
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default XRayImageSection;
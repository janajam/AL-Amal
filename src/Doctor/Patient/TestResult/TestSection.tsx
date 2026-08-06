import { useState } from "react";

import {
    Box,
    Button,
    Card,
    Divider,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme
} from "@mui/material";

import {
    AddRounded,
    DescriptionOutlined,
    Download,
    EditRounded,
    PersonOutlined,
    PictureAsPdf,
    ScienceOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";
import type { TestResult } from "../../../Entities/Patient";
import EditTestResultDialog from "./EditTestResultDialog";
import AddTestResultDialog from "./AddTestResultDialog";
import { useAuthStore } from "../../../Store/AuthStore";

interface Props {
    results: TestResult[];
}

const TestResultSection = ({ results }: Props) => {
const  userRole='secretary'
   
    // const userRole = useAuthStore((state) => state.role);

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [selected, setSelected] = useState(0);

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


    const current = results[selected];

    if (!results.length) return null;

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
                    Test Results
                </Typography>
                {userRole !== 'secretary' &&
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

                {results.map((item) => (

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
                            {current.title}
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

                            <ScienceOutlined
                                sx={{
                                    color: theme.palette.etal.main,
                                }}
                            />

                            <Box>

                                <Typography
                                    sx={{ fontWeight: 700 }}
                                >
                                    Laboratory Technician
                                </Typography>

                                <Typography >
                                    {current.uploaded_by}
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
                        <Stack direction={'row'} spacing={3}>
                            <DescriptionOutlined
                                sx={{ color: theme.palette.etal.main }}
                            />
                            <Typography>
                                {current.result}
                            </Typography>
                        </Stack>
                    </Stack>
                    {/* <Divider /> */}

                    <Card
                        variant="outlined"
                        sx={{
                            p: 3,
                            border: `1px dashed ${theme.palette.primary.main}`,
                            bgcolor: theme.palette.background.default,
                            mr: 4,
                            [theme.breakpoints.down('md')]: {
                                mt: 3
                            }


                        }}
                    >

                        <Stack
                            spacing={2}
                            sx={{
                                alignItems: "center",

                            }}
                        >

                            <PictureAsPdf

                                sx={{
                                    fontSize: 40,
                                }}
                            />

                            <Typography
                                sx={{ fontWeight: 700 }}
                            >
                                {current.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center" }}
                            >
                                PDF Document
                            </Typography>

                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={2}
                            >

                                <Button
                                    variant="outlined"
                                    startIcon={<VisibilityOutlined />}
                                    component="a"
                                    href={current.attachment}
                                    target="_blank"
                                >
                                    Preview
                                </Button>

                                <Button
                                    variant="contained"
                                    startIcon={<Download />}
                                    component="a"
                                    href={current.attachment}
                                    download
                                >
                                    Download
                                </Button>

                            </Stack>

                        </Stack>

                    </Card>
                </Stack>

                {userRole !== 'secretary' &&
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
            <EditTestResultDialog
                open={open}
                result={current}
                onClose={handleClose} />

            <AddTestResultDialog
                open={openDialog}
                onClose={handleCloseDialog} />
        </Box>

    );

};

export default TestResultSection;
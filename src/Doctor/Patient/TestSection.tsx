import { useState } from "react";

import {
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from "@mui/material";

import {
    Download,
    PersonOutlined,
    PictureAsPdf,
    ScienceOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";

import type { TestResult } from "../../Entities/Patient";

interface Props {
    results: TestResult[];
}

const TestResultSection = ({ results }: Props) => {

    const theme = useTheme();

    const [selected, setSelected] = useState(0);

    const current = results[selected];

    if (!results.length) return null;

    return (

        <Box
            sx={{
                width: "93%",
                bgcolor: theme.palette.background.default,
                justifySelf: "center",
                p: 4,
                mb: 4,
            }}
        >

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
                                    {new Date(item.date).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                        }
                                    )}
                                </Typography>

                                <Typography variant="caption">
                                    {item.doctorName}
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
                        c
                        <Typography
                            variant="h5"
                            sx={{
                                mt: 2, fontWeight: 700,
                                fontSize: 12
                            }}
                        >
                            {current.reportName}
                        </Typography>

                    </Box>

                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                        }}
                    >
                        {new Date(current.date).toLocaleDateString()}
                    </Typography>

                </Stack>

                <Divider sx={{ my: 3 }} />

                <Stack
                    direction={'row'}
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
                                    Laboratory
                                </Typography>

                                <Typography >
                                    {current.labWorkingName}
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
                                    Dr. {current.doctorName}
                                </Typography>

                            </Box>

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

                        }}
                    >

                        <Stack
                            spacing={2}
                            sx={{ alignItems: "center" }}
                        >

                            <PictureAsPdf

                                sx={{
                                    fontSize: 40,
                                }}
                            />

                            <Typography
                                sx={{ fontWeight: 700 }}
                            >
                                {current.reportName}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center" }}
                            >
                                PDF Document
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={2}
                            >

                                <Button
                                    variant="outlined"
                                    startIcon={<VisibilityOutlined />}
                                    component="a"
                                    href={current.reportUrl}
                                    target="_blank"
                                >
                                    Preview
                                </Button>

                                <Button
                                    variant="contained"
                                    startIcon={<Download />}
                                    component="a"
                                    href={current.reportUrl}
                                    download
                                >
                                    Download
                                </Button>

                            </Stack>

                        </Stack>

                    </Card>


                </Stack>
            </Card>

        </Box>

    );

};

export default TestResultSection;
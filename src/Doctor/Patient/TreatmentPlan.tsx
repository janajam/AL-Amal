
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

import { EditRounded, PersonOutlined } from "@mui/icons-material";
import type { TreatmentPlan } from '../../Entities/Patient';

interface Props {
    plans: TreatmentPlan[];
}

const TreatmentPlanSection = ({ plans }: Props) => {
    const theme = useTheme()
    const [selected, setSelected] = useState(0);
    const [open, setOpen] = useState(false);
    const handleEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const currentPlan = plans[selected];
    const isTwoColumns = currentPlan.treatmentSteps.length > 3;

    return (
        <Box
            sx={{
                width: "93%",
                bgcolor: theme.palette.background.default,
                justifySelf: "center",
                p: 4,

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
                Treatment Plan
            </Typography>

            <Tabs
                value={selected}
                onChange={(_, value) => setSelected(value)}
                variant="scrollable"
                scrollButtons="auto"
            >
                {plans.map((plan) => (

                    <Tab
                        key={plan.id}
                        label={
                            <Stack
                                sx={{ alignItems: "flex-start" }}>

                                <Typography
                                    sx={{ fontWeight: 700 }}>
                                    {new Date(plan.date).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                        }
                                    )}
                                </Typography>

                                <Typography
                                    variant="caption"
                                >
                                    {plan.doctorName}
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
                                latest
                            </Typography>
                        )}

                        <Typography
                            variant="h5"
                            sx={{
                                mt: 2,
                                fontWeight: 700,
                                fontSize: 12

                            }}
                        >
                            {currentPlan.medicalDiagnosis}
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                mt: 2,
                                alignItems: "center"
                            }}
                        >
                            <PersonOutlined sx={{ color: theme.palette.etal.main }} />

                            <Typography>
                                Dr. {currentPlan.doctorName}
                            </Typography>
                        </Stack>

                    </Box>

                    <Box
                        sx={{
                            textAlign: "right"
                        }}
                    >
                        <Typography
                            sx={{
                                color: `${currentPlan.status === 'Ongoing'
                                    ? theme.palette.etal.main
                                    : theme.palette.primary.main
                                    }`,
                                mb: 1.5
                            }}
                        >
                            {currentPlan.status}
                        </Typography>

                        <Typography
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 600
                            }} >
                            {new Date(currentPlan.date).toLocaleDateString()}
                        </Typography>


                    </Box>

                </Stack>

                <Divider sx={{ my: 3 }} />
                <Stack
                    sx={{
                        gridTemplateColumns: isTwoColumns
                            ? { xs: 12, md: 6 }
                            : 12,
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{ fontWeight: 700 }}
                        gutterBottom
                    >
                        Treatment Steps
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: isTwoColumns
                                ? { xs: "1fr", md: "1fr 1fr" }
                                : "1fr",
                            gap: 2,
                            my: 2,
                        }}
                    >
                        {currentPlan.treatmentSteps.map((step, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems: "center"
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: "50%",
                                        bgcolor: theme.palette.etal.main,
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 700,
                                        flexShrink: 0,
                                    }}
                                >
                                    {index + 1}
                                </Box>

                                <Typography>
                                    {step}
                                </Typography>
                            </Stack>
                        ))}
                    </Box>
                </Stack>
                <Button
                    startIcon={<EditRounded />}
                    sx={{
                        whiteSpace: 'nowrap',
                        width: 120,
                        border: `2px solid ${theme.palette.etal.main}`,
                        bgcolor: theme.palette.etal.main,
                        color: theme.palette.primary.contrastText,
                        alignSelf: 'flex-start',
                        mt: 4,

                    }}
                    onClick={() => handleEdit()}
                >
                    Edit
                </Button>

            </Card>

        </Box>

    )
}

export default TreatmentPlanSection

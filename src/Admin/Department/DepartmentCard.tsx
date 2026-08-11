

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Skeleton,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardContainer from "../../Component/CardContainer";
import PulseDivider from "../../Component/Schedule/PluseDivider";
import { useGetDepartments } from "../../Hook/UseGetDepartments";

const DepartmentCard = () => {
    const theme = useTheme();
    const navigate = useNavigate();


    const { data, isLoading, isError } = useGetDepartments();

    if (isLoading) {
        return (
            <>
              {/* <Skeleton variant="rounded" width={345} height={300} /> */}
                <Typography sx={{ p: 2 }}>
                    Loading departments...
                </Typography>

            </>
        );
    }

    if (isError) {
        return (
            <Stack >

                <Typography
                    color="error"
                    sx={{ p: 2, color: theme.palette.etal.main }}
                >
                    Something went wrong while loading departments.
                </Typography>
                <PulseDivider />
            </Stack>
        );
    }

    return (
        <>
            {data?.data.map((department) => (
                <CardContainer key={department?.id}>
                    <Card
                        sx={{
                            my: 2,
                            bgcolor: theme.palette.background.default,
                            boxShadow: "0 4px 10px #9ed1d5",
                            px: 2,
                        }}
                    >
                        <CardHeader
                            subheader={department?.name}
                            sx={{
                                color: theme.palette.primary.main,
                            }}
                        />

                        <CardContent>
                            <Stack spacing={2}>
                                <Typography>
                                    {department?.description}
                                </Typography>


                                <Stack spacing={1}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 16,
                                        }}
                                    >
                                        Services
                                    </Typography>

                                    {department?.services?.length > 0 ? (
                                        department?.services.map((service) => (
                                            <Stack
                                                key={service.id}
                                                spacing={0.3}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {service.name}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {service.description}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    Price: {service.price}
                                                </Typography>
                                            </Stack>
                                        ))
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            No services available.
                                        </Typography>
                                    )}
                                </Stack>

                                <Button
                                    variant="outlined"
                                    sx={{
                                        alignSelf: "flex-start",
                                        whiteSpace: "nowrap",
                                        width: 140,
                                        border: `2px solid ${theme.palette.etal.main}`,
                                        color: theme.palette.etal.main,
                                    }}
                                    onClick={() =>
                                        navigate(
                                        '/dashboard/doctors'
                                        )
                                    }
                                >
                                    View Doctors
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </CardContainer>
            ))}
        </>
    );
};

export default DepartmentCard;
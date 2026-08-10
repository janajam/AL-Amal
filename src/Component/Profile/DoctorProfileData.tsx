import {
    MedicationOutlined,
    SummarizeOutlined
} from "@mui/icons-material";
import {
    Box,
    Stack,
    Typography,
    useTheme
} from "@mui/material";

import type { Doctor } from "../../Entities/AccountsData";
import LicensesSection from "./LicenessSection";

interface Props {
    doctor: Doctor;
}
const DoctorProfileData = ({ doctor }: Props) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                my: 3,
            }}
        >
            <Stack spacing={3}>

                <Stack
                    direction={"row"}
                    spacing={2}
                >
                    <MedicationOutlined sx={{
                        color: theme.palette.etal.main
                    }}
                    />
                    <Typography
                        sx={{
                            fontWeight: 600,
                        }}
                    >
                        Specialty:
                    </Typography>

                    <Typography>
                        {doctor.specialty?.name || "Not assigned"}
                    </Typography>
                </Stack>
                <Stack spacing={2}>
                    <Stack direction={'row'} spacing={2}>
                        <SummarizeOutlined
                            sx={{
                                color: theme.palette.etal.main
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Licenses:
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            ml: 5
                        }}
                    >
                        <LicensesSection
                            licenses={doctor.licenses ?? []}
                        />
                       
                    </Stack>


                </Stack>
            </Stack>
        </Box>
    );
};

export default DoctorProfileData;
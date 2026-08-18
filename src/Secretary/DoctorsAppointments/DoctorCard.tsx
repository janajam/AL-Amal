import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import CardContainer from "../../Component/CardContainer";
import type { DoctorListItem } from "../../Entities/DoctorData";
import getCroppedImageUrl from "../../apiServices/Image_URL";

interface Props {
  doctor: DoctorListItem;
  onClick?: () => void;
}

const DoctorCard = ({ doctor, onClick }: Props) => {
  const theme = useTheme();

  return (
    <Box>
      <CardContainer>
        <Card
          sx={{
            my: 2,
            bgcolor: theme.palette.background.default,
            boxShadow: "0 4px 10px #9ed1d5",
            px: 2,
          }}
          onClick={onClick}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <CardHeader
              subheader={doctor.name}
              title={doctor.role}
              sx={{
                color: theme.palette.primary.main,
              }}
            />

            <Typography
              sx={{
                mt: 2,
                color: doctor.is_active
                  ? theme.palette.etal.main
                  : theme.palette.secondary.main,
              }}
            >
              {doctor.is_active ? "ACTIVE" : "REVOKE"}
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ p: 2 }}>
            <Stack
              direction="row"
              spacing={{ xs: "20%", md: "30%", lg: "30%" }}
              sx={{
                alignItems: "center",
              }}
            >
              <CardMedia
                sx={{
                  height: 130,
                  width: 180,
                  borderRadius: 15,

                  [theme.breakpoints.down("md")]: {
                    height: 160,
                    width: 400,
                  },

                  [theme.breakpoints.only("md")]: {
                    height: 100,
                    width: 100,
                  },
                }}
                image={getCroppedImageUrl(doctor.image ?? "")}
                title="Doctor photo"
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                {doctor.email}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                sx={{
                  fontWeight: 550,
                  color: theme.palette.primary.main,
                }}
              >
                Phone Number:
              </Typography>

              <Typography>
                {doctor.phone}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </CardContainer>
    </Box>
  );
};

export default DoctorCard;
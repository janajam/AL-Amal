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
import getCroppedImageUrl from "../../apiServices/Image_URL";
import type { SecretaryListItem } from "../../Entities/SecrtaryData";

interface Props {
  secretary: SecretaryListItem;
  onClick?: () => void;
}

const SecretaryCard = ({ secretary, onClick }: Props) => {
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
              subheader={secretary.name}
              title={secretary.role}
              sx={{
                color: theme.palette.primary.main,
              }}
            />

            <Typography
              sx={{
                mt: 2,
                color: secretary.is_active
                  ? theme.palette.etal.main
                  : theme.palette.secondary.main,
              }}
            >
              {secretary.is_active ? "ACTIVE" : "REVOKE"}
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
                component="img"
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
                image={getCroppedImageUrl(secretary.image ?? "")}
                title="Secretary photo"
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                {secretary.email}
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
                {secretary.phone}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                sx={{
                  fontWeight: 550,
                  color: theme.palette.primary.main,
                }}
              >
                Department:
              </Typography>

              <Typography>
                {secretary?.department?.name}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </CardContainer>
    </Box>
  );
};

export default SecretaryCard;
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../Store/AuthStore";
import { useGetSecretary } from "../../Hook/UseGetSecretary"; // الـ Hook الجديد
import getCroppedImageUrl from "../../apiServices/Image_URL";
import AccountDetailsSkeleton from "../../Admin/Accounts/DetailsSkeleton";

const SecretaryDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userRole = useAuthStore((state) => state.role);
  const { id } = useParams();

  const { data, isLoading, isError } = useGetSecretary(Number(id));
  const secretary = data?.data;

  if (isLoading) {
    return (
      <Stack sx={{ py: 8 }}>
        <AccountDetailsSkeleton />
      </Stack>
    );
  }

  if (isError || !secretary) {
    return (
      <Typography
        sx={{
          p: 4,
          color: theme.palette.error.main,
        }}
      >
        Failed to load secretary details.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <ArrowBack
        sx={{
          mx: 2,
          mt: 2,
          cursor: "pointer",
          color: theme.palette.primary.main,
        }}
        onClick={() => navigate(-1)}
      />

      <Box
        sx={{
          width: "90%",
          bgcolor: theme.palette.background.default,
          justifySelf: "center",
          borderRadius: 1,
          p: 3,
          mb: 3,
          boxShadow: "0 2px 17px #9ed1d5",
        }}
      >
        {/* Header Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: "25%" }}
          sx={{
            alignItems: "center",
            mb: 4,
          }}
        >
          <CardMedia
            component="img"
            image={getCroppedImageUrl(secretary.image ?? "")}
            alt={secretary.name}
            sx={{
              width: 200,
              height: 180,
              borderRadius: 3,
            }}
          />

          <Stack spacing={1}>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: 30,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {secretary.name}
            </Typography>

            <Typography
              sx={{
                color: theme.palette.etal.main,
                fontWeight: 550,
                textAlign: "center",
              }}
            >
              {secretary.role}
            </Typography>

            <Typography
              sx={{
                fontWeight: 600,
                textAlign: "center",
                color: secretary.is_active
                  ? theme.palette.success?.main || "green"
                  : theme.palette.error.main,
              }}
            >
              {secretary.is_active ? "ACTIVE" : "INACTIVE"}
            </Typography>
          </Stack>
        </Stack>

        {/* Details Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifySpace: "space-between",
          }}
        >
          {/* LEFT: Contact Info */}
          <Stack spacing={2}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              Contact Information
            </Typography>

            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontWeight: 600 }}>Email:</Typography>
              <Typography>{secretary.email}</Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontWeight: 600 }}>Phone:</Typography>
              <Typography>{secretary.phone}</Typography>
            </Stack>

            <Divider
              sx={{
                height: "1.5px",
                width: "90%",
                bgcolor: theme.palette.etal.main,
              }}
            />

            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontWeight: 600 }}>Birthday:</Typography>
              <Typography>
                {secretary.birth_date
                  ? new Date(secretary.birth_date).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontWeight: 600 }}>Address:</Typography>
              <Typography>{secretary.address}</Typography>
            </Stack>
          </Stack>

          {/* RIGHT: Work Info */}
          <Stack spacing={2} sx={{ mt: { xs: 3, md: 0 } }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              Work Information
            </Typography>

            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontWeight: 600 }}>Department:</Typography>
              <Typography>
                {/* الوصول الآمن لاسم القسم */}
                {secretary.department?.name ?? "N/A"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Admin Actions */}
      {userRole === "admin" && (
        <Button
          variant="contained"
          sx={{
            my: 3,
            display: "block",
            ml: "auto",
            mr: "5%",
          }}
        >
          {secretary.is_active ? "Revoke" : "Unrevoke"}
        </Button>
      )}
    </Box>
  );
};

export default SecretaryDetails;
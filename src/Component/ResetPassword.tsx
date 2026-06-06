import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  type ResetPasswordInput,
  resetPasswordSchema,
} from "../Schema/ResetPasswordSchema";
import { useNavigate } from "react-router-dom";
import key from "../assets/Key 01 Icon _ Hugeicons.webp";
import reset from "../assets/Reset Password Icon _ Hugeicons.webp";
import { useRestPassword } from "../Hook/UseResetPassword";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useRestPassword()
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ResetPasswordInput) => {
    console.log("New password submitted:", data.password);
    // TODO: send data to your backend via Axios or React Query
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/signin')
      }
    })
  };

  return (
    <Stack>
      <Box
        sx={{
          backgroundImage: `url(${reset}) `,
          backgroundSize: "33%",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          fontWeight: 700,
          bgcolor: '#ebf2f3',
          height: "100vh"
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            maxWidth: 600,
            ml: "34%",
            mr: "5%",
            my: 9,
            borderRadius: 4,
            p: 6,
            [theme.breakpoints.down("sm")]: {
              mx: "4%",
              mt: "7%",
            },
          }}
        >
          <Typography
            color={theme.palette.primary.main}
            variant="h1"
            sx={{ mb: 3 }}>
            Reset Your Password
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button variant="contained" type="submit">
              Save New Password
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${key}) `,
          backgroundSize: "80%",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          fontWeight: 700,
          mt: "-18%",
          height: 200,
          width: 200,
          alignSelf: "end",
          [theme.breakpoints.down("md")]: {
            backgroundSize: "80%",
            mt: "-25%",
            height: 90,
            width: 100,
          },
        }}
      ></Box>
    </Stack>
  );
}

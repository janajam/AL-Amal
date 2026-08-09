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
  useTheme
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  type ResetPasswordInput,
  resetPasswordSchema,
} from "../Schema/ResetPasswordSchema";
import logo from '../assets/logo.webp'
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
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/signin')
      }
    })
  };

  return (
    <Stack sx={{ color: 'black' }}>
      <Box
        sx={{
          backgroundImage: `url(${logo}) `,
          backgroundSize: "43%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'left center',
          overflow: "hidden",
          fontWeight: 700,
          bgcolor: '#E8F2F3',
          height: "100vh",
          mt: -0.7,
          [theme.breakpoints.down('sm')]: {
            alignSelf: 'center'
          }
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
            ml: "38%",
            mr: "5%",
            my: 9,
            borderRadius: 4,
            p: 6,
            [theme.breakpoints.down("sm")]: {
              mx: "4%",
              mt: "7%",
            },
            border: '1px solid #2B5A6C ',
            boxShadow: "0 2px 17px #1A7B9B",

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
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              inputRef={register("password").ref}
              slotProps={{
                input: {
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
                },
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

    </Stack>
  );
}

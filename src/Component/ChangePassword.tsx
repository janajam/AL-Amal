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
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useChangePassword } from "../Hook/useChangPasssword";
import { changePasswordSchema, type ChangePasswordInput } from "../Schema/ChangePasswordSchema";



export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setpassword] = useState(false);
  const mutation = useChangePassword()
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ChangePasswordInput) => {
    console.log("New password submitted:", data.password);
    mutation.mutate(data, {
      onSuccess: () => {
        navigate(-1)
      }
    })
  };

  return (
    <Stack>
     <Box
        sx={{
          backgroundImage: `url(${logo}) `,
          backgroundSize: "43%",
          backgroundRepeat: "no-repeat",
          backgroundPosition:'left center',
          overflow: "hidden",
          fontWeight: 700,
          bgcolor: '#E8F2F3',
          height: "100vh",
          mt:-0.7,
          [theme.breakpoints.down('sm')]:{
            alignSelf:'center'
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
            sx={{
              mb: 3
            }}
          >
            Change Your Password
          </Typography>
          <Stack spacing={3}>

            <TextField
              label="Current Password"
              type={password ? "text" : "password"}
              {...register("passwordCurrent")}
              error={!!errors.passwordCurrent}
              helperText={errors.passwordCurrent?.message}
               inputRef={register("passwordCurrent").ref}
             
             slotProps={{
              input:{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setpassword(!password)}
                      edge="end"
                    >
                      {password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
              }}
            />

            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
               inputRef={register("password").ref}
               slotProps={{
                input:{
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
              }
              }}
            />
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              {...register("passwordConfirm")}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
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

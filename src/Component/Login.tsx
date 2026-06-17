'use client'

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme
} from "@mui/material"
import logo from '../assets/logo.webp'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../Hook/UseAuth";
import { loginSchema, type LoginInput } from "../Schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useContactWithAdmin } from "../Hook/UseContactWithAdmin";


const TypografyStylee = styled("a")(({ theme }) => ({
  cursor: "pointer",
  whiteSpace: "nowrap",
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
  fontSize: 12,
  margin: 2,
}));

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [contactEmail, setContactEmail] = useState("");
  const [contactAsk, setContactAsk] = useState("");
  const theme = useTheme();

  //for dialog 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const contactAdminMutation = useContactWithAdmin();

  const submitDialog = () => {
    contactAdminMutation.mutate({
      contactEmail,
      contactAsk
    })
    handleClose();
  };
  //
  //for hid and show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //to handle validation fron react-hook-form while the field change depandent on AuthInput rule
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const loginMutation = useAuth();

  const onSubmit = async () => {
    console.log(userName, password);
    loginMutation.mutate({
      userName,
      password,
    });
  };

  return (
    <Box sx={{
      backgroundColor: "white",
    }}>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          border: '1px solid #2B5A6C ',
          maxWidth: 600,
          mx: "auto",
          my: 3.8,
          p: 4,
          pt: 1,
          borderRadius: 3,
          boxShadow: "0 2px 17px #1A7B9B",
          fontWeight: 700,
          color: "#1A7B9B",
          [theme.breakpoints.down("sm")]: {
            mx: "3%",
            fontWeight: 500,

          }
        }} >
        <Box
          sx={{
            backgroundImage: `url(${logo}) `,
            backgroundSize: "200px",
            height: "110px",
            width: "200px",
            mx: 'auto',
            alignSelf: "center",
            backgroundRepeat: "no-repeat",
            [theme.breakpoints.down("sm")]: {
              mt: -2

            }
          }} />

        <Typography variant="h1" align="center"
          sx={{
            color: "#1C6280",
            [theme.breakpoints.down('sm')]: {
              fontVariant: 'h3'
            }
          }}
        >
          Login
        </Typography>
        <TextField
          label="User Name"
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: '#E8F2F3',
            borderRadius: '12px',
          }}
          {...register("userName")}
          error={!!errors.userName}
          helperText={errors.userName?.message}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.password}
              margin="normal"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                sx={{
                  backgroundColor: '#E8F2F3',
                  borderRadius: '12px'
                }}

                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"

                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>

                }
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
          <TypografyStylee sx={{ alignSelf: 'flex-end' }} onClick={() => navigate("/forgotPassword")}>
            Forgot Password?
          </TypografyStylee>

          <Button
            sx={{
              height: '50px',
              mt: '10px'
            }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={loginMutation.isPending}
            fullWidth
            startIcon={
              loginMutation.isPending && <CircularProgress size={20} />
            }
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
          <Stack sx={{ mt: 2 }}>
            <TypografyStylee sx={{
              color: 'black',
              "&:hover": {
                color: theme.palette.primary.main,
              },
              whiteSpace: 'wrap'
            }}>
              Don't Have an Account ? {" "}

              <Link
                sx={{
                  fontWeight: 900,
                  textDecorationLine: 'none',
                  fontSize: 14,
                  cursor: 'pointer',
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                }}
                onClick={() => { handleClickOpen() }}
              >
                Contact Adminstrator</Link>
            </TypografyStylee>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle sx={{
                fontSize: 20,
                color: "#1C6280",
                fontWeight: 700
              }}>Contact AdminStrator</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You can still reach us , please fill out our contact form here.
                  we will get back to you with your access details and any help you need .
                </DialogContentText>
                {contactAdminMutation.isSuccess && (
                  <Alert variant="outlined" severity="success" sx={{ mb: 2 }}>
                    Message sent successfully
                  </Alert>
                )}

                {contactAdminMutation.isError && (
                  <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
                    Sending failed. Please try again.
                  </Alert>
                )}

                <form
                  onSubmit={submitDialog}
                  id="subscription-form">
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setContactEmail(e.target.value)}
                  />

                  <TextareaAutosize
                    aria-label="Your Ask"
                    minRows={3}
                    name="ask"
                    placeholder="Your Ask "
                    style={{
                      width: '100%',
                      backgroundColor: '#E8F2F3',
                      border: 'none',
                      borderBottom: '1px solid #2B5A6C ',
                      fontSize: 16,
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderBottom = '2px solid #2B5A6C';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottom = '1px solid #2B5A6C';
                    }}

                    onChange={(e) => setContactAsk(e.target.value)}

                  />

                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="subscription-form"
                  disabled={contactAdminMutation.isPending}
                  sx={{ bgcolor: "#1C6280", color: 'white' }}
                  startIcon={
                    contactAdminMutation.isPending
                      ? <CircularProgress size={16} />
                      : null}>
                  {contactAdminMutation.isPending
                    ? 'Sending...' :
                    'Contact'}
                </Button>
              </DialogActions>
            </Dialog>

          </Stack>
        </Box>
      </Box>

    </Box>

  )
}

export default Login

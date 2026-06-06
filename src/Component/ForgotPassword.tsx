import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterEmail from "./EnterEmail";
import OTP from "./OTP";
import amal from '../assets/amal.webp'

const steps = ["Enter Email", "Varification Email"];

export default function ForgotPassword() {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);



  const handleFinalSubmit = async () => {
    console.log("Submitting data:");

  };

  return (
    <Box
      sx={{
        bgcolor: '#ffff',
        minHeight: '100%'
      }}>
      <Stack direction={"row"}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography
          sx={{
            m: 2,
            variant: "h1",
            fontWeight: 700,
            fontSize: 24,
            color: "#1C6280",

          }}>
          Forgot Password
        </Typography>
      </Stack>

      <Typography
        sx={{
          mx: 8
        }}>
      </Typography>

      <Box sx={{ width: "80%", mx: "auto", mt: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          sx={{
            mt: 4,
            position: "relative",
            minHeight: { xs: 280, md: 380 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${amal})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: { xs: "contain", md: "auto 90%" },
              backgroundPosition: { xs: "center top ", md: "left bottom " },
              opacity:{xs:0.3,md:0.8},
              ml: { xs: 0, md: -30 },
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: { xs: "100%", sm: "90%", md: "80%" },
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
            }}
          >
            {activeStep === 0 && <EnterEmail onNext={handleNext} />}
            {activeStep === 1 && (
              <OTP onBack={handleBack} onSubmit={handleFinalSubmit} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
    // </Box >
  );
}


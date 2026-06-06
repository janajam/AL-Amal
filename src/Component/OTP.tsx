import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormHelperText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PinField from "react-pin-field";
import { useNavigate } from "react-router-dom";
import { useOtpStore } from "../Store/UseOtpStore";
import { useOtpVerify } from "../Hook/UseOtpVarify";
import { otpSchema, type OtpInput } from "../Schema/OTPSchema";


type Props = {
  onBack: () => void;
  onSubmit: () => void;
};

export default function OtpVerification({ onBack, onSubmit }: Props) {
  const pinRef = useRef(null);
  const [showTimer, setShowTimer] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const { setData } = useOtpStore();
  const mutation = useOtpVerify();
  const navigate = useNavigate();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const Submit = (data: OtpInput) => {
    console.log("OTP submitted:", data.code);

    setData(data);
    console.log(data);
    // Send code to your backend for verification
    mutation.mutate(
      data, {
      onSuccess: () => {
        console.log("Submitting data:");
        navigate("/resetPassword");
      },
    }
    )
    onSubmit();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0 && minutes === 0) {
        clearInterval(interval);
        setShowTimer(false);
      }
      if (seconds === 0 && minutes !== 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const theme = useTheme();
  return (
    <form onSubmit={handleSubmit(Submit)} noValidate>
      <Stack
        spacing={4}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 1,
          textAlign: "center",
          bgcolor: "#ebf2f3"

        }}
      >
        <Typography color={theme.palette.primary.main} variant="h2">
          Verify your Email
        </Typography>
        <Typography
          color={theme.palette.primary.main}
          sx={{
            fontSize: 15,
            textAlign: "center"

          }}
        >
          {" "}
          We have sent the code verification to your Email.
        </Typography>

        <Stack
          sx={{
            direction: "row",
            alignContent: "center"
          }}
          spacing={2}>
          <PinField
            length={6}
            ref={pinRef}
            type="numeric"
            onChange={(value) => setValue("code", value)}
            style={{
              width: "60%",
              height: "50px",
              fontSize: "20px",
              textAlign: "center",
              //  marginLeft:'8%',
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "8px",
              backgroundColor: "transparent",
            }}
          />
        </Stack>
        {errors.code && (
          <FormHelperText sx={{ mt: 2, color: "red" }}>
            {errors.code.message}
          </FormHelperText>
        )}

        <Stack
          sx={{
            direction: "row",
            alignSelf: "center",
            whiteSpace: "nowrap"

          }}
          spacing={2}
        >
          {!showTimer ? (
            <>
              <Typography color={theme.palette.secondary.main}>
                Didn't receive the code yet?
              </Typography>
              <Typography
                color={theme.palette.primary.main}
                onClick={() => {
                  setShowTimer(true);
                  setSeconds(59);
                  setMinutes(1);
                }}
                sx={{ cursor: "pointer" }}
              >
                Send Again{" "}
              </Typography>
            </>
          ) : (
            <Typography
              sx={{
                color: "black",
                mt: "35px",
                ml: "140px"
              }}
            >
              Resend in {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
          )}
        </Stack>

        <Stack
          sx={{
            direction: "row",
            justifyContent: "space-between",
            mt: 4
          }}
          spacing={2}
        >
          <Button
            variant="outlined"
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.contrastText,
            }}
            onClick={onBack}
          >
            Back
          </Button>
          <Button variant="contained" type="submit">
            Send
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

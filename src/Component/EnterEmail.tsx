import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSendEmail } from "../Hook/useSendEmail";
import { useForgotStore } from "../Store/UseForgotStore";
import { forgotSchema, type ForgotInfo } from "../Schema/ForgotSchema";
type Props = {
  onNext: () => void;
};

export default function EnterEmail({ onNext }: Props) {
  // const [email, setEmail] = useState("");
  const { data, setData } = useForgotStore();
  const theme = useTheme();
  const mutation = useSendEmail();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInfo>({
    resolver: zodResolver(forgotSchema),
    mode: "onChange",
    defaultValues: {
      email: data.email || "",
    },
  });

  const onSubmit = (values: ForgotInfo) => {

    setData(values);
    console.log(values);
    //Send varification code to email
    mutation.mutate(values, {
      onSuccess: () => {
        console.log('success');
      }
    }
    )
    //move to next step
    console.log("next");
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* <Stack
        sx={{
          direction: "row",
          bgcolor: '#ffff'
        }}> */}
        {/* <Box
          sx={{
            height: 400,
            width: 700,
            // backgroundImage: `url(${amal}) `,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            ml: "-20%",
          }}
        ></Box> */}
        <Stack
        spacing={4}
          sx={{
            
            maxWidth: 700,
            mx: "auto",
            //  ml:'40%',
             mt:-12,
            ml: { xs: 0, md:'30%' },
            zIndex: 1
          }}>

          <Typography
            color={theme.palette.primary.main}
            sx={{
              fontSize: 15,
              fontWeight:600,
              textAlign: "center"
            }}
          >
            {" "}
            Please enter your email so we can help you verify your account.
          </Typography>
          <TextField
            label="Email"
            type="email"
            // value={email}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            // sx={{ 
            // backgroundColor: '#E8F2F3',
            // borderRadius:'12px'
            //  }}
          // onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 140, alignSelf: "end", whiteSpace: "nowrap" }}
          >
            Send code
          </Button>
        </Stack>
      {/* </Stack> */}
    </form>
  );
}

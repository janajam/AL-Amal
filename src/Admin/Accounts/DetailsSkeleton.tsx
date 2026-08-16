import { ArrowBack } from "@mui/icons-material";
import {
    Box,
    Skeleton,
    Stack,
    useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccountDetailsSkeleton = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
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
                            bgcolor: 'transparent',
                            justifySelf: "center",
                            borderRadius: 1,
                            p: 3,
                            mt:-23,
                            alignItems:'center',
                            mx:8
                        }}
                    >

            <Stack

                sx={{
                    // mt: -25
                }}
            >
                <Skeleton width={'100%'} height={800} sx={{
                    bgcolor: '#ced9d9',
                    alignSelf: 'center',
                }} />

                <Skeleton width={'100%'} height={800} sx={{
                    bgcolor: '#ced9d9',
                    alignSelf: 'center',
                    mt: -30
                }} />

            </Stack>
            </Box>
        </>
    );
};

export default AccountDetailsSkeleton;
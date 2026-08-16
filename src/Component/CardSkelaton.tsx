import {
  Skeleton,
  Stack
} from "@mui/material";

const CardSkeleton = () => {

  return (
    <>

      <Stack

       >
        <Skeleton width={'88%'} height={320} sx={{
          bgcolor: '#ced9d9',
          alignSelf: 'center',
        }} />

        <Skeleton width={'88%'} height={320} sx={{
          bgcolor: '#ced9d9',
          alignSelf: 'center',
          
        }} />
        <Skeleton width={'88%'} height={320} sx={{
          bgcolor: '#ced9d9',
          alignSelf: 'center',
          
        }} />

      </Stack>
    </>
  );
};

export default CardSkeleton;

import {
  Box,
  Grid,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import AnimatedNumber from "./Dashboard/AnimatedNumber";
import AppointmentByWeekChart from "./Dashboard/AppointmentByWeekChart";
import RecentComplaints from "./Dashboard/RecentComplaints";
import RecentAction from "./Dashboard/RecentAction";

const cards = [
  { label: 'Todays Visitid', value: 100 },
  { label: 'Total Users', value: 1000 },
  { label: 'New Complains', value: 500 }
];

export default function AdminDashboard() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        mt: 2,
        bgcolor: theme.palette.background.default,
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box'
      }}>

      <Grid
        container
        spacing={6}
        columns={{ xs: 1, sm: 2, md: 3 }}
        size={{ xs: 10, sm: 6, md: 6, lg: 4 }}
        offset={{ xs: 1, md: 0 }}

        sx={{
          justifyContent: 'center',
          mb: 2
        }}
      >
        {cards.map((card) =>
          <Box
            key={card.label}
            sx={{
              width: 185,
              height: 90,
              bgcolor:
                `${card.label === 'Total Users' ?
                  theme.palette.primary.main :
                  theme.palette.etal.main
                }`,
              borderRadius: 1,
              color: theme.palette.primary.contrastText,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}>
            <Stack direction={'column'}>
              <Typography>{card.label}</Typography>
              <Typography sx={{ textAlign: "center" }}>
                <AnimatedNumber end={card.value} duration={1} />
              </Typography>
            </Stack>
          </Box>
        )}
      </Grid>

      <Grid
        container
        spacing={3}
        sx={{
          alignItems: "stretch",
          my: 4,
          mx: 'auto'
        }}>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              height: '90%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <AppointmentByWeekChart />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>

          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              p: 2,
              height: '90%',
              borderRadius: 1,
              boxShadow: '0 4px 10px #9ed1d5',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            <RecentComplaints />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 12 }}
          sx={{ justifySelf: 'center',
            mt:-3,
            mb:2
           }}
        >
          <RecentAction />
        </Grid>
      </Grid>
    </Box>
  );
}

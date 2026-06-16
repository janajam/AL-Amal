import { Box, Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid"
import AnimatedNumber from "./AnimatedNumber";

const cards = [
  { label: 'Todays Visitid', value: 100 },
  { label: 'Total Users', value: 1000 },
  { label: 'New Complains', value: 500 }
]

export default function AdminDashboard() {
  const theme = useTheme()
  return (
    <Grid spacing={4}
      sx={{
        [theme.breakpoints.not('xs')]: { ml: '9%' },
        p: 1, mt: 2,
        bgcolor: theme.palette.background.default,
      }}>

      <Grid
        container
        spacing={6}
        columns={{ xs: 1, sm: 2, md: 3 }}
        size={{ xs: 10, sm: 6, md: 6, lg: 4 }}
        offset={{ xs: 1, md: 0 }}>
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
            }}><Stack direction={'column'}>

              <Typography>{card.label}</Typography>
              <Typography sx={{ textAlign: "center" }}>
                <AnimatedNumber end={card.value} duration={1} />
              </Typography>
            </Stack>
          </Box>

        )}
      </Grid>
     
    </Grid>
  )
}
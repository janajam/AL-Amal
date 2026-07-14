import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import AnimatedNumber from "../../Component/AnimatedNumber";


const cards = [
  { label: 'Appointments Today ', value: 6 },
  { label: 'Total Patients', value: 168 },
  { label: 'Off Days', value: 3 }
];

const StatisticCard = () => {
    const theme=useTheme()
  return (
    <div>
         
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
                `${card.label === 'Total Patients' ?
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

      
    </div>
  )
}

export default StatisticCard


import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts';

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AppointmentByWeekChart() {
  const theme = useTheme();

  const series = [
    {
      id: 'appointments',
      label: 'Appointments',
      data: [12, 19, 7, 15, 10, 5, 8],
      color: theme.palette.etal.main,
    },
  ];

  return (
    <Box sx={{
      width: '100%',
      height: 350,
      p: 2,
      bgcolor: theme.palette.background.default,
      borderRadius: 1,
      boxShadow: "0 4px 15px #9ed1d5",
    }}>
      <BarChart
        series={series}
        xAxis={[{ data: labels, scaleType: 'band' }]}
        yAxis={[{ min: 0, max: 20 }]}
        margin={{ top: 40, bottom: 40, left:7, right: 10 }}
      />
    </Box>
  );
}

import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Card, CardContent, IconButton, Stack, Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"

const cards = [
  { name: 'A', status: 'open' },
  { name: 'B', status: 'open' },
  { name: 'C', status: 'open' }

]
const RecentComplaints = () => {

  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: '100%',

      }}
    >
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontSize: 17,
          fontWeight: 700
        }}
      >
        Recent Complains
      </Typography>
      {cards.map((card) => (
        <Card sx={{
          my: 1,
          bgcolor: theme.palette.background.paper
        }}>

          <CardContent>
            <Stack direction={'row'} sx={{
              justifyContent: 'space-between'
            }}>
              <Typography>{card.name}</Typography>
              <Typography>{card.status}</Typography>
            </Stack>
          </CardContent>
        </Card>

      ))}
      <Button
        sx={{
          justifyContent: 'center',
          ml: 4,
          alignSelf: 'center',
          mb: 2,
          color: theme.palette.primary.main,
          fontWeight: theme.typography.h3,
          ':hover':theme.palette.etal.main
        }}
        onClick={()=>navigate('/dashboard/complains')}
        >
        <IconButton>
          <ArrowBack sx={{
            color: theme.palette.primary.main
          }} />
        </IconButton>
        View All
      </Button>
    </Box>
  )
}

export default RecentComplaints

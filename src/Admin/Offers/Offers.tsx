import { Button, useTheme } from '@mui/material'
import OfferCard from './OfferCard'

const Oferrs = () => {
  const theme = useTheme()
  return (
    <div>
      <OfferCard />
      <Button
        sx={{
          width: 160,
          height:50,
          color: 'white',
          bgcolor: theme.palette.primary.main,
          ml:'80%',
          mt:3
          }}
      >
        Create Offer

      </Button>

    </div>
  )
}

export default Oferrs

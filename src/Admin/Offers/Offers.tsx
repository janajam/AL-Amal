import { Button, useTheme } from '@mui/material'
import OfferCard from './OfferCard'
import CreateOfferDialog from './CreateOfferDialog'
import { useState } from 'react'

const Oferrs = () => {
  const theme = useTheme()
  const [dialogOpen, setDialogOpen] = useState(false);
      
  return (
    <div>
      <OfferCard />
      <Button
        sx={{
          width: 160,
          height: 50,
          color: 'white',
          bgcolor: theme.palette.primary.main,
          ml: '80%',
          mt: 3
        }}
        onClick={()=>setDialogOpen(true)}
      >
        Create Offer

      </Button>
          <CreateOfferDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
           />
      
    </div>
  )
}

export default Oferrs

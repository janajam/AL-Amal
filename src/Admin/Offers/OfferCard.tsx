
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, useTheme } from "@mui/material"
import CardContainer from "../../Component/CardContainer"
import { useGetOffers } from "../../Hook/UseGetOffers"
import { useState } from "react"
import type { OfferData } from "../../Entities/OfferData"
import EditOfferDialog from "./EditOfferDialog"



//for test 
const offers : OfferData[] = [
    {
        id: 1, status: 'Ongoing', title: 'AA', startTime: '12/7_9:00', endTime: '12/7_11:00', description: 'description'
    },
    {
        id: 2, status: 'Expired', title: 'BB', startTime: '12/7-10:00', endTime: '12/7-11:00', description: 'description'
    },
    {
        id: 3, status: 'Ongoing', title: 'CC', startTime: '12/7-11:00', endTime: '12/7-12:00', description: 'description'
    },
    {
        id: 3, status: 'Expired', title: 'CC', startTime: '12/7-11:00', endTime: '12/7-12:00', description: 'description'
    }
]

const OfferCard = () => {
    const theme = useTheme()

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<OfferData | null>(null);

    ;

    const handleEdit = (offer: OfferData) => {

        setSelectedOffer(offer);

        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const {data}=useGetOffers()
    return (
        <Box>

            {/* {data?.data.map*/}
            {offers.map
                (offer => (
                    <CardContainer>
                        <Card
                            key={offer.id}
                            sx={{
                                my: 2,
                                bgcolor: `${offer.status === 'Ongoing'
                                    ? theme.palette.background.default
                                    : theme.palette.background.paper}`,
                                boxShadow: `${offer.status === 'Ongoing'
                                    ? '0 4px 10px #9ed1d5'
                                    : 'non'}`,
                                px: 2
                            }}>
                            <Stack
                                direction={'row'}
                                sx={{
                                    justifyContent: 'space-between'
                                }}>
                                <CardHeader
                                    subheader={offer.title}
                                    sx={{
                                        color: theme.palette.primary.main,
                                    }}
                                />
                                <Typography
                                    sx={{
                                        mt: 2,
                                        mr: 3,
                                        fontWeight: 550,
                                        fontSize: 16,
                                        color: `${offer.status === 'Expired'
                                            ? theme.palette.primary.main
                                            : theme.palette.etal.main
                                            }`
                                    }}
                                >
                                    {offer.status}
                                </Typography>
                            </Stack>
                            <CardContent>

                                <Stack spacing={1.5}>

                                    <Typography >
                                        {offer.description}
                                    </Typography>

                                    <Stack direction={'row'} sx={{
                                        justifyContent: 'space-between'
                                    }}>

                                        <Typography>
                                            Period: {offer.startTime} - {offer.endTime}
                                        </Typography>

                                    </Stack>

                                    <Button
                                        variant='outlined'
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            width: 120,
                                            border: `2px solid ${theme.palette.etal.main}`,
                                            color: theme.palette.etal.main,
                                            alignSelf: 'flex-end'
                                        }}
                                        onClick={() => handleEdit(offer)}
                                    >
                                        Edit
                                    </Button>


                                </Stack>
                            </CardContent>
                        </Card>
                    </CardContainer>
                ))
            }
            <Box>

                <EditOfferDialog
                    open={dialogOpen}
                    offer={selectedOffer}
                    onClose={handleClose}
                />

            </Box>
        </Box>
    )
}

export default OfferCard


import { Box, Button, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material"
import CardContainer from "../../Component/CardContainer"
import { useGetOffers } from "../../Hook/UseGetOffers"



//for test 
const offers = [
    {
        id: 1, status: 'Ongoing', name: 'AA', startTime: '12/7-9:00', endTime: '12/7-11:00', description: 'description'
    },
    {
        id: 2, status: 'Expired', name: 'BB', startTime: '12/7-10:00', endTime: '12/7-11:00', description: 'description'
    },
    {
        id: 3, status: 'Ongoing', name: 'CC', startTime: '12/7-11:00', endTime: '12/7-12:00', description: 'description'
    },
    {
        id: 3, status: 'Expired', name: 'CC', startTime: '12/7-11:00', endTime: '12/7-12:00', description: 'description'
    },


]

const OfferCard = () => {
    const theme = useTheme()
    // const {data}=useGetOffers()
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
                                    subheader={offer.name}
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
                                    >
                                        Edit
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </CardContainer>
                ))
            }
        </Box>
    )
}

export default OfferCard

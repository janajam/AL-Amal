import { Box, Button, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material"
import CardContainer from "../../Component/CardContainer"

const cards = [
    { clientName: 'AA', subject: 'subject', description: 'description', status: 'open' },
    { clientName: 'BB', subject: 'subject', description: 'description', status: 'open' },
    { clientName: 'CC', subject: 'subject', description: 'description', status: 'open' },
    { clientName: 'DD', subject: 'subject', description: 'description', status: 'open' },


]

const ComplaintCard = () => {
    const theme = useTheme()
    return (
        <Box>
            {cards.map(card => (
                <CardContainer>

                    <Card sx={{
                        my: 2,
                        bgcolor: theme.palette.background.default,
                        boxShadow: '0 4px 10px #9ed1d5',
                        px: 2
                    }}>
                        <CardHeader
                            subheader={card.clientName}
                            title={card.subject}
                            sx={{
                                color: theme.palette.primary.main,

                            }}
                        />

                        <CardContent>
                            <Stack direction={'row'} sx={{
                                justifyContent: 'space-between'
                            }}>
                                <Typography>{card.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis accusamus voluptatibus tenetur dolor. Hic, itaque fugit sit, provident ullam numquam deleniti autem rerum nihil iure commodi quae unde nesciunt libero!</Typography>
                                <Typography>{card.status}</Typography>
                            </Stack>
                            <Button
                                variant='contained'
                                sx={{
                                    bgcolor: theme.palette.etal.main,
                                    width: 150,
                                    height: 40,
                                    mt: 3,
                                    ml: '77%'
                                }}

                            >
                                Respose
                            </Button>
                        </CardContent>
                    </Card>
                </CardContainer>


            ))}
        </Box>
    )
}

export default ComplaintCard

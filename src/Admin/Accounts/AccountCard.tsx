import { Box, Card, CardHeader, CardMedia, Stack, Typography, useTheme } from '@mui/material'
import CardContainer from '../../Component/CardContainer'
import logo from '../../assets/amal.webp'
import { useNavigate } from 'react-router-dom'


const accounts = [
    {
        id: 1, name: 'A', email: 'A1@email.com', phoneNumber: 'string', birthDay: '1990',
        image: { logo },
        role: "Doctor",
        status: "ACTIVE",
        createdAt: '10-2-2022',
        specialty: 'string'
    },
    {
        id: 2, name: 'B', email: 'B2@email.com', phoneNumber: 'string', birthDay: '1990',
        image: { logo },
        role: "Secretary",
        status: "ACTIVE",
        createdAt: '22'
    },

    {
        id: 3, name: 'C', email: 'C3@email.com', phoneNumber: 'string', birthDay: '1990',
        image: { logo },
        role: "Doctor",
        status: "REVOKED",
        username: 'string',

        createdAt: '22'
    },



]
const AccountCard = () => {
    const theme = useTheme()
    const navigate =useNavigate()

    return (
        <Box>
            {accounts.map((account) => (
                <CardContainer>
                    <Card key={account.id}
                        sx={{
                            my: 2,
                            bgcolor: theme.palette.background.default,
                            boxShadow: '0 4px 10px #9ed1d5',
                            px: 2
                        }}
                        onClick={() => navigate(`/accounts/${account.id}`)}
                        >
                        <Stack direction={'row'} sx={{
                            justifyContent: 'space-between'
                        }}>
                            <CardHeader
                                subheader={account.name}
                                title={account.role}
                                sx={{
                                    color: theme.palette.primary.main,

                                }}
                            />
                            <Typography sx={{
                                mt: 2,
                                color: `${account.status === 'ACTIVE'
                                    ? theme.palette.etal.main
                                    : theme.palette.secondary.main}`
                            }}>
                                {account.status}
                            </Typography>

                        </Stack>
                        <Stack spacing={2} sx={{
                            p: 2
                        }}>
                            <Stack direction={'row'}
                                spacing={{ xs: '20%', md: '30%', lg: '30%' }}

                                sx={{
                                    alignItems: 'center',
                                }}>
                                <CardMedia
                                    sx={{
                                        height: 100,
                                        width: 180,
                                        borderRadius: 15,
                                        [theme.breakpoints.down('md')]: {
                                            height: 160,
                                            width: 400,
                                        },
                                        [theme.breakpoints.only('md')]: {
                                            height: 100,
                                            width: 100,
                                        }

                                    }}
                                    image={logo}
                                    title="Account photo"
                                />

                                <Typography sx={{ fontWeight: 700, fontSize: 17 }}>{account.email}</Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={1}>
                                <Typography
                                    sx={{
                                        fontWeight: 550,
                                        color: theme.palette.primary.main
                                    }}>
                                    Phone Number :
                                </Typography>
                                <Typography> {account.phoneNumber}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography
                                    sx={{
                                        fontWeight: 550,
                                        color: theme.palette.primary.main
                                    }}>

                                    Specialty :
                                </Typography>
                                <Typography>{account.specialty}</Typography>

                            </Stack>
                            <Stack direction={'row'} spacing={1}>
                                <Typography
                                    sx={{
                                        fontWeight: 550,
                                        color: theme.palette.primary.main
                                    }}>
                                    Created At :
                                </Typography>
                                <Typography>{account.createdAt}</Typography>
                            </Stack>

                        </Stack>


                    </Card>
                </CardContainer>
            ))}
        </Box>
    )
}

export default AccountCard

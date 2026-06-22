
import { ArrowBack } from '@mui/icons-material'
import { Box, Button, CardMedia, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/amal.webp'


const accounts = [
    {
        id: 1, name: 'Jana Jammoul', email: 'A1@email.com', phoneNumber: 'string', birthDay: '1990',
        image: { logo },
        role: "Doctor",
        status: "ACTIVE",
        createdAt: '10-2-2022',
        specialty: 'string',
        address: 'Lorem ipsum dolor sit amet. ',
        department: 'lorem ipsum'
    },
]
const AccountDetails = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    return (
        <>

            <ArrowBack
                sx={{
                    mx: 2,
                    mt: 1,
                    color: theme.palette.primary.main
                }}
                onClick={() => navigate(-1)}
            />

            <Box
                sx={{
                    width: '90%',
                    height: '100%',
                    bgcolor: theme.palette.background.default,
                    mb: 3,
                    justifySelf: 'center',
                    borderRadius: 3,
                    p: 2,
                    boxShadow: "0 2px 17px #9ed1d5",
                }}
            >
                {accounts.map((account) => (

                    <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }}
                        spacing={{ xs: 3, md: '28%' }}
                        sx={{
                            alignSelf: 'center',
                            px: 5,
                            [theme.breakpoints.down('sm')]: {
                                justifyContent: 'center'
                            }
                        }}>

                        <CardMedia
                            sx={{
                                height: 200,
                                width: 200,
                                borderRadius: 15,
                                [theme.breakpoints.down('md')]: {
                                    height: 160,
                                    width: 200,
                                },
                            }}
                            image={logo}
                            title="place photo"
                        />
                        <Stack>
                            <Typography
                                sx={{
                                    fontSize: 30,
                                    fontWeight: 550,
                                    textAlign: 'center',
                                    justifySelf: 'center',
                                    color: theme.palette.primary.main,
                                    mt: 6,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {account.name}
                            </Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.etal.main
                                }}
                            >
                                {account.role}
                            </Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.etal.main
                                }}
                            >
                                {account.specialty}
                            </Typography>
                        </Stack>
                    </Stack>

                ))}

                <Stack
                    sx={{
                        justifyContent: 'space-between'
                    }}
                    direction={{ xs: 'column', sm: 'column', md: 'row' }}

                >

                    {accounts.map(account => (
                        <Stack
                            sx={{
                                mx: '7%',
                                my: 2,
                            }}>
                            <Typography
                                sx={{
                                    fontWeight: 550,
                                    fontSize: 18,
                                }}
                            >
                                Contect Info :
                            </Typography>
                            <Stack
                                direction={'row'}
                                spacing={2}
                                sx={{ my: 2 }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                    }}>
                                    Email :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                    }}
                                >
                                    {account.email}
                                </Typography>
                            </Stack>
                            <Stack
                                direction={'row'}
                                spacing={2}
                                sx={{ mb: 2 }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                    }}>
                                    Phone Number :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                    }}
                                >
                                    {account.phoneNumber}
                                </Typography>
                            </Stack>
                            <Divider sx={{
                                width: '90%',
                                height: '1.5px',
                                bgcolor: theme.palette.etal.main,
                            }} />
                            <Stack direction={'row'} spacing={2}
                                sx={{
                                    my: 2
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                    }}>
                                    Birth Day :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                    }}
                                >
                                    {account.birthDay}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2}
                                sx={{
                                    mb: 2
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                        whiteSpace:'nowrap'
                                        
                                    }}>
                                    Address :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                    }}
                                >
                                    {account.address}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2}
                                sx={{
                                    color: 'gray'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                        whiteSpace:'nowrap'
                                        
                                    }}>
                                    Created At :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                    }}
                                >
                                    {account.createdAt}
                                </Typography>
                            </Stack>
                        </Stack>
                    ))}

                    {accounts.map((account) => (
                        <Stack sx={{
                            mx: '7%',
                            my: 2,
                        }}>
                            <Stack direction={'row'} spacing={2}
                              >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                        whiteSpace:'nowrap'
                                        
                                    }}>

                                    Department :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,

                                    }}
                                >
                                    {account.department}
                                </Typography>
                            </Stack>

                            <Stack direction={'row'} spacing={2}
                                sx={{
mb:2
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                        whiteSpace:'nowrap'
                                        
                                    }}>

                                    licenses :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,

                                    }}
                                >
                                    {account.address}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} spacing={2}
                                sx={{
mb:2
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        fontWeight: 550,
                                        whiteSpace:'nowrap'

                                    }}>

                                    Work days :
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,

                                    }}
                                >
                                    {account.address}
                                </Typography>
                            </Stack>
                            <Button
                                sx={{
                                    width:160,
                                    bgcolor: `${account.status === 'REVOKED'
                                        ? theme.palette.etal.main
                                        : theme.palette.secondary.main}`,
                                    
                                    alignSelf:'end',
                                    [theme.breakpoints.down('sm')]:{
                                     alignSelf:'center'
                                    }
                                }}
                            >
                                {account.status === 'ACTIVE'
                                    ? 'Revok'
                                    : 'UnRevoke'}
                            </Button>
                        </Stack>
                    ))}
                </Stack>

            </Box></>
    )
}

export default AccountDetails

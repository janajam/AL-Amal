
import { Box, Button, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material"
import CardContainer from "../../Component/CardContainer"
import { useGetDepartments } from "../../Hook/UseGetDepartments"
import { useNavigate } from "react-router-dom"


//for test 
const departments = [
    {
        id: 1, name: 'AA', doctorNumber: 4, secretariesNumber: 2, description: 'description', specialty: {
            id: 1, name: 'specialty'
        }
    },
    {
        id: 2, name: 'BB', doctorNumber: 5, secretariesNumber: 2, description: 'description', specialty: {
            id: 2, name: 'specialty'
        }
    },
    {
        id: 3, name: 'CC', doctorNumber: 3, secretariesNumber: 2, description: 'description', specialty: {
            id: 3, name: 'specialty'
        }
    },
    {
        id: 4, name: 'DD', doctorNumber: 7, secretariesNumber: 2, description: 'description', specialty: {
            id: 4, name: 'specialty'
        }
    },


]

const DepartmentCard = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    // const {data}=useGetDepartments ()
    return (
        <Box>

            {/* {data?.data.map*/}
            {departments.map
                (department => (
                    <CardContainer>
                        <Card
                            key={department.id}
                            sx={{
                                my: 2,
                                bgcolor: theme.palette.background.default,
                                boxShadow: '0 4px 10px #9ed1d5',
                                px: 2
                            }}>
                            <CardHeader
                                subheader={department.name}
                                sx={{
                                    color: theme.palette.primary.main,
                                }}
                            />
                            <CardContent>
                                <Stack spacing={1.5}>
                                    <Typography
                                        key={department.specialty.id}
                                        sx={{
                                            fontWeight: 550,
                                            fontSize: 16
                                        }}>
                                        Specialty : {department.specialty.name}
                                    </Typography>
                                    <Typography >
                                        {department.description}
                                    </Typography>

                                    <Stack direction={'row'} sx={{
                                        justifyContent: 'space-between'
                                    }}>

                                        <Typography>
                                            Doctors : {department.doctorNumber}
                                        </Typography>
                                        <Button
                                            variant='outlined'
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                width: 140,
                                                border: `2px solid ${theme.palette.etal.main}`,
                                                color: theme.palette.etal.main
                                            }}

                                            onClick={() =>
                                                navigate(
                                                    `/accounts?role=Doctor&department=${department.id}`
                                                )
                                            }
                                        >


                                            Veiw Doctors
                                        </Button>
                                    </Stack>
                                    <Stack direction={'row'} sx={{
                                        justifyContent: 'space-between'
                                    }}>

                                        <Typography>
                                            Secretaries : {department.secretariesNumber}
                                        </Typography>
                                        <Button
                                            variant='outlined'
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                width: 160,
                                                border: `2px solid ${theme.palette.etal.main}`,
                                                color: theme.palette.etal.main
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/accounts?role=Secretary&department=${department.id}`
                                                )
                                            }
                                        >
                                            Veiw Secretaries

                                        </Button>

                                    </Stack>
                                </Stack>
                            </CardContent>

                        </Card>
                    </CardContainer>
                ))
            }
        </Box>
    )
}

export default DepartmentCard

import { Box, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material"
import CardContainer from "../../Component/CardContainer"
import { useNavigate } from "react-router-dom"
import { useGetPatients } from "../../Hook/UseGetPatients"


//for test 
const patients = [
  {
    id: 1, name: 'AA', email: 'aa@email.com', birthDay: '2/4/2001', gander: 'mail', address: 'address', phoneNumber: '5555', medicalRecord: {
      id: 1, allergies: ['allergy1', 'allergy2']
    }
  },
  {
    id: 2, name: 'BB', email: 'BB@email.com', birthDay: '2/4/2001', gander: 'mail', address: 'address', phoneNumber: '5555', medicalRecord: {
      id: 1, allergies: ['allergy1', 'allergy2']
    }
  },
  {
    id: 3, name: 'CC', email: 'CC@email.com', birthDay: '2/4/2001', gander: 'mail', address: 'address', phoneNumber: '5555', medicalRecord: {
      id: 1, allergies: ['allergy1', 'allergy2']
    }
  },
  {
    id: 4, name: 'DD', email: 'DD@email.com', birthDay: '2/4/2001', gander: 'mail', address: 'address', phoneNumber: '5555', medicalRecord: {
      id: 1, allergies: ['allergy1', 'allergy2']
    }
  },


]

const PatientCard = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const {data}=useGetPatients()
  return (

    <Box>

      
      {
        patients.map((patient) => (
          <CardContainer>
            <Card key={patient.id} sx={{
              my: 2,
              bgcolor: theme.palette.background.default,
              boxShadow: '0 4px 10px #9ed1d5',
              px: 2
            }}
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <CardHeader
                subheader={patient.name}
                sx={{
                  color: theme.palette.primary.main,

                }}
              />
              <CardContent>
                <Stack spacing={2}>
                  <Typography>{patient.gander}</Typography>
                  <Stack
                    direction={'row'}
                    spacing={2}
                  >
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600
                      }}
                    >
                      Email :
                    </Typography>
                    <Typography>{patient.email}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600
                      }}
                    >
                      Phone :
                    </Typography>
                    <Typography>{patient.phoneNumber}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600
                      }}
                    >
                      Address :
                    </Typography>
                    <Typography>
                      {patient.address}
                    </Typography>
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

export default PatientCard

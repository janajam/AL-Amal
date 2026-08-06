import { Box, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material"
import CardContainer from "../../Component/CardContainer"
import { useNavigate } from "react-router-dom"
import { useGetPatients } from "../../Hook/UseGetPatients"
import type { Patient } from "../../Entities/Patient"



interface Props {
  patient: Patient | null
}

const PatientCard = ({ patient }: Props) => {
  const theme = useTheme()
  const navigate = useNavigate()
  //const [searchParams] = useSearchParams();
   // const { data } = useGetPatiennts();
    // const patients = data?.data ?? []


  return (

    <Box>
      <CardContainer>
        <Card key={patient?.id} sx={{
          my: 2,
          bgcolor: theme.palette.background.default,
          boxShadow: '0 4px 10px #9ed1d5',
          px: 2
        }}
          onClick={() => navigate(`/patients/${patient?.id}`)}
        >
          <CardHeader
            subheader={patient?.name}
            sx={{
              color: theme.palette.primary.main,

            }}
          />
          <CardContent>
            <Stack spacing={2}>
              <Typography>{patient?.gander}</Typography>
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
                <Typography>{patient?.email}
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
                <Typography>{patient?.phoneNumber}</Typography>
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
                  {patient?.address}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </CardContainer>

    </Box>
  )
}

export default PatientCard

import { Box, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CardContainer from "../../Component/CardContainer"
import type { PatientListItem } from "../../Entities/Patient"



interface Props {
  patient: PatientListItem | null
}

const PatientCard = ({ patient }: Props) => {
  const theme = useTheme()
  const navigate = useNavigate()

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
          <Stack direction={'row'}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <CardHeader
              subheader={patient?.full_name}
              sx={{
                color: theme.palette.primary.main,
              }}
            />
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 550,
                color: theme.palette.etal.main
              }}
            >
              {patient?.medical_number}
            </Typography>
          </Stack>
          <CardContent>
            <Stack spacing={2}>
              <Typography>{patient?.gender}</Typography>
              <Stack
                direction={'row'}
                spacing={2}
              >
                <Typography
                  sx={{
                    fontWeight: 600
                  }}
                >
                  Birth Day :
                </Typography>
                <Typography>
                  {/* {patient?.birth_day} */}
                  
                        {new Date(patient?.birth_day || '').toLocaleDateString()}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <Typography
                  sx={{
                    fontWeight: 600
                  }}
                >
                  Phone :
                </Typography>
                <Typography>{patient?.phone}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </CardContainer>

    </Box>
  )
}

export default PatientCard

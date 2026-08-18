import { Box, Button, Card, CardContent, CardHeader, Stack, Typography, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import CardContainer from "../../Component/CardContainer"
import type { PatientListItem } from "../../Entities/Patient"
import { useAuthStore } from "../../Store/AuthStore"
import { AddRounded } from "@mui/icons-material"
import { useState } from "react"
import CreateMedicalRecordDialog from "./MedicalRecord/CreateMedicalRecordDialog"



interface Props {
  patient: PatientListItem | null
}

const PatientCard = ({ patient }: Props) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const userRole = useAuthStore((state) => state.role);
  const handleCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Box>
      <CardContainer>
        <Card key={patient?.id} sx={{
          my: 2,
          bgcolor: theme.palette.background.default,
          boxShadow: '0 4px 10px #9ed1d5',
          px: 2
        }}
          onClick={() => (
            userRole === 'doctor' && navigate(`/patients/${patient?.id}`))}
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

                  {patient?.birth_day ? new Date(patient.birth_day).toLocaleDateString() : 'N/A'}
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
            {userRole === 'secretary' &&
              <><Button
                startIcon={<AddRounded />}
                sx={{
                  whiteSpace: 'nowrap',
                  width: 180,
                  border: `2px solid ${theme.palette.etal.main}`,
                  bgcolor: theme.palette.etal.main,
                  color: theme.palette.primary.contrastText,
                  mt: 2
                }}
                onClick={handleCreate}
              >
                Create record
              </Button>
                <CreateMedicalRecordDialog
                  open={open}
                  userId={patient?.id ?? 0}
                  onClose={handleClose} /></>

            }
          </CardContent>
        </Card>
      </CardContainer>

    </Box>
  )
}

export default PatientCard

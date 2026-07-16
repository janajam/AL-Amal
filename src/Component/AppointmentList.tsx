import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme
} from "@mui/material"
import { useGetTodayAppointments } from "../Hook/UseGetTodayAppointments"


const fields = [
  {
    id: 1, patientName: 'A', appointment: {
      id: 1, date: '12/11/2020', time: '10:00', stause: 'wating'
    }
  },
  {
    id: 2, patientName: 'B', appointment: {
      id: 1, date: '12/11/2020', time: '10:00', stause: 'wating'
    }
  },
  {
    id: 3, patientName: 'C', appointment: {
      id: 1, date: '12/11/2020', time: '10:00', stause: 'wating'
    }
  },
  {
    id: 3, patientName: 'C', appointment: {
      id: 1, date: '12/11/2020', time: '10:00', stause: 'wating'
    }
  },
  {
    id: 3, patientName: 'C', appointment: {
      id: 1, date: '12/11/2020', time: '10:00', stause: 'wating'
    }
  }

]

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 15,
  color: theme.palette.primary.main,
  backgroundColor:theme.palette.background.paper
}))

const AppointmentList = () => {
  const theme = useTheme()

  // const {data}=useGetTodayAppointments()

  return (
    <Box
      sx={{
        my: 3,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Table sx={{
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <TableHead>
          <TableRow>
            <StyledHeadCell>Patient Name</StyledHeadCell>
            <StyledHeadCell>Appointment </StyledHeadCell>
            <StyledHeadCell>Status</StyledHeadCell>

          </TableRow>
        </TableHead>
        <TableBody>
            {/* {data?.data.map */}
          
          {fields.map(field => (
            <TableRow>
              <TableCell>{field.patientName}</TableCell>
              <TableCell>{field.appointment.time}</TableCell>
              <TableCell>{field.appointment.stause}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </Box>
  )
}

export default AppointmentList

import { Box, Card, CardContent, Stack, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material"


const fields = [
    { name: 'A', role: 'Doctor', createAt: '12-5-2026' },
    { name: 'B', role: 'Secretary', createAt: '12-5-2026' },
    { name: 'C', role: 'Doctor', createAt: '12-5-2026' }

]

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    fontSize: 15,
    color: theme.palette.primary.main
}))

const RecentAction = () => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                mx: 4
            }}
        >
            <Typography sx={{
                textAlign: 'center',
                color: theme.palette.etal.main,
                fontWeight: 700,
                fontSize: 17
            }}
            >
                Recent Action
            </Typography>
            <Table sx={{
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <TableHead>
                    <TableRow>
                        <StyledHeadCell>Name</StyledHeadCell>
                        <StyledHeadCell>Role</StyledHeadCell>
                        <StyledHeadCell>Created At</StyledHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.map(field => (
                        <TableRow>
                            <TableCell>{field.name}</TableCell>

                            <TableCell>{field.role}</TableCell>

                            <TableCell>{field.createAt}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            {/* //     //     <CardContent>
            //     //         <Stack direction={'row'}
            //     //             sx={{
            //     //                 justifyContent: 'space-between'
            //     //             }}
            //     //         >
            //     //             <Typography>{field.name}</Typography>
            //     //             <Typography>{field.role}</Typography>
            //     //             <Typography>{field.createAt}</Typography>

            //     //         </Stack>
            //     //     </CardContent>
            //     // </Card> */}
            {/* // ))} */}
        </Box>
    )
}

export default RecentAction

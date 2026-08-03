import { Search } from "@mui/icons-material";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";

const PatientSearch = () => {
  const theme = useTheme()
  return (
    <Box
      component="form"

      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: '80%',
        boxShadow: "0 5px 30px rgba(26, 123, 155, 0.2)",
        borderRadius: 4,
        background: `linear-gradient(176deg, #badee3  0%, ${theme.palette.background.default} 46%)`,
        my: 2,
        [theme.breakpoints.down('sm')]: {
          ml: -2
        },
      }}
    >
      <InputBase
        autoFocus
        sx={{
          ml: 1,
          flex: 1,
          color: theme.palette.etal.contrastText
        }}
        placeholder="Search Of Patient ..."
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Box>
  );
}
export default PatientSearch;
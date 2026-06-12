import { Box, Grid, Stack, useTheme } from "@mui/material";
import ThemeToggle from "../Theme/ThemToggel";
import SearchBar from "./SearchBar";
import Header from "./Header";


interface Props {
  title: string;
  subtitle: string;
}


const AppBar = ({ title, subtitle }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={"15%"}>
        <Grid size={"grow"}>
          <Header title={title} subtitle={subtitle} />
        </Grid>

        <Grid size={7}>
          <Stack
            direction={"row"}
            sx={{
              [theme.breakpoints.down("sm")]: { ml: -1 },
              ml: "10vw"
            }}
          >
            {" "}
            <SearchBar />
            <ThemeToggle />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppBar;

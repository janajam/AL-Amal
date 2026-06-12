import { Box, Typography, useTheme } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}
const Header = ({ title, subtitle }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{ mt:2}}>
      <Typography
        variant="h1"
        color={theme.palette.primary.main}
        sx={{
          mb: "4px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.3rem",
            fontWeight: 600,
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h3"
        color={theme.palette.secondary.main}
        sx={{
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.70rem",
            fontWeight: 500,
          },
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

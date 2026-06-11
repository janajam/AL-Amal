import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#2B5A6C" },
            background: { default: "#fff", paper: "#ffff", },
            text: { primary: "#fffff" },
            secondary: {
              main: "#76D7B6",
              contrastText:''
            },
            
          }
        : {
            primary: { main: "#41B3C4" },
            background: { default: "#1C6280", paper: "#76D7B6 " },
     text: { primary: "#fffff" },
            secondary: {
              main: "#F1FDFF",
            },
          }),
    },

    typography: {
      h1: {
        fontSize: "1.8rem",

        fontWeight: 700,
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 650,
      },
      h3: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      h4: {
        fontSize: "0.75rem",
        fontWeight: 500,
      },
      h5: {
        fontSize: "0.5rem",
        fontWeight: 500,
      },
      h6: {
        fontSize: "0.25rem",
        fontWeight: 500,
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },

    shape: {
      borderRadius: 12,
    },
  });

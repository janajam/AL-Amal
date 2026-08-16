import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    etal: Palette["primary"];
  }

  interface PaletteOptions {
    etal?: PaletteOptions["primary"];
  }
}

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
          primary: { main: "#2B5A6C" },
          background: { default: "#fff", paper: "#E8F2F3", },
          text: { primary: "#fffff", secondary: '#00000' },
          secondary: {
            main: "#7CDBD8",
            contrastText: ''
          },
          etal: {
            main: '#23A6B5',
            contrastText: '#000000'

          },
         
        }
        : {
          primary: { main: "#41B3C4" },
          background: { default: "#042024", paper: "#36686f " },
          text: { primary: "#ffffff", secondary: '#ffffff' },
          secondary: {
            main: "#F1FDFF",
          },
          etal: {
            main: "#9ed1d5",
            contrastText: '#ffffff'

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

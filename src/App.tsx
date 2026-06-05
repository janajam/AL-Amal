import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css'
import { getTheme } from './Theme/theme';
import { useThemeStore } from './Theme/UseThemeStore';
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";

function App() {
  const mode = useThemeStore((state) => state.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App

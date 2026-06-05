// import { DarkMode, LightMode } from "@mui/icons-material";
// import { IconButton } from "@mui/material";
// import { useThemeStore } from "./UseThemeStore";

//     const ThemeToggle = () => {
//   const toggleTheme = useThemeStore((state) => state.toggleTheme);
//   const mode = useThemeStore((state) => state.mode); // Get current mode
// console.log(mode);

//   return (
//     <IconButton onClick={toggleTheme}>
//       {mode === 'dark' ? <LightMode /> : <DarkMode />}
//     </IconButton>
//   );
// };


// export default ThemeToggle;


import { IconButton } from '@mui/material';
import { useThemeStore } from './UseThemeStore';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
  const { toggleTheme, mode } = useThemeStore();

  return (
    <IconButton onClick={toggleTheme}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
export default ThemeToggle;
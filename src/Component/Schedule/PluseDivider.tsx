import { Box, keyframes, useTheme } from "@mui/material";

const draw = keyframes`
  to { stroke-dashoffset: 0; }
`;
export default function PulseDivider() {

  const theme=useTheme();
  return (
    <Box sx={{ px: 4 }}>
      <Box
        component="svg"
        viewBox="0 0 800 26"
        preserveAspectRatio="none"
        sx={{ width: "100%", height: 26, display: "block" }}
      >
        <defs>
          <linearGradient id="pulse-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={theme.palette.etal.main} />
            <stop offset="1" stopColor={theme.palette.etal.main} />
          </linearGradient>
        </defs>
        <Box
          component="path"
          d="M0 13 H310 L330 3 L350 23 L368 13 H432 L450 3 L470 23 L488 13 H800"
          fill="none"
          stroke="url(#pulse-gradient)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          sx={{
            strokeDasharray: 340,
            strokeDashoffset: 340,
            animation: `${draw} 1.24s ease forwards 0.2s`,
          }}
        />
      </Box>
    </Box>
  );
}

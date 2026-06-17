import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function CardContainer({ children }: Props) {
  return (
    <Box
      sx={{
        ":hover": {
          transform: "scale(1.03)",
          transition: "transform .15s ease-in",
        },
          
            width: "80%",
            my:2,
            justifySelf: "center",
             mx: "auto",
            overflow: "hidden",       
      }}
    >
      {children}
    </Box>
  );
}
export default CardContainer;

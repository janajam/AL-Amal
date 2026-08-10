
import {
  Box,
  Stack,
  Typography,
  useTheme
} from "@mui/material";

import LicenseItem from "../../Admin/Accounts/LicenseItem";
import type { License } from "../../Entities/AccountsData";

interface Props {
  licenses: License[];
  onDelete?: (licenseId: number) => void;
  onAdd?: () => void;
  deletingLicenseId?: number | null;
}

const LicensesSection = ({
  licenses,
}: Props) => {
  const theme = useTheme();

  return (
    <Box >


      {licenses.length > 0 ? (

        <Stack
          sx={{
            width: "100%",
          }}
        >

          {licenses.map((license) => (
            <LicenseItem
              key={license.id}
              license={license}

            />
          ))}

        </Stack>

      ) : (

        <Typography
          sx={{
            py: 2,
             color:theme.palette.secondary.main
         
          }}
        >
          No licenses available.
        </Typography>

      )}

    </Box>
  );
};

export default LicensesSection;
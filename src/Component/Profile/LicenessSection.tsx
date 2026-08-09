import {
  AddRounded,
  DescriptionOutlined,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import type { License } from "../../Entities/AccountsData";
import LicenseItem from "../../Admin/Accounts/LicenseItem";

interface Props {
  licenses: License[];
  onDelete?: (licenseId: number) => void;
  onAdd?: () => void;
  deletingLicenseId?: number | null;
}

const LicensesSection = ({
  licenses,
  onDelete,
  onAdd,
  deletingLicenseId,
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 3,
      }}
    >

      {/* Header */}
      <Stack
        direction="row"
       sx={{  alignItems:"center",
        justifyContent:"space-between",
        mb:2}}
      >

        <Stack
          direction="row"
          spacing={1.5}
        sx={{   alignItems:"center"}}
        >
          <DescriptionOutlined
            sx={{
              color: theme.palette.etal.main,
            }}
          />

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            Licenses
          </Typography>
        </Stack>

        {onAdd && (
          <Button
            startIcon={<AddRounded />}
            variant="outlined"
            onClick={onAdd}
          >
            Add License
          </Button>
        )}

      </Stack>

      {/* Licenses */}
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
              onDelete={onDelete}
              deleting={
                deletingLicenseId === license.id
              }
            />
          ))}

        </Stack>

      ) : (

        <Typography
          color="text.secondary"
          sx={{
            py: 2,
          }}
        >
          No licenses available.
        </Typography>

      )}

    </Box>
  );
};

export default LicensesSection;
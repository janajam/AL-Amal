// import {
//     Button,
//     Stack,
//     Typography
// } from "@mui/material";

// import DownloadIcon from "@mui/icons-material/Download";
// import type { License } from "../../Entities/AccountsData";



// interface Props {
//     license: License;
// }

// const LicenseItem = ({ license }: Props) => {

//     const downloadLicense = () => {
//         window.open(license.fileUrl, "_blank");
//     };

//     return (
//         <Stack
//             direction="row"
//             spacing={3}
//             sx={{  
//             alignItems:"center"}}
//         >
//             <Typography>
//                 {license.name}
//             </Typography>

//             <Button
//                 startIcon={<DownloadIcon />}
//                 onClick={downloadLicense}
//             >
//                 Download
//             </Button>
//         </Stack>
//     );
// };

// export default LicenseItem;


import {
  DeleteOutlineRounded,
  DescriptionOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import type { License } from "../../Entities/AccountsData";

interface Props {
  license: License;
  onDelete?: (licenseId: number) => void;
  deleting?: boolean;
}

const LicenseItem = ({
  license,
  onDelete,
  deleting = false,
}: Props) => {
  const theme = useTheme();

  const handlePreview = () => {
    window.open(
      license.fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleDelete = () => {
    if (!onDelete) return;

    onDelete(license.id);
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 2,
        mb: 1.5,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{lignItems:"center",
        justifyContent:"space-between"}}
      >

        {/* File information */}
        <Stack
          direction="row"
          spacing={1.5}
        sx={{   alignItems:"center",
          minWidth:0}}
        >

          <DescriptionOutlined
            sx={{
              color: theme.palette.etal.main,
              fontSize: 32,
            }}
          />

          <Box
          
          sx={{ 

              minWidth:0}
          }>
            <Typography
              sx={{
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {license.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              PDF
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Uploaded: {license.uploadedAt}
            </Typography>
          </Box>

        </Stack>

        {/* Actions */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{flexShrink:0}}
        >

          <Tooltip title="Preview">
            <IconButton
              onClick={handlePreview}
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <VisibilityOutlined />
            </IconButton>
          </Tooltip>

          {onDelete && (
            <Tooltip title="Delete">
              <IconButton
                onClick={handleDelete}
                disabled={deleting}
                sx={{
                  color: theme.palette.error.main,
                }}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </Tooltip>
          )}

        </Stack>

      </Stack>
    </Box>
  );
};

export default LicenseItem;
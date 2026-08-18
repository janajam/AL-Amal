

// import {
//   VisibilityOutlined
// } from "@mui/icons-material";

// import {
//   Box,
//   IconButton,
//   Stack,
//   Tooltip,
//   Typography,
//   useTheme,
// } from "@mui/material";

// import type { License } from "../../Entities/AccountsData";

// interface Props {
//   license: License;
// }

// const LicenseItem = ({
//   license,
// }: Props) => {
//   const theme = useTheme();

//   const handlePreview = () => {
//     window.open(
//       license.fileUrl,
//       "_blank",
//       "noopener,noreferrer"
//     );
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         border: `1px solid ${theme.palette.divider}`,
//         borderRadius: 2,
//         p: 2,
//         mb: 1.5,
//         bgcolor: theme.palette.background.default,
//       }}
//     >
//       <Stack
//         direction="row"
//         spacing={2}
//         sx={{
//           lignItems: "center",
//           justifyContent: "space-between"
//         }}
//       >

//         {/* File information */}
//         <Stack
//           direction="row"
//           spacing={1.5}
//           sx={{
//             alignItems: "center",
//             minWidth: 0
//           }}
//         >

//           <Box

//             sx={{

//               minWidth: 0
//             }
//             }>
//             <Typography
//               sx={{
//                 fontWeight: 600,
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {license.name}
//             </Typography>

//             <Typography
//               variant="body2"
//               color="text.secondary"
//             >
//               PDF
//             </Typography>

//             <Typography
//               variant="caption"
//               color="text.secondary"
//             >
//               Uploaded: {license.uploadedAt}
//             </Typography>
//           </Box>

//         </Stack>

//         {/* Actions */}
//         <Stack
//           direction="row"
//           spacing={0.5}
//           sx={{ flexShrink: 0 }}
//         >

//           <Tooltip title="Preview">
//             <IconButton
//               onClick={handlePreview}
//               sx={{
//                 color: theme.palette.primary.main,
//               }}
//             >
//               <VisibilityOutlined />
//             </IconButton>
//           </Tooltip>


//         </Stack>

//       </Stack>
//     </Box>
//   );
// };

// export default LicenseItem;



import { useState } from "react";
import { VisibilityOutlined, Close, Download } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";

interface Props {
  // للتعامل سواء كانت license عبارة عن رابط string بسيط أو كائن License
  license: string | { name?: string; fileUrl: string; uploadedAt?: string };
  index?: number;
}

const LicenseItem = ({ license, index = 1 }: Props) => {
  const theme = useTheme();
  const [openPreview, setOpenPreview] = useState(false);

  // استخراج تفاصيل الرابط والاسم بناءً على نوع البيانات المرسلة
  const fileUrl = typeof license === "string" ? license : license.fileUrl;
  const fileName =
    typeof license === "object" && license.name
      ? license.name
      : `License Document #${index}`;
  const uploadedAt =
    typeof license === "object" ? license.uploadedAt : undefined;

  // معرفة نوع الملف بناءً على الرابط أو الامتداد
  const isImage = /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(fileUrl);

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <>
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
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* File information */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {fileName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {isImage ? "IMAGE" : "DOCUMENT / PDF"}
              </Typography>

              {uploadedAt && (
                <Typography variant="caption" color="text.secondary">
                  Uploaded: {uploadedAt}
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
            <Tooltip title="Preview">
              <IconButton
                onClick={handleOpenPreview}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <VisibilityOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      {/* Modal Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      
          sx={ { height: "80vh", borderRadius: 3 }}
      
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {fileName}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Download />}
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
            >
              Open External
            </Button>
            <IconButton onClick={handleClosePreview}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0, height: "100%", overflow: "hidden" }}>
          {isImage ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                bgcolor: "#f5f5f5",
              }}
            >
              <Box
                component="img"
                src={fileUrl}
                alt={fileName}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: 1,
                }}
              />
            </Box>
          ) : (
            <iframe
              src={fileUrl}
              title={fileName}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LicenseItem;
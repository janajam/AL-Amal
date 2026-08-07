import {
  Avatar,
  Badge,
  Box,
  Fade,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";

import {
  CameraAltRounded,
  DeleteRounded,
} from "@mui/icons-material";

import { useMemo, useRef } from "react";

interface Props {
  name: string;
  image?: string | null;
   onImageChange: (file: File|null) => void;
   onRemoveImage: () => void;
}

const ProfileAvatar = ({
  name,
  image,
  onImageChange,
}: Props) => {

  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (!image) return null;
        return image;
  }, [image]);

  const handleChooseImage = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageChange(file);
  };

  const handleRemove = () => {
    onImageChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };


  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 4,
      }}
    >

      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <Box
            sx={{
              display: "flex",
              gap: .5,
            }}
          >

            <Tooltip title="Upload">

              <IconButton
                size="small"
                onClick={handleChooseImage}
                sx={{
                  color:
                    theme.palette.primary.contrastText,

                  "&:hover": {
                    bgcolor:
                      theme.palette.primary.dark,
                  },
                }}
              >
                <CameraAltRounded
                  fontSize="small"
                />
              </IconButton>

            </Tooltip>

            <Fade in={!!preview}>

              <span>

                <Tooltip title="Remove">

                  <IconButton
                    size="small"
                    onClick={handleRemove}
                    sx={{
                        ml:2,
                      bgcolor:
                        theme.palette.error.main,
                      color: "#fff",
                      "&:hover": {
                        bgcolor:
                          theme.palette.error.dark,
                      },
                    }}
                  >
                    <DeleteRounded
                      fontSize="small"
                      
                    />
                  </IconButton>

                </Tooltip>

              </span>

            </Fade>

          </Box>

        }
      >

        <Avatar
          src={preview ?? undefined}
          sx={{
            width: 140,
            height: 140,
            fontSize: 60,
            fontWeight: 700,

            bgcolor:
              theme.palette.primary.main,

            color:
              theme.palette.primary.contrastText,

            boxShadow: 5,
          }}
        >
          {!preview &&
            name.charAt(0).toUpperCase()}
        </Avatar>

      </Badge>

      <input
        hidden
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
      />

    </Box>

  );

};

export default ProfileAvatar;
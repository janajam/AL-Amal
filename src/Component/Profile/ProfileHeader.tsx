import { Box, Button, Stack, Typography, useTheme } from "@mui/material"
import ProfileAvatar from "./ProfileAvatar"
import { useState } from "react";
import { EditRounded } from "@mui/icons-material";


interface Props {

    name: string;

    email: string;

    role: string;

    image?: string | null;

    // createdAt?: Date;

    editable?: boolean;

    isEditing?: boolean;

    onEdit?: () => void;

    onImageChange: (file: File|null) => void;

    onRemoveImage: () => void;
}

const ProfileHeader = ({
    name,
    email,
    role,
    image,
    // createdAt,
    editable = false,
    isEditing = false,
    onEdit,
    onImageChange,
    onRemoveImage,
}: Props) => {

    // const fullName = useAuthStore((state) => state.fullName);
    const fullName = 'Jhon Smith'
const theme=useTheme();

    return (
        <div>
            <Box
                sx={{
                    mb: 1,
                    mx: 4,
                    px:3 
                }}
            >
                <Stack direction={{ sm:'column',md:'row' }}
                sx={{ 
                    alignItems:'center',
                    mx:'auto',
                    justifyContent:'space-between'
                 }}>

                    <ProfileAvatar
                        name={fullName}
                        image={image}
                        onImageChange={onImageChange}
                        onRemoveImage={onRemoveImage} 
                        
                       />
                       <Stack>
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 600
                        }}
                    >
                        {fullName}
                    </Typography>
                    <Typography
                    color="text.secondary"
                >
                    {email}
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 550,
                        color: theme.palette.primary.main,
                    }}
                >
                    {role}
                </Typography>
                    </Stack>
                      {editable && (

                <Button
                    variant="outlined"
                    startIcon={<EditRounded />}
                    onClick={onEdit}
                    disabled={isEditing}
                    sx={{ 
                    color:theme.palette.etal.main,
                    whiteSpace:'nowrap'
                     }}
                >
                    Edit Profile
                </Button>

            )}

                </Stack>
            </Box>


        </div>
    )
}

export default ProfileHeader

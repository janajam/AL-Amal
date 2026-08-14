import { Box, Button, IconButton, Stack, Typography, useTheme } from "@mui/material"
import ProfileAvatar from "./ProfileAvatar"
import { useState } from "react";
import { EditRounded, LogoutRounded } from "@mui/icons-material";
import ProfileData from "./ProfileData";
import { useNavigate } from "react-router-dom";


interface Props {

    name: string;

    email: string;

    department: string;
    image?: string | null;

    editable?: boolean;

    isEditing?: boolean;

    onEdit?: () => void;

    onImageChange: (file: File | null) => void;

    onRemoveImage: () => void;
}

const ProfileHeader = ({
    name,
    email,
    department,
    image,
    editable = false,
    isEditing = false,
    onEdit,
    onImageChange,
    onRemoveImage,
}: Props) => {

    // const fullName = useAuthStore((state) => state.fullName);
    const fullName = 'Jhon Smith'
    const theme = useTheme();
const navigate = useNavigate()
    return (
        <div>
            <Box
                sx={{
                    mb: 1,
                    mx: 4,
                    px: 3
                }}
            >
                <Stack direction={{ sm: 'column', md: 'row' }}
                    sx={{
                        alignItems: 'center',
                        mx: 'auto',
                        justifyContent: 'space-between'
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
                            {department}
                        </Typography>
                    </Stack>
                    {editable && (
                        <Stack spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={<EditRounded />}
                                onClick={onEdit}
                                disabled={isEditing}
                                sx={{
                                    color: theme.palette.etal.main,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Edit Profile
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<EditRounded />}
                                onClick={()=>navigate('/changePassword')}
                                disabled={isEditing}
                                sx={{
                                    color: theme.palette.etal.main,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Change Password
                            </Button>

                        </Stack>
                    )}

                </Stack>
            </Box>

        </div>
    )
}

export default ProfileHeader

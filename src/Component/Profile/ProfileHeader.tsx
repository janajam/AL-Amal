import { Box, Stack, Typography } from "@mui/material"
import ProfileAvatar from "./ProfileAvatar"
import { useState } from "react";


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


    return (
        <div>
            <Box
                sx={{
                    my: 3,
                    mx: 3,
                    p: 1
                }}
            >
                <Stack direction={'row'}>

                    <ProfileAvatar
                        name={fullName}
                        image={image}
                        onImageChange={onImageChange}
                        onRemoveImage={onRemoveImage} 
                        
                       />
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 600
                        }}
                    >
                        {fullName}
                    </Typography>
                </Stack>
            </Box>


        </div>
    )
}

export default ProfileHeader

import { Box, Stack, Typography, useTheme } from "@mui/material"
import PulseDivider from "../Schedule/PluseDivider"
import { useAuthStore } from "../../Store/AuthStore"
import ProfileHeader from "./ProfileHeader"
import { useState } from "react"
import ScheduleSection from "../Schedule/Schedule"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const account = {
    id: 1,
    name: 'jhon',
    role: 'secretary',
    email: 'jhon@email.com',
    // createdAt:'2020'
}

const Profile = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    // const {fullName , role}= useAuthStore();
    const role = 'admin'
    const fullName = 'Jhon Smith'
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [editing, setEditing] = useState(false);
    const handleImageChange = (file: File | null) => {

        if (!file) {

            setSelectedFile(null);

            setPreview(null);

            return;
        }

        setSelectedFile(file);

        setPreview(URL.createObjectURL(file));

    };

    const handleRemoveImage = () => {

        setPreview(null);

    };
    return (
        <><ArrowBack
            sx={{
                mx: 2,
                mt: 2,
                cursor: "pointer",
                color: theme.palette.primary.main,
            }}
            onClick={() => navigate(-1)} /><div>



                <ProfileHeader

                    name={fullName}

                    email={account.email}

                    role={role}

                    image={preview}

                    // createdAt={account.createdAt}
                    editable

                    isEditing={editing}

                    onEdit={() => setEditing(true)}

                    onImageChange={handleImageChange}

                    onRemoveImage={handleRemoveImage} />
                <PulseDivider />

                {role !== 'admin' &&
                    <ScheduleSection accountId={account.id} />}
            </div></>
    )
}

export default Profile



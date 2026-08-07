import { Box, Stack, Typography } from "@mui/material"
import PulseDivider from "../Schedule/PluseDivider"
import { useAuthStore } from "../../Store/AuthStore"
import ProfileHeader from "./ProfileHeader"
import { useState } from "react"

const account = {
    id:1,
    name :'jhon',
    role:'secretary',
    email:'jhon@email.com',
    // createdAt:'2020'
}

const Profile = () => {

    // const fullName = useAuthStore((state) => state.fullName);
    const fullName = 'Jhon Smith'
   const [preview, setPreview] = useState<string | null>(null);

const [selectedFile, setSelectedFile] =useState<File | null>(null);

const [editing,setEditing]=useState(false);

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
        <div>



<ProfileHeader

    name={fullName}

    email={account.email}

    role={account.role}

    image={preview}

    // createdAt={account.createdAt}

    editable

    isEditing={editing}

    onEdit={() => setEditing(true)}

    onImageChange={handleImageChange}

    onRemoveImage={handleRemoveImage}

/>
            {/* <ProfileHeader
                name={fullName}
                email="ahmed@gmail.com"
                role="Doctor"

                image={preview}

                editable

                onImageChange={(file) => {
                    console.log(file);
                    handleImageChange(file);
                }}

                onRemoveImage={() => {
                    console.log("remove");
                    handleRemoveImage();
                }}
            /> */}
            <PulseDivider />
        </div>
    )
}

export default Profile



 import { ArrowBack } from "@mui/icons-material"
import { useTheme } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from '../../assets/logo.webp'
import type { Doctor, Secretary } from "../../Entities/AccountsData"
import PulseDivider from "../Schedule/PluseDivider"
import ScheduleSection from "../Schedule/Schedule"
import { dummySchedule } from "../Schedule/ScheduleDummy"
import ProfileData from "./ProfileData"
import ProfileHeader from "./ProfileHeader"
import type { EditProfileInput } from "../../Schema/EditProfilrSchema"
import EditProfileDialog from "./EditProfileDialog"
import pdf from '../../assets/SRS HIMS.pdf'
import pdf2 from '../../assets/Incident-Response-Plan-Template.pdf'
import { useAuthStore } from "../../Store/AuthStore"

const account: Doctor | Secretary = {
    id: 1,

    name: "Ahmed Khaled",

    email: "ahmed@alamal.com",

    phoneNumber: "0599999999",

    birthDay: "1988-06-12",

    image: logo,

    role: "Doctor",

    status: "ACTIVE",

    createdAt: "2022-10-02",

    address: "Ramallah, Palestine",

    department: {
        id: 1,
        name: "Internal Medicine",
    },

    specialty: {
        id: 1,
        name: "Cardiology",
    },

    licenses: [
        {
            id: 1,
            name: "Medical License",
            fileUrl: pdf,
            uploadedAt: "2025-07-13",
        },
        {
            id: 2,
            name: "Board Certificate",
            fileUrl: pdf2,
            uploadedAt: "2025-07-14",
        },
    ],

    workingDays: dummySchedule,
};

const Profile = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    const userRole = useAuthStore((state) => state.role);
    // const {fullName , role}= useAuthStore();
    const fullName = 'Jhon Smith'
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [editing, setEditing] = useState(false);
    
    const handleUpdateProfile = (
        data: EditProfileInput
    ) => {

        console.log("Data to backend:", data);

        // updateProfile.mutate(data);

        setEditing(false);
    };

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
            onClick={() => navigate(-1)} />

            <ProfileHeader
                name={fullName}
                email={account.email}
                department={account.department.name}
                image={preview}
                editable
                isEditing={editing}
                onEdit={() => setEditing(true)}
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage} />

            <PulseDivider />

            <ProfileData account={account} 
            />

            {userRole !== 'admin' &&
                <ScheduleSection accountId={account.id} />}

            <EditProfileDialog
                open={editing}
                account={account}
                onClose={() => setEditing(false)}
                onSubmit={handleUpdateProfile}
        />

        </>
    )
}

export default Profile



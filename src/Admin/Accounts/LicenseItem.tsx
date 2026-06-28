import {
    Button,
    Stack,
    Typography
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import type { License } from "../../Entities/AccountsData";



interface Props {
    license: License;
}

const LicenseItem = ({ license }: Props) => {

    const downloadLicense = () => {
        window.open(license.fileUrl, "_blank");
    };

    return (
        <Stack
            direction="row"
            sx={{  
            justifyContent:"space-between",
            alignItems:"center"}}
        >
            <Typography>
                {license.name}
            </Typography>

            <Button
                startIcon={<DownloadIcon />}
                onClick={downloadLicense}
            >
                Download
            </Button>
        </Stack>
    );
};

export default LicenseItem;
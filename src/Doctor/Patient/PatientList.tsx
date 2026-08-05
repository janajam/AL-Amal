import { Box } from "@mui/material";
import { useGetPatients } from "../../Hook/UseGetPatients";
import PatientCard from "./PatientCard";


//for test 
const patients = [
    {
        id: 1, name: 'AA', email: 'aa@email.com', birthDay: '2/4/2001', gander: 'Mail', age: 30, address: 'address', phoneNumber: '5555', medicalRecord: {
            id: 1, allergies: ['allergy1', 'allergy2']
        }
    },
    {
        id: 2, name: 'BB', email: 'BB@email.com', birthDay: '2/4/2001', gander: 'Mail', age: 30, address: 'address', phoneNumber: '5555', medicalRecord: {
            id: 1, allergies: ['allergy1', 'allergy2']
        }
    },
    {
        id: 3, name: 'CC', email: 'CC@email.com', birthDay: '2/4/2001', gander: 'Mail', age: 30, address: 'address', phoneNumber: '5555', medicalRecord: {
            id: 1, allergies: ['allergy1', 'allergy2']
        }
    },
    {
        id: 4, name: 'DD', email: 'DD@email.com', birthDay: '2/4/2001', gander: 'Mail', age: 30, address: 'address', phoneNumber: '5555', medicalRecord: {
            id: 1, allergies: ['allergy1', 'allergy2']
        }
    },
]
const PatientList = () => {

    // const { data } = useGetPatients();

    return (

        <Box>

            {/* {data?.data.map((patient) => ( */}
            {patients.map((patient) => (
                <PatientCard
                    key={patient.id}
                    patient={patient}
                />

            ))}

        </Box>

    );

};

export default PatientList
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import PatientCard from "../../Doctor/Patient/PatientCard";
import type { Patient } from "../../Entities/Patient";
import PatientSearch from "./PatientSearch";


// for test
const patients: Patient[] = [
  {
    id: 1,
    name: "AA",
    email: "aa@email.com",
    age: 25,
    gander: "Male",
    address: "Address",
    phoneNumber: "111111",
    medicalRecord: {
      id: 1,
    },
  },
  {
    id: 2,
    name: "BB",
    email: "bb@email.com",
    age: 30,
    gander: "Female",
    address: "Address",
    phoneNumber: "222222",
    medicalRecord: {
      id: 2,
    },
  },
];

export default function SecretaryDashboard() {

  const [email, setEmail] = useState("");

  const [searchedPatient, setSearchedPatient] = useState<Patient | null>(null);

  const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
    setIsSearching(true);
    const patient =
      patients.find(
        p =>
          p.email.toLowerCase() ===
          email.toLowerCase()
      ) ?? null;

    setSearchedPatient(patient);
    setIsSearching(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        alignSelf: 'center',
        mt: 4,
        pt: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 550,
          mt: 3,
          mb: 4
        }}
      >
        Use the search below to retrieve a patient's account by email. <br />
        This will display their personal details and give you quick access to their full medical profile.
      </Typography>
      <PatientSearch 
        value={email}
        onChange={setEmail}
        onSearch={handleSearch}
      
      />

      <Box
        sx={{
          mt: 4,
          width: "100%",
        }}
      >

        {searchedPatient && (

          <PatientCard
            patient={searchedPatient}
          />

        )}

       
      </Box>
</Box>
  )
}










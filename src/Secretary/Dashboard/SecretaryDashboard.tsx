// import { Box, CircularProgress, Typography } from "@mui/material";
// import { useState } from "react";
// import PatientCard from "../../Doctor/Patient/PatientCard";
// import type { Patient } from "../../Entities/Patient";
// import PatientSearch from "./PatientSearch";
// import { useSearchPatient } from "../../Hook/UseSearchPatient";


// // for test
// // const patients: Patient[] = [
// //   {
// //     id: 1,
// //     name: "AA",
// //     email: "aa@email.com",
// //     age: 25,
// //     gander: "Male",
// //     address: "Address",
// //     phoneNumber: "111111",
// //     medicalRecord: {
// //       id: 1,
// //     },
// //   },
// //   {
// //     id: 2,
// //     name: "BB",
// //     email: "bb@email.com",
// //     age: 30,
// //     gander: "Female",
// //     address: "Address",
// //     phoneNumber: "222222",
// //     medicalRecord: {
// //       id: 2,
// //     },
// //   },
// // ];

// export default function SecretaryDashboard() {

//   const [email, setEmail] = useState("");

//   const [searchedPatient, setSearchedPatient] = useState<Patient | null>(null);

//   const [isSearching, setIsSearching] = useState(false);

//   const {
//     mutate: searchPatient,
//     data,
//     isPending,
//     isError,
//     isSuccess,
//     reset,
//   } = useSearchPatient();

//   //   const handleSearch = () => {
//   //   setIsSearching(true);
//   //   const patient =
//   //     patients.find(
//   //       p =>
//   //         p.email.toLowerCase() ===
//   //         email.toLowerCase()
//   //     ) ?? null;

//   //   setSearchedPatient(patient);
//   //   setIsSearching(false);
//   // };

//   const handleSearch = () => {
//     if (!email.trim()) return;
//     searchPatient(email.trim());
//   };

//   const handleEmailChange = (value: string) => {
//     setEmail(value);
//     if (isSuccess || isError) reset(); // تصفير النتيجة السابقة عند بدء بحث جديد
//   };

//   const patients = data?.data ?? [];

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//         alignSelf: 'center',
//         mt: 4,
//         pt: 4,
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: 16,
//           fontWeight: 550,
//           mt: 3,
//           mb: 4
//         }}
//       >
//         Use the search below to retrieve a patient's account by email. <br />
//         This will display their personal details and give you quick access to their full medical profile.
//       </Typography>
//       <PatientSearch
//         value={email}
//         onChange={handleEmailChange}
//         onSearch={handleSearch}

//       />

//       <Box
//         sx={{
//           mt: 4,
//           width: "100%",
//         }}
//       >
//         {isPending && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
//             <CircularProgress />
//           </Box>
//         )}
//         {searchedPatient && (

//           <PatientCard
//             patient={searchedPatient}
//           />

//         )}


//       </Box>
//     </Box>
//   )
// }




import { Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import PatientCard from "../../Doctor/Patient/PatientCard";
import type { Patient, PatientListItem } from "../../Entities/Patient";
import PatientSearch from "./PatientSearch";
import { useSearchPatient } from "../../Hook/UseSearchPatient";
import { mapSearchPatientToListItem } from "../../Doctor/Patient/MappingPatientData";

export default function SecretaryDashboard() {
  const [email, setEmail] = useState("");
  const [searchedPatient, setSearchedPatient] =
    useState<PatientListItem | null>(null);

  const {
    mutate: searchPatient,
    isPending,
    isError,
    isSuccess,
    reset,
  } = useSearchPatient();


  const handleSearch = () => {
  if (!email.trim()) return;

  searchPatient(email.trim(), {
    onSuccess: (response) => {
      if (response.data) {
        const patient = mapSearchPatientToListItem(response.data);

        setSearchedPatient(patient);
      } else {
        setSearchedPatient(null);
      }
    },

    onError: () => {
      setSearchedPatient(null);
    },
  });
};

  // const handleSearch = () => {
  //   if (!email.trim()) return;

  //   searchPatient(email.trim(), {
  //     onSuccess: (response) => {
  //       setSearchedPatient(response.data);
  //     },

  //     onError: () => {
  //       setSearchedPatient(null);
  //     },
  //   });
  // };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (isSuccess || isError) {
      reset();
      setSearchedPatient(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        alignSelf: "center",
        mt: 4,
        pt: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 550,
          mt: 3,
          mb: 4,
        }}
      >
        Use the search below to retrieve a patient's account by email.
        <br />
        This will display their personal details and give you quick
        access to their full medical profile.
      </Typography>

      <PatientSearch
        value={email}
        onChange={handleEmailChange}
        onSearch={handleSearch}
      />

      <Box
        sx={{
          mt: 4,
          width: "100%",
        }}
      >
        {isPending && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!isPending && searchedPatient && (
          <PatientCard patient={searchedPatient} />
        )}

        {!isPending && isError && (
          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
            }}
          >
            Patient not found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}





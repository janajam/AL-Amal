import { Search } from "@mui/icons-material";
import { Box, IconButton, InputBase, useTheme } from "@mui/material";

interface Props{
    value:string;
    onChange:(value:string)=>void;
    onSearch:()=>void
}

const PatientSearch = ({ onSearch,value,onChange }: Props) => {
  const theme = useTheme()
  
  const handleSearch = (
    e?: React.FormEvent
  ) => {

    e?.preventDefault();

    onSearch();

  };


  return (
    <Box
      component='form'
      onSubmit={handleSearch}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: '80%',
        boxShadow: "0 5px 30px rgba(26, 123, 155, 0.2)",
        borderRadius: 4,
        background: `linear-gradient(
        176deg, 
        #badee3  0%,
         ${theme.palette.background.default} 46%)`,
        my: 2,
        [theme.breakpoints.down('sm')]: {
          ml: -2
        },
      }}
    >
      <InputBase
        autoFocus
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        sx={{
          ml: 1,
          flex: 1,
          color: theme.palette.etal.contrastText
        }}
        placeholder="Search By Patient Email..."
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Box>
  );
}
export default PatientSearch;
import { Search } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";

const SearchBar = () => {
  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        boxShadow: "0 4px 30px rgba(26, 123, 155, 0.2)",
        borderRadius: 4,
        my: 2
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search ..."
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
    </Box>
  );
}
export default SearchBar;
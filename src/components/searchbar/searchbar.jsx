import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "./searchContext";

const SearchBar = ({ placeholder = "Search..." }) => {
  const { query, setQuery } = useSearch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      value={query}
      onChange={handleChange}
      variant="outlined"
      sx={{
        maxWidth: { xs: "100%", sm: 400 }, // full width on xs, fixed on sm+
        "& .MuiOutlinedInput-root": {
          borderRadius: "25px",
          backgroundColor: "background.paper",
          transition: "0.2s ease-in-out",
          "&:hover": {
            boxShadow: 3,
          },
          "&.Mui-focused": {
            boxShadow: 4,
            borderColor: "primary.main",
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
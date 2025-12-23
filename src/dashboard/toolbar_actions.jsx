import * as React from "react";
import {
  Stack,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchBar from "../components/searchbar/searchbar";

export default function ToolbarActions({ navigate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <SearchBar />

      <IconButton onClick={toggleTheme}>
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.removeItem("login_token");
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
}

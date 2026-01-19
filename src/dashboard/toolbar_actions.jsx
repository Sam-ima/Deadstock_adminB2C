import * as React from "react";
import {
  Stack,
  IconButton,
  Avatar,
  Menu,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchBar from "../components/searchbar/searchbar";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/config/firebase";
// import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

export default function ToolbarActions({ navigate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { mode, setMode } = useColorScheme();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Listen to Firebase auth state
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth);
  //     localStorage.removeItem("user");
  //     setAnchorEl(null);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };

  const getUserInitials = () => {
    if (!currentUser) return "U";

    const displayName =
      currentUser.displayName || currentUser.email?.split("@")[0];
    if (!displayName) return "U";

    const nameParts = displayName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return displayName[0].toUpperCase();
  };

  const getDisplayName = () => {
    if (!currentUser) return "";

    // Check localStorage first (for custom displayName)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.displayName) {
          return parsedUser.displayName;
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    // Fallback to Firebase data
    return (
      currentUser.displayName || currentUser.email?.split("@")[0] || "User"
    );
  };

  if (loading) {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton disabled>
          <CircularProgress size={24} />
        </IconButton>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <SearchBar />

      <IconButton onClick={toggleTheme}>
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {currentUser ? (
        <>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.04)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: mode === "dark" ? "primary.dark" : "primary.main",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {getUserInitials()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                maxWidth: 300,
                borderRadius: 1,
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 0.5,
                }}
              >
                <PersonIcon fontSize="small" />
                {getDisplayName()}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: "0.75rem",
                }}
              >
                <EmailIcon fontSize="small" />
                {currentUser.email}
              </Typography>
            </Box>
          </Menu>
        </>
      ) : (
        // Show login button if not authenticated
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            px: 2,
            py: 0.5,
            fontSize: "0.875rem",
          }}
        >
          Login
        </IconButton>
      )}
    </Stack>
  );
}

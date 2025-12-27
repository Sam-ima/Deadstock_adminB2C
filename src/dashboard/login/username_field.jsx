import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    transition: "all 0.3s ease",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#667eea",
      },
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#667eea",
        borderWidth: 2,
      },
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#667eea",
    },
  },
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const UsernameField = ({
  username,
  error,
  helperText,
  onChange,
  onBlur,
  disabled,
}) => {
  return (
    <StyledTextField
      required
      fullWidth
      id="username"
      label="Username or Email"
      name="username"
      autoComplete="username"
      autoFocus
      value={username}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonOutline color="action" />
          </InputAdornment>
        ),
      }}
      disabled={disabled}
    />
  );
};

export default UsernameField;

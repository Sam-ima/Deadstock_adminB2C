import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
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

const PasswordField = ({
  password,
  showPassword,
  error,
  helperText,
  onChange,
  onBlur,
  onKeyPress,
  onShowPasswordClick,
  onMouseDownPassword,
  disabled,
}) => {
  return (
    <StyledTextField
      required
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      id="password"
      autoComplete="current-password"
      value={password}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlined color="action" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={onShowPasswordClick}
              onMouseDown={onMouseDownPassword}
              edge="end"
              disabled={disabled}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      disabled={disabled}
    />
  );
};

export default PasswordField;

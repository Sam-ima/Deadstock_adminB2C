import React from "react";
import { Box, Link } from "@mui/material";

import { styled } from "@mui/material/styles";
import UsernameField from "./username_field";
import PasswordField from "./password_field";
import LoginButton from "./login_button";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
}));

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#667eea",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const LoginFormContent = ({
  username,
  password,
  showPassword,
  loading,
  errors,
  touched,
  onUsernameChange,
  onPasswordChange,
  onUsernameBlur,
  onPasswordBlur,
  onKeyPress,
  onShowPasswordClick,
  onMouseDownPassword,
  onSubmit,
}) => {
  return (
    <StyledBox component="form" onSubmit={onSubmit}>
      <UsernameField
        username={username}
        error={touched.username && !!errors.username}
        helperText={touched.username && errors.username}
        onChange={onUsernameChange}
        onBlur={onUsernameBlur}
        disabled={loading}
      />

      <PasswordField
        password={password}
        showPassword={showPassword}
        error={touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        onChange={onPasswordChange}
        onBlur={onPasswordBlur}
        onKeyPress={onKeyPress}
        onShowPasswordClick={onShowPasswordClick}
        onMouseDownPassword={onMouseDownPassword}
        disabled={loading}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <ForgotPasswordLink href="#" variant="body2">
          Forgot password?
        </ForgotPasswordLink>
      </Box>

      <LoginButton loading={loading} />
    </StyledBox>
  );
};

export default LoginFormContent;

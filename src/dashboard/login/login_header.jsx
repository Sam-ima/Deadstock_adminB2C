import React from "react";
import { Box, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
}));

const LoginHeader = () => {
  return (
    <>
      <LogoContainer>
        <LogoIcon>
          <LockOutlined sx={{ fontSize: 32, color: "white" }} />
        </LogoIcon>
      </LogoContainer>

      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          mb: 3,
          textAlign: "center",
        }}
      >
        Welcome Back
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Sign in to continue to your dashboard
      </Typography>
    </>
  );
};

export default LoginHeader;

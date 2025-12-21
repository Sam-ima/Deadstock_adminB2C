import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Container, Paper, Typography } from "@mui/material";
import apiClient from "../../utils/config/axiosconfig";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import ResetPasswordForm from "./resetPasswordForm";

const AuthContainer = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
    showPassword: false,
    mode: "login",
    showOtpField: false,
  });

  const navigate = useNavigate();

  const updateFormState = (updates) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  };

  const handleAuth = async (credentials) => {
    try {
      const endpoint =
        formState.mode === "login" ? "/admin/login" : "/admin/register";
      const response = await apiClient.post(endpoint, credentials);

      if (response.data.success) {
        localStorage.setItem(
          "login_token",
          response.data.token || "dummy-token-for-demo"
        );
        navigate("/dashboard", { state: { user: response.data.admin } });
        toast.success(
          formState.mode === "login"
            ? "Logged in successfully!"
            : "Registered and logged in successfully!"
        );
      } else {
        toast.error(response.data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Authentication failed. Please try again."
      );
    }
  };

  const handleResetPassword = async (email) => {
    try {
      await apiClient.post("/admin/save-otp", { email });
      updateFormState({ showOtpField: true, email });
      toast.info("OTP sent to your email");
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtpAndReset = async ({ email, otp, newPassword }) => {
    try {
      const verifyResponse = await apiClient.post("/admin/verify-otp", {
        email,
        otp,
      });

      if (verifyResponse.data.success) {
        const resetResponse = await apiClient.post("/admin/reset-password", {
          email,
          new_password: newPassword,
        });

        if (resetResponse.data.success) {
          toast.success(
            "Password reset successfully! You can now login with your new password."
          );
          updateFormState({
            mode: "login",
            showOtpField: false,
            otp: "",
            newPassword: "",
          });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  const formTitles = {
    login: {
      heading: "Welcome Back",
      subheading: "Login to your admin account",
    },
    register: {
      heading: "Create Account",
      subheading: "Register a new admin account",
    },
    reset: {
      heading: "Reset Password",
      subheading: "Enter your details to reset your password",
    },
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red", // full screen now
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            p: 4,
            borderRadius: "16px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              className="responsive_fontsize32"
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {formTitles[formState.mode].heading}
            </Typography>
            <Typography
              className="responsive_fontsize20"
              variant="body2"
              color="text.secondary"
            >
              {formTitles[formState.mode].subheading}
            </Typography>
          </Box>

          {formState.mode === "login" && (
            <LoginForm
              formData={formState}
              updateFormState={updateFormState}
              onAuth={handleAuth}
              switchToRegister={() => updateFormState({ mode: "register" })}
              switchToReset={() => updateFormState({ mode: "reset" })}
            />
          )}

          {formState.mode === "register" && (
            <RegisterForm
              formData={formState}
              updateFormState={updateFormState}
              onAuth={handleAuth}
              switchToLogin={() => updateFormState({ mode: "login" })}
            />
          )}

          {formState.mode === "reset" && (
            <ResetPasswordForm
              formData={formState}
              updateFormState={updateFormState}
              onResetPassword={handleResetPassword}
              onVerifyOtpAndReset={handleVerifyOtpAndReset}
              switchToLogin={() =>
                updateFormState({ mode: "login", showOtpField: false })
              }
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthContainer;
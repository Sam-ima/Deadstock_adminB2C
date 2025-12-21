import React from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import PasswordField from "./passwordField";

const ResetPasswordForm = ({
  formData,
  updateFormState,
  onResetPassword,
  onVerifyOtpAndReset,
  switchToLogin,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.showOtpField) {
      onVerifyOtpAndReset({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
    } else {
      onResetPassword(formData.email);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
        {formData.showOtpField
          ? "Enter the OTP sent to your email and your new password"
          : "Enter your email to reset your password"}
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={(e) => updateFormState({ email: e.target.value })}
        sx={{ mb: 2 }}
      />

      {formData.showOtpField && (
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            name="otp"
            label="OTP Code"
            type="text"
            id="otp"
            value={formData.otp}
            onChange={(e) => updateFormState({ otp: e.target.value })}
            sx={{ mb: 2 }}
          />

          <PasswordField
            name="newPassword"
            label="New Password"
            value={formData.newPassword}
            showPassword={formData.showPassword}
            onChange={(e) => updateFormState({ newPassword: e.target.value })}
            toggleShowPassword={() =>
              updateFormState({ showPassword: !formData.showPassword })
            }
            sx={{ mb: 2 }}
          />
        </>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2, py: 1.5, borderRadius: "8px" }}
      >
        {formData.showOtpField ? "Reset Password" : "Send OTP"}
      </Button>

      <Button
        type="button"
        fullWidth
        variant="outlined"
        onClick={switchToLogin}
        sx={{ mt: 1, py: 1.5, borderRadius: "8px" }}
      >
        Back to Login
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
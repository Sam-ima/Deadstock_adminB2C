import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import PasswordField from "./passwordField";

const RegisterForm = ({ formData, updateFormState, onAuth, switchToLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

      <PasswordField
        name="password"
        label="Password"
        value={formData.admin_password}
        showPassword={formData.showPassword}
        onChange={(e) => updateFormState({ password: e.target.value })}
        toggleShowPassword={() =>
          updateFormState({ showPassword: !formData.showPassword })
        }
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2, py: 1.5, borderRadius: "8px" }}
      >
        Register
      </Button>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={switchToLogin}
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
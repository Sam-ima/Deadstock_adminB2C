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

const LoginForm = ({
  formData,
  updateFormState,
  onAuth,
  switchToRegister,
  switchToReset,
}) => {
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mb: 2,
        }}
      >
        <Link
          component="button"
          variant="body2"
          onClick={switchToReset}
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot password?
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 2, py: 1.5, borderRadius: "8px" }}
      >
        Login
      </Button>

      {/* <Divider sx={{ my: 2 }}>OR</Divider> */}

      {/* <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link 
            component="button" 
            variant="body2"
            onClick={switchToRegister}
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold', 
              textDecoration: 'none', 
              '&:hover': { textDecoration: 'underline' } 
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box> */}
    </Box>
  );
};

export default LoginForm;
import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(102, 126, 234, 0.4)',
  },
  '&:disabled': {
    background: '#e0e0e0',
  },
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const LoginButton = ({ loading }) => {
  return (
    <StyledButton
      type="submit"
      fullWidth
      variant="contained"
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <>
          <LoginIcon sx={{ mr: 1 }} />
          Login
        </>
      )}
    </StyledButton>
  );
};

export default LoginButton;
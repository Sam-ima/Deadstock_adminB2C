
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container,IconButton,InputAdornment } from '@mui/material';
import { Visibility,VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  // const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success with dummy credentials
    // if (username === 'admin.panel@educationpvt.com' && password === 'education@admin63015') {
    //   // Set a token in localStorage
      localStorage.setItem('login_token', '@#$educationdotcom$#@');
        navigate('/dashboard');
      
    // } else {
    //   toast.error('Invalid username or password');
    // }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  return (
    <Container maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        // backgroundColor: "red"
      }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          alignItems: "center",
        }}
      >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 8,
                border: "1px solid black",
                padding: "20px 30px",
                boxShadow: "2px 3px 40px rgba(0,0,0,0.5)"
              }}
            >
              <Typography component="h1" variant="h5">
                Login Into Your Account
              </Typography>
              {/* {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )} */}
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                //   required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                //   required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Box>
            </Box>
            {/* <Typography variant='h4' sx={{
              mt:6,
              fontFamily:"'Roboto-Serif',serif",
              textShadow:"10px 10px 10px 0px rgba(0,0,0,0.9)",
              color: "#000000"
            }}>Education Dot Com</Typography> */}
      </Box>
    </Container>
  );
};

export default LoginForm;

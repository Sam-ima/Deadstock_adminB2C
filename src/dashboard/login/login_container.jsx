// import { Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(2),
}));

const LoginContainer = ({ children }) => {
  return (
    <StyledContainer>
      {/* <Fade in={true} timeout={800}  > */}
        {children}
      {/* </Fade> */}
    </StyledContainer>
  );
};

export default LoginContainer;
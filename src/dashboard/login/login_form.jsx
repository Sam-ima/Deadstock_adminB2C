import  { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContainer from './login_container';
import LoginPaper from './login_paper';
import LoginHeader from './login_header';
import LoginFormContent from './login_form_content';


const LoginForm = () => {
   const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [touched, setTouched] = useState({ username: false, password: false });
  const navigate = useNavigate();

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (username && password) {
        localStorage.setItem('login_token', '@#$educationdotcom$#@');
        localStorage.setItem('user', JSON.stringify({ username }));
        
        toast.success('Login successful! Redirecting...', {
          position: "top-center",
          autoClose: 2000,
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin(e);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <LoginContainer>
      <LoginPaper>
        <LoginHeader />
        
        <LoginFormContent
          username={username}
          password={password}
          showPassword={showPassword}
          loading={loading}
          errors={errors}
          touched={touched}
          onUsernameChange={(e) => {
            setUsername(e.target.value);
            if (touched.username) validateForm();
          }}
          onPasswordChange={(e) => {
            setPassword(e.target.value);
            if (touched.password) validateForm();
          }}
          onUsernameBlur={handleBlur('username')}
          onPasswordBlur={handleBlur('password')}
          onKeyPress={handleKeyPress}
          onShowPasswordClick={handleClickShowPassword}
          onMouseDownPassword={handleMouseDownPassword}
          onSubmit={handleLogin}
        />
        
      
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginForm;
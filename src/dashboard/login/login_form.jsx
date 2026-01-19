import { useState} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"; // Changed from createUserWithEmailAndPassword
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContainer from './login_container';
import LoginPaper from './login_paper';
import LoginHeader from './login_header';
import LoginFormContent from './login_form_content';
import { auth } from '../../components/config/firebase'; // Import auth properly

const LoginForm = () => {
  // const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsMounted(true);
  //   }, 100);
    
  //   return () => clearTimeout(timer);
  // }, []);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
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
      // Use signInWithEmailAndPassword for login (not createUser...)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Firebase already stored tokens internally at this point!
      
      // console.log("Logged in user:", user);
      
      // Store token and user info
      // localStorage.setItem('login_token', '@#$educationdotcom$#@');
      localStorage.setItem('user', JSON.stringify({ 
        email: user.email,
        uid: user.uid,
        displayName: user.displayName || email.split('@')[0]
      }));
      
      toast.success('Login successful! Redirecting...', {
        position: "top-center",
        autoClose: 2000,
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      // Handle Firebase authentication errors
      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        default:
          errorMessage = error.message || 'Login failed. Please try again.';
      }
      
      toast.error(errorMessage);
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
          email={email} // Changed from username to email
          password={password}
          showPassword={showPassword}
          loading={loading}
          errors={errors}
          touched={touched}
          onEmailChange={(e) => { // Updated prop name
            setEmail(e.target.value);
            if (touched.email) validateForm();
          }}
          onPasswordChange={(e) => {
            setPassword(e.target.value);
            if (touched.password) validateForm();
          }}
          onEmailBlur={handleBlur('email')} // Updated prop name
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
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { EnvelopeAtFill, LockFill, PersonFill, Google, Github, Facebook, TwitterX } from 'react-bootstrap-icons';
import authService from "../helper/AuthService";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);
  const [status, setStatus] = useState('');

  const [email, setEmail] = useState('');
  const [firstname, setFname] = useState('');
  const [lastname, SetLname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('status'));

  useEffect(() => {
    // Function to handle changes in localStorage
    const handleLocalStorageChange = () => {
        setIsLoggedIn(localStorage.getItem('status'));
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', handleLocalStorageChange);

    // Clean up the listener when component unmounts
    return () => {
        window.removeEventListener('storage', handleLocalStorageChange);
    };
}, []); 

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const currentPath = location.hash ? location.hash.substring(1) : 'home';
    setActiveLink(currentPath);
  }, [location]);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const handleSignIn = () => {
    setShowModal(true);
    setIsLogin(true);
    setCheckbox(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail('');
    setPassword('')
    setFname('');
    SetLname('');
    setError('');
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setResetPassword(false);
    setStatus('');
    setError('');
  };

  const toggleResetPassword = () => {
    setIsLogin(resetPassword);
    setResetPassword(!resetPassword);
    setStatus('');
    setError('');
  };

  const validateLoginForm = () => {
    if (!email) {
      return { valid: false, message: "Email is required." };
    }
    if (!password) {
      return { valid: false, message: "Password is required." };
    }
    return { valid: true };
  };

  const validateRegisterForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstname) {
      return { valid: false, message: "First Name is required." };
    }
    if (!lastname) {
      return { valid: false, message: "Last Name is required." };
    }
    if (!email || !emailRegex.test(email)) {
      return { valid: false, message: "A valid Email Address is required." };
    }
    if (!password) {
      return { valid: false, message: "Password is required." };
    }
    return { valid: true };
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');
    const validation = validateLoginForm();
    if (!validation.valid) {
        setError(validation.message);
        return;
    }
    try {
        const response = await authService.login({ email, password });
        if (response.status === 200) {
            setError('');
            setStatus(response.data);
            localStorage.setItem('status', true);
            setIsLoggedIn(true);
            handleCloseModal();
        }
    } catch (error) {
      if (error.name === "AxiosError"){
      console.log(error);
        setError(error.response.data);
      } else{
        setError("Something went wrong please try again later.")
      }
    }
};

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');
    const validation = validateRegisterForm();
    if (!validation.valid) {
      setError(validation.message);
      return;
    }
    try {
      
    } catch (error) {
      setError('Registration failed');
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');
    try {
    } catch (error) {
      setError('Password reset failed');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await authService.logout();
        if (response.status === 200) {
            setError('');
            setStatus(response.data);
            localStorage.setItem('status', false);
            setIsLoggedIn(false);
            handleCloseModal();
        }
    } catch (error) {
      setError(error);
    }
  };
  

  return (
    <div>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
              <Nav.Link href="#connect" className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('connect')}>Let’s Connect</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/noeal-rajeev/" target="_blank" rel="noopener noreferrer"><img src={navIcon1} alt="LinkedIn" /></a>
                <a href="https://www.instagram.com/noeal_rajeev/" target="_blank" rel="noopener noreferrer"><img src={navIcon3} alt="Instagram" /></a>
              </div>
              {isLoggedIn ? (
              <button onClick={handleLogout} className="vvd"><span>Logout </span></button>
            ): (
              <button onClick={handleSignIn} className="vvd"><span>Sign In </span></button>
            )
              }
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <h1>{isLogin ? 'Login' : (resetPassword ? 'Reset Password' : 'Register')}</h1>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="input-box">
                <input type="email" placeholder="Email Address" required aria-label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <EnvelopeAtFill size={20} className="icon" />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <LockFill size={20} className="icon" />
              </div>
              <div className="remember-forget">
                <label>
                  <input type="checkbox" value={checkbox} onChange={(e) => setCheckbox(e.target.checked)} /> Remember me
                </label>
                <a onClick={toggleResetPassword}>Forget Password</a>
              </div>
              <button type="submit">Login</button>
              <div className="register-link">
                <p>Don't have an account? <a onClick={handleToggleForm}>Register</a></p>
              </div>
              <div className="socialmedia">
                <Facebook size={30} className="social" />
                <Google size={30} className="social" />
                <TwitterX size={30} className="social" />
                <Github size={30} className="social" />
              </div>
            </form>
          ) : resetPassword ? (
            <form onSubmit={handleResetSubmit}>
              {status && <p style={{ color: 'green' }}>{status}</p>}
              <div className="input-box">
                <input type="email" placeholder="Email Address" required aria-label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <EnvelopeAtFill size={24} className="icon" />
              </div>
              <button type="submit">Reset Password</button>
              <div className="register-link">
                <p>Remembered your password? <a onClick={toggleResetPassword}>Login</a></p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="input-box input-box-half">
                <input type="text" placeholder="First Name" required aria-label="First Name" value={firstname} onChange={(e) => setFname(e.target.value)} />
                <PersonFill size={24} className="icon" />
              </div>
              <div className="input-box input-box-half">
                <input type="text" placeholder="Last Name" required aria-label="Last Name" value={lastname} onChange={(e) => SetLname(e.target.value)} />
                <PersonFill size={24} className="icon" />
              </div>
              <div className="input-box">
                <input type="email" placeholder="Email Address" required aria-label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <EnvelopeAtFill size={24} className="icon" />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <LockFill size={24} className="icon" />
              </div>
              <div className="remember-forget">
                <label>
                  <input type="checkbox" value={checkbox} onChange={(e) => setCheckbox(e.target.checked)} /> Remember me
                </label>
              </div>
              <button type="submit">Register</button>
              <div className="register-link">
                <p>Already have an account? <a onClick={handleToggleForm}>Login</a></p>
              </div>
              <div className="socialmedia">
                <Facebook size={30} className="social" />
                <Google size={30} className="social" />
                <TwitterX size={30} className="social" />
                <Github size={30} className="social" />
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

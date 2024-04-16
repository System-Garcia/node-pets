import { useContext, useEffect } from 'react';
import { useFormInput } from '../../hooks/useLoginFields ';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import styles from '../../styles/pages/loginPage.module.css';
import logo from '/amuleto.png';
import corgi from '/img/corgi.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

const LoginPage = () => {
  const { email, password, handleEmailChange, handlePasswordChange, isCapsLockOn } = useFormInput();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|uthermosillo\.edu\.mx|example\.com)$/;

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      toast.error('Email is not valid');
      return;
    }
    if (password.length < 6) {
      toast.error('Password too short');
      return;
    }

    try {
      const { success, error, status } = await login(email, password);

      if (success) return setTimeout(() => navigate('/main-menu'), 0);

      toast.error(error, {
        autoClose: 5000
      });
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    if (isCapsLockOn) {
      toast.info('Caps Lock is on.');
    }
  }, [isCapsLockOn]);

  return (
    <div className={styles.loginPage}>
      <section className={`${styles.loginContainer} container`}>
        <div className="loginContent">
          <div className={styles.loginHeader}>
            <div className={styles.loginLogo}>
              <img src={logo} alt="PIS Logo" />
            </div>
            <h1>PIS</h1>
          </div>

          <div className={styles.loginForm}>
            <h2>Account login</h2>
            <p>Welcome back. Enter your credentials to access your account</p>
            <form onSubmit={handleLogin}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputIconContainer}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input id="email" type="email" placeholder="john.doe@gmail.com" value={email} onChange={handleEmailChange} required />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputIconContainer}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    id="password"
                    className={styles.input}
                    type="password"
                    placeholder="123456"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.keepSigned}>
                <input type="checkbox" id="keep-signed-in" />
                <label htmlFor="keep-signed-in">Keep me signed in</label>
              </div>
              <div className={styles.actions}>
                <button type="submit" className={styles.continueButton}>
                  Continue
                </button>
              </div>
            </form>

            <div className={styles.loginFooter}>
              <span>
                Don't have an Account? <Link to="/signup">Sign up here</Link>
              </span>
              <div>
                <Link to="/auth/forgot-password" className={styles.forgotPassword}>
                  Forgot Password
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.loginImage} `}>
          <img className="animate__animated animate__bounceInUp" src={corgi} alt="Cute corgi" width="500px" height="500px" />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/pages/loginS.module.css";
import logo from "/img/amuleto.png";
import corgi from "/img/corgi.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [capsLockWarningShown, setCapsLockWarningShown] = useState({ email: false, password: false });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error("Email is not valid");
      return;
    }
    if (password.length < 6) {
      toast.error("Password too short");
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login successful!");
        navigate("/main-menu");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (emailValue.toUpperCase() === emailValue && emailValue !== "" && !capsLockWarningShown.email) {
      toast.info("Caps Lock is on.");
      setCapsLockWarningShown(prev => ({ ...prev, email: true }));
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    if (passwordValue.toUpperCase() === passwordValue && passwordValue !== "" && !capsLockWarningShown.password) {
      toast.info("Caps Lock is on.");
      setCapsLockWarningShown(prev => ({ ...prev, password: true }));
    }
  };

  return (
    <section className={styles.loginContainer}>
      <div className={styles.loginLogo}>
        <img src={logo} alt="PIS Logo" />
        <h1>PIS</h1>
      </div>
      <div className={styles.loginForm}>
        <h2>Admin Login</h2>
        <p>Welcome back. Enter your credentials to access your account</p>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputIconContainer}>
              <FaEnvelope className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="password">Password</label>
              <Link to="/auth/forgot-password" className={styles.forgotPassword}>
                Forgot Password
              </Link>
            </div>
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
          <img src={corgi} alt="Cute corgi" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
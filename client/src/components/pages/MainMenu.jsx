import styles from "../../styles/pages/mainMenu.module.css"
import SearchInput from '../atoms/SearchInput/SearchInput';
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import React, { useContext } from 'react';

const MainMenu = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <h1>Welcome to</h1>
        <img src="../../public/amuleto.png" className={styles.NavImg}></img>
      </nav>
      <SearchInput />
      <Link to="/dashboard">Go to Dashboard</Link>
      <button onClick={logout} className={styles.logoutButton}>Logout</button>
    </>
  );
}

export default MainMenu;
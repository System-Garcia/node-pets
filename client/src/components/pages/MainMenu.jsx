import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import SearchInput from '../atoms/SearchInput/SearchInput';
import styles from "../../styles/pages/mainMenu.module.css";

const MainMenu = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <nav className={styles.nav}>
        <h1 className={styles.heading}>Welcome to</h1>
        <img src="../../public/amuleto.png" className={styles.NavImg} alt="Amuleto" />
      </nav>
      <div className={styles.searchContainer}>
        <SearchInput />
      </div>
      <Link to="/dashboard" className={styles.link}>Go to Dashboard</Link>
      <button onClick={logout} className={styles.logoutButton}>Logout</button>
      <Link to="/create-reward" className={styles.link}>Create Reward for Pet</Link>
    </>
  );
}

export default MainMenu;

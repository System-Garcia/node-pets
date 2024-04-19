import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import SearchInput from '../atoms/SearchInput/SearchInput';
import styles from "../../styles/pages/mainMenu.module.css";
import { http } from "../../helpers/httpHelper";

const RewardCard = ({ reward }) => {
  return (
    <div style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>{reward.description}</h3>
      <p>Amount: ${reward.amount}</p>
      <p>Pet: {reward.pet.name} (Owner ID: {reward.pet.ownerId})</p>
      <p>Location: {reward.location.address}, {reward.location.city}</p>
      <small>Created on: {new Date(reward.createdAt).toLocaleDateString()}</small>
    </div>
  );
};

const MainMenu = () => {
  const { logout, token } = useContext(AuthContext);
  const [rewards, setRewards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await http.get('/rewards?page=1&limit=5', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log(response);
        if (response.status !== 200) throw new Error('Failed to fetch rewards');
        setRewards(response.data.rewards);
        setPages(Math.ceil(response.data.total / 10));
      } catch (error) {
        console.error('Failed to fetch rewards', error);
        setError('Failed to fetch rewards');
      } finally {
        setLoading(false);
      }
    };
  
    fetchRewards();
  }, [token]);
  

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    
      <nav className={styles.nav}>
      <div className={styles.buttonContainer}>
      <button onClick={logout} className={styles.logoutButton}>Logout</button>
      </div>
        <h1 className={styles.heading}>Welcome to</h1>
        <h1 className={styles.heading}>PIS</h1>
        <img src="../../public/amuleto.png" className={styles.NavImg} alt="Amuleto" />
        <SearchInput />
      </nav>
      <div className={styles.searchContainer}>
      </div>
      <h3 className={styles.linksH3}>Navs</h3>
      <div className={styles.linksContainer}>
        <Link to="/dashboard" className={styles.link}>Go to Dashboard</Link>
        <Link to="/create-pet" className={styles.link}>Register your pet</Link>

        <Link to="/create-reward" className={styles.link}>Create Reward for Pet</Link>
        <Link to="/my-pets" className={styles.link}>My pets</Link>

      </div>


      <h3 className={styles.rewardsHeading}>Available Rewards</h3>
    <div className={styles.rewardsContainer}>
      {rewards.map(reward => (
        <div key={reward.id} className={styles.rewardCard}>
          <h3>Reward for finding {reward.pet.name}</h3>
          <p>Amount: ${reward.amount}</p>
          <p>Pet: {reward.pet.name} (Owner ID: {reward.pet.ownerId})</p>
          <p>Location: {reward.location.address}, {reward.location.city}</p>
          <img src='https://n-missing-pets.s3.us-west-1.amazonaws.com/1713462813249_pet.jpg' className={styles.petImage} />
          <small>Created on: {new Date(reward.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
      
    </div>
    <div className={styles.pagination}>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePagination(i + 1)}
            className={currentPage === i + 1 ? styles.currentPage : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
  </>

  );
};

export default MainMenu;

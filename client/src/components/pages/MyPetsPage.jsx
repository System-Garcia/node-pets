import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { http } from '../../helpers';
import { toast } from 'react-toastify';
import styles from '../../styles/pages/myPets.module.css';

const MyPetsPage = () => {
  const { token } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await http.get('/pets/my-pets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Fetched pets data:", data);
        setPets(data.pets);
      } catch (error) {
        console.error('Error fetching pets:', error);
        toast.error(`Error fetching pets: ${error.response.data.message}`);
      }
    };

    fetchPets();
  }, [token]);

  return (
    <div className={styles.petContainer}>
      <h2 className={styles.petHeader}>My Pets</h2>
      <div className={styles.petCards}>
        {pets.map(pet => (
          <div key={pet.id} className={styles.petCard}>
            <img src={pet.imageUrl || 'https://n-missing-pets.s3.us-west-1.amazonaws.com/1713462813249_pet.jpg'} alt={pet.name} className={styles.petImage} />
            <h3>{pet.name}</h3>
            <p>ID: {pet.id}</p>
            <p>{pet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyPetsPage;

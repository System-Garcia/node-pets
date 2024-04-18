import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { http } from '../../helpers';
import { toast } from 'react-toastify';
import styles from "../../styles/pages/createReward.module.css"

const CreateRewardComponent = () => {

  const { token } = useContext( AuthContext );

  const [rewardData, setRewardData] = useState({
   reward:{
    name: '',
    description: '',
    amount: '',
    petId: '',
},
    location: {
      address: '',
      city: '',
      country: '',
      latitude: '',
      longitude: '',
    },
  });

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await http.get('/pets/my-pets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPets(data.pets);
      } catch (error) {
        console.log(error)
        toast.error(`Error fetching pets: ${error.response.data.message}`);
      }
    };
  
    const token = localStorage.getItem('token');
    if (token) {
      fetchPets();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in rewardData.location ) {
      setRewardData({
        ...rewardData,
        location: { ...rewardData.location, [name]: value },
        reward: { ...rewardData.reward, [name]: value }
      });
    } else {
      setRewardData({ ...rewardData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(rewardData)
    try {
      const response = await http.post('/rewards', { reward: rewardData },{
            headers: { Authorization: `Bearer ${token}` }
          });
      
      if (response.status === 200) {
        toast.success('Reward created successfully');
      }
    } catch (error) {
        console.log(error)
      toast.error(`Error creating reward: ${error.message}`);
    }
  };

  return (
    <div className={styles.rewardContainer}>
      <h2 className={styles.rewardHeader}>Create Reward</h2>
      <form onSubmit={handleSubmit} className={styles.rewardForm}>
        <label className={styles.rewardLabel}>
          Reward Name
          <input type="text" name="name" placeholder="Reward Name" onChange={handleInputChange} className={styles.rewardInput} />
        </label>
        <label className={styles.rewardLabel}>
          Description
          <textarea name="description" placeholder="Description" onChange={handleInputChange} className={styles.rewardTextarea}></textarea>
        </label>
        <label className={styles.rewardLabel}>
          Amount
          <input type="number" name="amount" placeholder="Amount" onChange={handleInputChange} className={styles.rewardInput} />
        </label>
        <label className={styles.rewardLabel}>
          Pet ID
          <select 
        name="petId" 
        onChange={handleInputChange} 
        className={styles.rewardSelect}
        value={rewardData.petId}
      >
        <option value="">Select Pet</option>
        {pets.map(pet => (
          <option key={pet.id} value={pet.id}>
            {pet.name}
          </option>
        ))}
      </select>
        </label>
        <label className={styles.rewardLabel}>
          Address
          <input type="text" name="address" placeholder="Address" onChange={handleInputChange} className={styles.rewardInput} />
        </label>
        <label className={styles.rewardLabel}>
          City
          <input type="text" name="city" placeholder="City" onChange={handleInputChange} className={styles.rewardInput} />
        </label>
        <label className={styles.rewardLabel}>
          Country
          <input type="text" name="country" placeholder="Country" onChange={handleInputChange} className={styles.rewardInput} />
        </label>
        <label className={styles.rewardLabel}>
          Latitude
          <input type="text" name="latitude" placeholder="Latitude" onChange={handleInputChange} className={styles.rewardInput} />
        </label>
        <label className={styles.rewardLabel}>
          Longitude
          <input type="text" name="longitude" placeholder="Longitude" onChange={handleInputChange} className={styles.rewardInput} />
        </label>
        <button type="submit" className={styles.rewardButton}>Create Reward</button>
      </form>
    </div>
  );
}

export default CreateRewardComponent;

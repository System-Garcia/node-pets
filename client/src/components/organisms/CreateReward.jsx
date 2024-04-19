import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { http } from '../../helpers';
import { toast } from 'react-toastify';
import styles from '../../styles/pages/createReward.module.css';
import { HiUser } from 'react-icons/hi';
import { FaDirections } from 'react-icons/fa';
import { MdDescription, MdOutlinePets } from 'react-icons/md';
import { CiMoneyBill } from 'react-icons/ci';
import { TbWorldLatitude } from 'react-icons/tb';
import { set } from 'lodash';

const CreateRewardComponent = () => {
  const { token } = useContext(AuthContext);

  const [rewardData, setRewardData] = useState({
    reward: {
      name: '',
      description: '',
      amount: '',
      petId: ''
    },
    location: {
      address: '',
      city: '',
      country: '',
      description: '',
      latitude: '',
      longitude: ''
    }
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
        toast.error(`Error fetching pets: ${error.response.data.message}`);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchPets();
    }
  }, []);

  const handleInputChangeLocation = (e) => {
    const { name, value } = e.target;
    setRewardData({
      ...rewardData,
      location: { ...rewardData.location, [name]: value }
    });
  };
  const handleInputChangeReward = (e) => {
    const { name, value } = e.target;
    setRewardData({
      ...rewardData,
      reward: { ...rewardData.reward, [name]: value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post(
        '/rewards',
        { reward: rewardData.reward, location: rewardData.location },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        
        toast.success('Reward created successfully');
        setRewardData({
          reward: {
            name: '',
            description: '',
            amount: '',
            petId: ''
          },
          location: {
            address: '',
            city: '',
            country: '',
            description: '',
            latitude: '',
            longitude: ''
          }
        });
      }
    } catch (error) {
      toast.error(`Error creating reward: ${error.response.data.error}`);
    }
  };

  return (
    <div className={styles.rewardPage}>
      <div className={styles.rewardContainer}>
        <h2 className={styles.rewardHeader}>Create Reward</h2>
        <form onSubmit={handleSubmit} className={styles.rewardForm}>
          <div className={styles.inputs}>
            <div>
              <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
                <HiUser className="ml-2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={rewardData.reward.name}
                  placeholder="Reward Name"
                  onChange={handleInputChangeReward}
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>

              <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
                <CiMoneyBill className="ml-2 text-gray-400" />

                <input
                  type="number"
                  name="amount"
                  value={rewardData.reward.amount}
                  placeholder="Amount"
                  onChange={handleInputChangeReward}
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                />
              </div>

              <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
                <MdDescription className="ml-2 text-gray-400" />

                <textarea
                  name="description"
                  value={rewardData.reward.description}
                  placeholder="Description reward"
                  onChange={handleInputChangeReward}
                  className="block w-full px-3 py-2 rounded-md focus:outline-none resize-none"
                ></textarea>
              </div>

             

              <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
                <MdOutlinePets className="ml-2 text-gray-400" />

                <select
                  name="petId"
                  onChange={handleInputChangeReward}
                  className="block w-full px-3 py-2 rounded-md focus:outline-none"
                  value={rewardData.petId}
                >
                  <option value="">Select Pet</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </select>
              </div>

             
            </div>

            <div>
            <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
              <FaDirections className="ml-2 text-gray-400" />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={rewardData.location.address}
                onChange={handleInputChangeLocation}
                className="block w-full px-3 py-2 rounded-md focus:outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
              <FaDirections className="ml-2 text-gray-400" />

              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleInputChangeLocation}
                className="block w-full px-3 py-2 rounded-md focus:outline-none"
                value={rewardData.location.city}
              />
            </div>

            <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
              <FaDirections className="ml-2 text-gray-400" />

              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleInputChangeLocation}
                className="block w-full px-3 py-2 rounded-md focus:outline-none"
                value={rewardData.location.country}
              />
            </div>

            <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
              <TbWorldLatitude className="ml-2 text-gray-400" />

              <input
                type="text"
                name="latitude"
                placeholder="Latitude"
                onChange={handleInputChangeLocation}
                className="block w-full px-3 py-2 rounded-md focus:outline-none"
                value={rewardData.location.latitude}
              />
            </div>

            <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
              <TbWorldLatitude className="ml-2 text-gray-400" />

              <input
                type="text"
                name="longitude"
                placeholder="Longitude"
                onChange={handleInputChangeLocation}
                className="block w-full px-3 py-2 rounded-md focus:outline-none"
                value={rewardData.location.longitude}
              />
            </div>

            <div className="flex items-center border border-gray-300 mb-4 focus:border-[#4B92FC] rounded-md">
                <MdDescription className="ml-2 text-gray-400" />

                <textarea
                  name="description"
                  placeholder="Description location"
                  onChange={handleInputChangeLocation}
                  className="block w-full px-3 py-2 rounded-md focus:outline-none resize-none"
                  value={rewardData.location.description}
                ></textarea>
              </div>

            </div>
          </div>


          <button type="submit" className={styles.rewardButton}>
            Create Reward
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRewardComponent;

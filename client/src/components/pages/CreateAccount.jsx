import React, { useState } from 'react';
import axios from 'axios';

const CreateA = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    password: '',
    dateOfBirth: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        dataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', dataToSend);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="date" name="dateOfBirth" placeholder="Date of Birth" onChange={handleChange} required />
      <input type="file" name="file" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default CreateA;
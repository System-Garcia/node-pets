import React, { useState, useEffect, useContext  } from 'react';
import styles from '../../styles/pages/createUserForm.module.css';
import { http } from '../../helpers/httpHelper';
import { AuthContext } from '../../auth/context/AuthContext';

export const UpdateUserForm = ({ open, onClose, onSave, selectedUser }) => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
      firstName: '',
      file: null,
    });
  
    useEffect(() => {
      if (selectedUser) {
        setFormData({
          firstName: selectedUser.firstName || '',
        });
      }
    }, [selectedUser]);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
      setFormData({ ...formData, file: e.target.files[0] });
    };
  
    const handleUpdateSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData();
      
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      
      try {
        const response = await http.put(`/users/${selectedUser.id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        console.log(response.data);
        onSave(response.data);
        onClose();
      } catch (error) {
        console.error('Update failed:', error);
      }
    };
  
    if (!open) return null;
  
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Update User</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="file">Profile Picture</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
              />
            </div>
  
            <div className={styles.buttons}>
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export const UserForm = ({ open, onClose }) => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    
    try {
      const response = await http.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Create New User</h2>
        <form onSubmit={handleRegisterSubmit}>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="file">Profile Picture</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.submitButton}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};


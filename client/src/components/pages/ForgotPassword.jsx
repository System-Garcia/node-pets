import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });
      console.log(response.data);
      toast.success('Check your email for password reset instructions.');
    } catch (error) {
      console.error(error.response.data);
      toast.error('An error occurred while requesting a password reset.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-lg px-8 py-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl mb-3">Email</h2>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={handleChange} 
                required 
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

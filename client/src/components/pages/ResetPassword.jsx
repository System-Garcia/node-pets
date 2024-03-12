import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';


const ResetPassword = () => {

  const location = useLocation();
  const {token} = queryString.parse(location.search)
  console.log(token)

    const { password1, password2, changeFormValue} = useForm({
      password1: '',
      password2: '',
    })

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log({
        password1, password2
      })
      if (password1 !== password2) {
        return toast.error('Passwords must be equal.');
        
      }


      try { 
        const response = await axios.post('http://localhost:3000/api/auth/reset-password', { token, password:password1 });
        console.log(response.data);
        toast.success("Reset Password sent")
      } catch (error){
        console.log(error)
      }
      }
  

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-lg px-8 py-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl mb-3">Repet 2 times your Password</h2>
              <input 
                type="password" 
                name="password1" 
                placeholder="New Password" 
                value={password1}
                onChange={ changeFormValue } 
                required 
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
              />
              <input 
                type="password" 
                name="password2" 
                placeholder="Confirm your password" 
                value={password2}
                onChange={changeFormValue} 
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
  


export default ResetPassword;

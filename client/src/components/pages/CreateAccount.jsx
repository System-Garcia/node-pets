import React, { useState } from 'react';
import axios from 'axios';
import mankey from '/img/mankey.png';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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

  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
      setFileName(files[0].name);
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
      toast.success('Registration successful!');
    } catch (error) {
      console.error(error.response.data);
      toast.error('Registration failed.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const files = e.dataTransfer.files;
      handleChange({
        target: {
          name: 'file',
          files: files,
        },
      });
      setFileName(files[0].name);
    }}

  const handleDragIn = (e) => {
    handleDrag(e);
    setDragging(true);
  };

  const handleDragOut = (e) => {
    handleDrag(e);
    setDragging(false);
  };

  

  return (
    <>
    <ToastContainer />
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="rounded-lg px-8 py-6 max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-6 text-black-200">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
      <h2 className="text-2x1 mb-3 text-black-100">Email</h2>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      <h2 className="text-2x1 mb-3 text-black-100">Phone Number</h2>
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      <h2 className="text-2x1 mb-3 text-black-100">First Name</h2>
          
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      <h2 className="text-2x1 mb-3 text-black-100">Email</h2>
          
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      <h2 className="text-2x1 mb-3 text-black-100">Password</h2>
          
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      <h2 className="text-2x1 mb-3 text-black-100">Date Of Birth</h2>
          
          <input type="date" name="dateOfBirth" onChange={handleChange} required className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
      <h2 className="text-2x1 mb-3 text-black-100">Image</h2>
          
      <div
          className={`file_upload p-5 relative border-4 ${dragging ? 'border-indigo-600' : 'border-dotted border-gray-300'} rounded-lg`}
          style={{ width: '100%' }}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt className="text-indigo-500 w-24 mx-auto mb-4" />
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label className="cursor-pointer">
              <input
                type="file"
                name="file"
                className="hidden"
                onChange={handleChange}
                multiple
              />
              <div className="text bg-indigo-600 text-white rounded font-semibold p-1 px-3 hover:bg-indigo-500">
                Select
              </div>
            </label>
            {fileName && <div className="text-sm text-gray-600 mt-2">{fileName}</div>}
            <div className="title text-indigo-500 uppercase mt-2">or drop files here</div>
          </div>
        </div></div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
      </form>
      <Link to="/login">Already have an account? Log in</Link>
      <img src={mankey}></img>
    </div>
  </div>
  </>
);

};

export default CreateA;
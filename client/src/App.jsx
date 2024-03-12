import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import HomePageLog from './components/pages/HomePageLog';
import CreateA from './components/pages/CreateAccount';
import MainMenu from './components/pages/MainMenu';
import ForgotPassword from './components/pages/ForgotPassword';
import ErrorPage from './components/pages/errors/ErrorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ResetPassword from './components/pages/ResetPassword';
 

const App = () => {
  return (
    <Router>
<Routes>
  <Route path="/" element={<HomePageLog />} />
  <Route path="/login" element={<LoginPage />}/>
  <Route path="/signup" element={<CreateA />} />
  <Route path="/main-menu" element={<MainMenu />} />
  <Route path="/auth/forgot-password" element={<ForgotPassword />} />
  <Route path="/auth/reset-password" element={<ResetPassword />} />
  <Route path="/error" element={<ErrorPage errorMessage="Bad Request - The server could not understand the request due to invalid syntax." />} />
</Routes>
<ToastContainer />

    </Router>
  );
};

export default App;

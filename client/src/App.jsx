import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import HomePage from './components/pages/HomePage';

const App = () => {
  return (
    <Router>
<Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/home" element={<HomePage />} />
</Routes>

    </Router>
  );
};

export default App;

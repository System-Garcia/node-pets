import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import HomePageLog from './components/pages/HomePageLog';
import CreateA from './components/pages/CreateAccount';
import MainMenu from './components/pages/MainMenu';

const App = () => {
  return (
    <Router>
<Routes>
  <Route path="/" element={<HomePageLog />} />
  <Route path="/login" element={<LoginPage />}/>
  <Route path="/signup" element={<CreateA />} />
  <Route path="/main-menu" element={<MainMenu />} />
</Routes>

    </Router>
  );
};

export default App;

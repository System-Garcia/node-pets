import React, { useContext } from 'react';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import Router from '../../routes/sections';
import ThemeProvider from '../../theme';
import '../../global.css';
import { AuthContext } from '../../auth/context/AuthContext';
import { Navigate } from 'react-router-dom';



const DashboardPage = () => {
  useScrollToTop();
  const { user } = useContext(AuthContext);

  const hasPermission = user && user.id === 1;

  if (!hasPermission) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
    </>
  );
};

export default DashboardPage;

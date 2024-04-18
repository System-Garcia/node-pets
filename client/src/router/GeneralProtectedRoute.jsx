import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext';

const GeneralProtectedRoute = () => {
  const { logged } = useContext(AuthContext);

  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default GeneralProtectedRoute;

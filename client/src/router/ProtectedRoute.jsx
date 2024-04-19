import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext';

const ProtectedRoute = ({ isAdminRoute = false }) => {
  const { user, logged } = useContext(AuthContext);
  const isAdmin = user?.permissions?.some(permission => permission.id === 1);

  if (!logged) {
    return <Navigate to="/login" replace />;
  } else if (isAdminRoute && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../feactures/auth/hooks/AuthContext';
import { Layout } from '../components/layout/Layout';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};
